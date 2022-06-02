import {
  ADD_ASSIGNMENT,
  CREATE_TASK_API,
  DELETE_COMMENT_TASK,
  DELETE_COMMENT_TASK_API,
  DELETE_TASK_API,
  EDIT_COMMENT_TASK,
  EDIT_COMMENT_TASK_API,
  EDIT_TASK,
  GET_ALL_COMMENT_TASK,
  GET_ALL_COMMENT_TASK_API,
  GET_LIST_PRIORITY_TASK,
  GET_LIST_PRIORITY_TASK_API,
  GET_LIST_STATUS_TASK,
  GET_LIST_STATUS_TASK_API,
  GET_LIST_TASK_TYPE,
  GET_LIST_TASK_TYPE_API,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_API,
  INSERT_COMMENT_TASK,
  INSERT_COMMENT_TASK_API,
  OPEN_CREATE_TASK,
  REMOVE_ASSIGNMENT,
  SET_VALUE_DEFAULT_CREATE_TASK,
  UNSET_VALUE_DEFAULT_CREATE_TASK,
  UPDATE_TASK_API,
} from "../../constants/CyberBugs/TaskConstants";

/*----------Action Creator-------- */
export const getStatusTaskAction = (lstStatusTask) => ({
  type: GET_LIST_STATUS_TASK,
  lstStatusTask,
});

export const getPriorityTaskAction = (lstPriorityTask) => ({
  type: GET_LIST_PRIORITY_TASK,
  lstPriorityTask,
});

export const getTaskTypeAction = (lstTaskType) => ({
  type: GET_LIST_TASK_TYPE,
  lstTaskType,
});

export const setValueDefaultCreateTaskAction = (setValue) => ({
  type: SET_VALUE_DEFAULT_CREATE_TASK,
  setValue,
});

export const unsetValueDefaultCreateTaskAction = () => ({
  type: UNSET_VALUE_DEFAULT_CREATE_TASK,
});

export const openCreateTaskAction = (actionType, projectId, statusId) => ({
  // take with TaskSaga
  type: OPEN_CREATE_TASK,
  actionType,
  setValue: {
    projectId,
    statusId,
  },
});

// major task detail
export const getTaskDetailAction = (taskDetail) => ({
  type: GET_TASK_DETAIL,
  taskDetail,
});

export const editTaskAction = (nameEdited, valueEdited) => ({
  type: EDIT_TASK,
  nameEdited,
  valueEdited,
});

export const addAssignmentAction = (user) => ({
  type: ADD_ASSIGNMENT,
  user,
});

export const removeAssignmentAction = (userId) => ({
  type: REMOVE_ASSIGNMENT,
  userId,
});

//major task comment
export const getAllCommentTaskAction = (taskId) => ({
  type: GET_ALL_COMMENT_TASK,
  taskId,
});

export const insertCommentTaskAction = (newComment) => ({
  type: INSERT_COMMENT_TASK,
  newComment,
});

export const editCommentTaskAction = (taskId) => ({
  type: EDIT_COMMENT_TASK,
  taskId,
});

export const deleteCommentTaskAction = (taskId) => ({
  type: DELETE_COMMENT_TASK,
  taskId,
});

/*-----------Async Action--------- */
export const getStatusTaskAPIAction = () => ({
  type: GET_LIST_STATUS_TASK_API,
});

export const getPriorityTaskAPIAction = () => ({
  type: GET_LIST_PRIORITY_TASK_API,
});

export const getTaskTypeAPIAction = () => ({
  type: GET_LIST_TASK_TYPE_API,
});

// major task detail
export const createTaskAPIAction = (newTask) => ({
  type: CREATE_TASK_API,
  newTask,
});

export const getTaskDetailAPIAction = (taskId) => ({
  type: GET_TASK_DETAIL_API,
  taskId,
});

export const updateTaskAPIAction = (typeAttach, nameEdited, valueEdited) => ({
  type: UPDATE_TASK_API,
  typeAttach,
  nameEdited,
  valueEdited,
});

export const updateTaskAddAssignessAPIAction = (typeAttach, user) => ({
  type: UPDATE_TASK_API,
  typeAttach,
  user,
});

export const updateTaskRemoveAssignessAPIAction = (typeAttach, userId) => ({
  type: UPDATE_TASK_API,
  typeAttach,
  userId,
});

export const deleteTaskAPIAction = (taskId, projectId) => ({
  type: DELETE_TASK_API,
  taskId,
  projectId,
});

// major task comment
export const getAllCommentTaskAPIAction = (taskId) => ({
  type: GET_ALL_COMMENT_TASK_API,
  taskId,
});

export const insertCommentTaskAPIAction = (taskId, contentComment) => ({
  type: INSERT_COMMENT_TASK_API,
  taskId,
  newComment: {
    taskId,
    contentComment,
  },
});

export const editCommentTaskAPIAction = (commentId, newContent, taskId) => ({
  type: EDIT_COMMENT_TASK_API,
  commentId,
  newContent,
  taskId,
});

export const deleteCommentTaskAPIAction = (idComment, taskId) => ({
  type: DELETE_COMMENT_TASK_API,
  idComment,
  taskId,
});
