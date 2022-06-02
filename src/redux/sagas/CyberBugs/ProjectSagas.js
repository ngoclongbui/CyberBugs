import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { projectServices } from "../../../services/CyberBugs/ProjectServices";
import { NOTIFY_TYPE } from "../../../util/constants/notificationConstants";
import {
  PAGES_CBB,
  STATUS_CODE,
} from "../../../util/constants/settingSystemConstants";
import { history } from "../../../util/libs/history";
import { notify } from "../../../util/notification/notification";
import {
  getListProjectAction,
  getListProjectAPIAction,
  getListProjectCategoryAction,
  getProjectDetailAction,
} from "../../actions/CyberBugs/ProjectActions";
import {
  activeLoadingAction,
  hiddenLoadingAction,
} from "../../actions/GlobalSetting/LoadingActions";
import { cancelDrawerAction } from "../../actions/HOC/HOCActions";
import {
  ASSIGN_USER_PROJECT_API,
  CREATE_PROJECT_API,
  DELETE_PROJECT_API,
  EDIT_PROJECT_API,
  GET_LIST_PROJECT_API,
  GET_LIST_PROJECT_CATEGORY_API,
  GET_PROJECT_DETAIL_API,
  REMOVE_USER_PROJECT_API,
} from "../../constants/CyberBugs/ProjectConstants";
import { PUSH_TO_PROJECT_DETAIL_PAGE } from "../../constants/CyberBugs/UserConstants";

/*
19/04/2022
Bui Ngoc Long
Create new project
*/
function* createProjectsAPI(action) {
  try {
    const { data, status } = yield call(() =>
      projectServices.createProjects(action.newProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.message);
      history.push(`${PAGES_CBB.PROJECT_MANAGER}`);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
}

export function* takeCreateProjectsAPI() {
  yield takeLatest(CREATE_PROJECT_API, createProjectsAPI);
}

/*
19/04/2022
Bui Ngoc Long
Get list project
*/
function* getListProjectsAPI() {
  try {
    const { data, status } = yield call(() =>
      projectServices.getListProjects()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectAction(data.content));
    }
  } catch (error) {}
}

export function* takeGetListProjectsAPI() {
  yield takeLatest(GET_LIST_PROJECT_API, getListProjectsAPI);
}

/*
20/04/2022
Bui Ngoc Long
Get list project category
*/
function* getListProjectCategoryAPI() {
  try {
    const { data, status } = yield call(() =>
      projectServices.getListProjectCategory()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectCategoryAction(data.content));
    }
  } catch (error) {}
}

export function* takeGetListProjectCategoryAPI() {
  yield takeLatest(GET_LIST_PROJECT_CATEGORY_API, getListProjectCategoryAPI);
}

/*
20/04/2022
Bui Ngoc Long
Update project
*/
function* editProjectAPI(action) {
  yield put(activeLoadingAction());
  try {
    const { data, status } = yield call(() =>
      projectServices.updateProject(action.projectEdit)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
  yield delay(400);
  yield put(hiddenLoadingAction());
  yield put(cancelDrawerAction());
}

export function* takeEditProjectAPI() {
  yield takeLatest(EDIT_PROJECT_API, editProjectAPI);
}

/*
21/04/2022
Bui Ngoc Long
Delete project from project list
*/
function* deleteProjectAPI(action) {
  yield put(activeLoadingAction());
  try {
    const { data, status } = yield call(() =>
      projectServices.deleteProject(action.projectDelete)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
  yield delay(400);
  yield put(hiddenLoadingAction());
}

export function* takeDeleteProjectAPI() {
  yield takeLatest(DELETE_PROJECT_API, deleteProjectAPI);
}

/*
22/04/2022
Bui Ngoc Long
Add user to project
*/
function* assignUserProjectAPI(action) {
  try {
    const { data, status } = yield call(() =>
      projectServices.assignUserProject(action.userProjectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.content);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
}

export function* takeAssignUserProjectAPI() {
  yield takeLatest(ASSIGN_USER_PROJECT_API, assignUserProjectAPI);
}

/*
22/04/2022
Bui Ngoc Long
Remove user to project
*/
function* removeUserProjectAPI(action) {
  try {
    const { data, status } = yield call(() =>
      projectServices.removeUserProject(action.userProjectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListProjectAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.content);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
}

export function* takeRemoveUserProjectAPI() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectAPI);
}

/*
22/04/2022
Bui Ngoc Long
Get project detail
*/
function* getProjectDetailAPI(action) {
  try {
    const { data, status } = yield call(() =>
      projectServices.getProjectDetail(action.projectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getProjectDetailAction(data.content));
    }
  } catch (error) {}
}

export function* takeGetProjectDetailAPI() {
  yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailAPI);
}

/*
01/05/2022
Bui Ngoc Long
Push to project detail pages from project list
*/
function* pushToProjectDetailPage(action) {
  yield put(activeLoadingAction());
  history.push(`${PAGES_CBB.PROJECT_DETAIL}/${action.projectId}`);
  yield delay(400);
  yield put(hiddenLoadingAction());
}

export function* takePushToProjectDetailPage() {
  yield takeLatest(PUSH_TO_PROJECT_DETAIL_PAGE, pushToProjectDetailPage);
}
