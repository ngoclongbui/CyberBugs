import {
  call,
  // delay,
  put,
  takeLatest,
  select,
} from "@redux-saga/core/effects";
import CreateTaskDrawerCBB from "../../../components/CyberBugs/DrawerCBB/CreateTaskDrawerCBB";
import EditTaskModalCBB from "../../../components/CyberBugs/ModalCBB/EditTaskModalCBB";
import { taskServices } from "../../../services/CyberBugs/TaskServices";
import { NOTIFY_TYPE } from "../../../util/constants/notificationConstants";
import { STATUS_CODE } from "../../../util/constants/settingSystemConstants";
import { notify } from "../../../util/notification/notification";
import { getProjectDetailAPIAction } from "../../actions/CyberBugs/ProjectActions";
import {
  addAssignmentAction,
  editTaskAction,
  getPriorityTaskAction,
  getStatusTaskAction,
  getTaskDetailAction,
  getTaskDetailAPIAction,
  getTaskTypeAction,
  removeAssignmentAction,
  setValueDefaultCreateTaskAction,
  unsetValueDefaultCreateTaskAction,
} from "../../actions/CyberBugs/TaskActions";
import {
  cancelDrawerAction,
  openDrawerAction,
  openModalAction,
} from "../../actions/HOC/HOCActions";
import {
  ADD_ASSIGNMENT,
  BY_MENU,
  BY_PROJECT_DETAIL,
  CREATE_TASK_API,
  DELETE_COMMENT_TASK_API,
  DELETE_TASK_API,
  EDIT_COMMENT_TASK_API,
  EDIT_TASK,
  GET_LIST_PRIORITY_TASK_API,
  GET_LIST_STATUS_TASK_API,
  GET_TASK_DETAIL_API,
  INSERT_COMMENT_TASK_API,
  OPEN_CREATE_TASK,
  REMOVE_ASSIGNMENT,
  UPDATE_TASK_API,
} from "../../constants/CyberBugs/TaskConstants";
import { MODAL_SIZE } from "../../constants/HOC/HOCConstants";

/*
23/04/2022
Bui Ngoc Long
Get list status task
*/
function* getListStatusTaskAPI() {
  try {
    const { data, status } = yield call(() => taskServices.getListStatusTask());
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getStatusTaskAction(data.content));
    }
  } catch (error) {}
}

export function* takeGetListStatusTaskAPI() {
  yield takeLatest(GET_LIST_STATUS_TASK_API, getListStatusTaskAPI);
}

/*
23/04/2022
Bui Ngoc Long
Get list priority task
*/
function* getListPriorityTaskAPI() {
  try {
    const { data, status } = yield call(() =>
      taskServices.getListPriorityTask()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getPriorityTaskAction(data.content));
    }
  } catch (error) {}
}

export function* takeGetListPriorityTaskAPI() {
  yield takeLatest(GET_LIST_PRIORITY_TASK_API, getListPriorityTaskAPI);
}

/*
23/04/2022
Bui Ngoc Long
Get list priority task
*/
function* getListTaskTypeAPI() {
  try {
    const { data, status } = yield call(() => taskServices.getListTaskType());
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getTaskTypeAction(data.content));
    }
  } catch (error) {}
}

export function* takeGetListTaskTypeAPI() {
  yield takeLatest(GET_LIST_PRIORITY_TASK_API, getListTaskTypeAPI);
}

/*
24/04/2022
Bui Ngoc Long
Create task
*/
function* createTaskAPI(action) {
  try {
    const { data, status } = yield call(() =>
      taskServices.createTask(action.newTask)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notify(NOTIFY_TYPE.SUCCESS, data.message);
      yield put(getProjectDetailAPIAction(action.newTask.projectId));
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
  yield put(yield put(cancelDrawerAction()));
}

export function* takeCreateTaskAPI() {
  yield takeLatest(CREATE_TASK_API, createTaskAPI);
}

/*
24/04/2022
Bui Ngoc Long
open create task
*/
function* openCreateTask(action) {
  switch (action.actionType) {
    case BY_MENU:
      yield put(unsetValueDefaultCreateTaskAction());
      break;
    case BY_PROJECT_DETAIL:
      yield put(setValueDefaultCreateTaskAction(action.setValue));
      break;
    default:
      break;
  }
  yield put(openDrawerAction("Create Task", <CreateTaskDrawerCBB />));
}

export function* takeOpenCreateTask() {
  yield takeLatest(OPEN_CREATE_TASK, openCreateTask);
}

/*
24/04/2022
Bui Ngoc Long
Get task detail
*/
function* getTaskDetailAPI(action) {
  try {
    const { data, status } = yield call(() =>
      taskServices.getTaskDetail(action.taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getTaskDetailAction(data.content));
      yield put(openModalAction(<EditTaskModalCBB />, MODAL_SIZE.EXTRA_LARGE));
    }
  } catch (error) {}
}

export function* takeGetTaskDetailAPI() {
  yield takeLatest(GET_TASK_DETAIL_API, getTaskDetailAPI);
}

/*
24/04/2022
Bui Ngoc Long
Update task
*/
function* updateTaskAPI(action) {
  switch (action.typeAttach) {
    case EDIT_TASK:
      const { nameEdited, valueEdited } = action;
      yield put(editTaskAction(nameEdited, valueEdited));
      break;

    case ADD_ASSIGNMENT:
      const { user } = action;
      yield put(addAssignmentAction(user));
      break;

    case REMOVE_ASSIGNMENT:
      const { userId } = action;
      yield put(removeAssignmentAction(userId));
      break;

    default:
      return;
  }

  let { taskDetail } = yield select((state) => state.TaskReducers);

  const listUserAsign = taskDetail.assigness.map((user) => user.id);

  taskDetail = { ...taskDetail, listUserAsign };

  try {
    const { status } = yield call(() => taskServices.updateTask(taskDetail));
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getProjectDetailAPIAction(taskDetail.projectId));
      yield put(getTaskDetailAPIAction(taskDetail.taskId));
    }
  } catch (error) {}
}

export function* takeUpdateTaskAPI() {
  yield takeLatest(UPDATE_TASK_API, updateTaskAPI);
}

/*
23/04/2022
Bui Ngoc Long
Delete task
*/
function* deleteTaskAPI(action) {
  try {
    const { data, status } = yield call(() =>
      taskServices.deleteTask(action.taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getProjectDetailAPIAction(action.projectId));
      notify(NOTIFY_TYPE.SUCCESS, data.content);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
}

export function* takeDeleteTaskAPI() {
  yield takeLatest(DELETE_TASK_API, deleteTaskAPI);
}

/*
28/04/2022
Bui Ngoc Long
Insert comment task
*/
function* getAllCommentAPI(action) {
  try {
    const { status } = yield call(() =>
      taskServices.getAllComment(action.taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getTaskDetailAPIAction(action.taskId));
    }
  } catch (error) {}
}

export function* takeGetAllCommentAPI() {
  yield takeLatest(INSERT_COMMENT_TASK_API, getAllCommentAPI);
}

/*
28/04/2022
Bui Ngoc Long
Insert comment task
*/
function* insertCommentAPI(action) {
  try {
    const { data, status } = yield call(() =>
      taskServices.insertComment(action.newComment)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getTaskDetailAPIAction(action.taskId));
      notify(NOTIFY_TYPE.SUCCESS, data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
}

export function* takeInsertCommentAPI() {
  yield takeLatest(INSERT_COMMENT_TASK_API, insertCommentAPI);
}

/*
28/04/2022
Bui Ngoc Long
Edit comment task
*/
function* editCommentAPI(action) {
  let { commentId, newContent, taskId } = action;
  try {
    const { data, status } = yield call(() =>
      taskServices.editComment(commentId, newContent)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getTaskDetailAPIAction(taskId));
      notify(NOTIFY_TYPE.SUCCESS, data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
}

export function* takeEditCommentAPI() {
  yield takeLatest(EDIT_COMMENT_TASK_API, editCommentAPI);
}

/*
28/04/2022
Bui Ngoc Long
Delete comment task
*/
function* deleteCommentAPI(action) {
  try {
    const { data, status } = yield call(() =>
      taskServices.deleteComment(action.idComment)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getTaskDetailAPIAction(action.taskId));
      notify(NOTIFY_TYPE.SUCCESS, data.content);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
}

export function* takeDeleteCommentAPI() {
  yield takeLatest(DELETE_COMMENT_TASK_API, deleteCommentAPI);
}
