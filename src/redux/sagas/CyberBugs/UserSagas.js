import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { userServices } from "../../../services/CyberBugs/UserServices";
import { history } from "../../../util/libs/history";
import {
  PAGES_CBB,
  STATUS_CODE,
  TOKEN,
  USER_INFO,
} from "../../../util/constants/settingSystemConstants";
import {
  DELETE_USER_API,
  GET_LIST_USER_API,
  GET_LIST_USER_KEYWORD_API,
  UPDATE_USER_API,
  USER_SIGN_IN_API,
  USER_SIGN_UP_API,
} from "../../constants/CyberBugs/UserConstants";
import {
  getListUserAction,
  getListUserAPIAction,
  getListUserKeywordAction,
  userSignInAction,
} from "../../actions/CyberBugs/UserActions";
import {
  activeLoadingAction,
  hiddenLoadingAction,
} from "../../actions/GlobalSetting/LoadingActions";
import { notify } from "../../../util/notification/notification";
import { NOTIFY_TYPE } from "../../../util/constants/notificationConstants";

/*
18/04/2022
Bui Ngoc Long
Sign In
*/
function* signInAPI(action) {
  yield put(activeLoadingAction());
  try {
    const { data, status } = yield call(() =>
      userServices.signInUser(action.userInfo)
    );
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN.CBB, data.content.accessToken);
      localStorage.setItem(USER_INFO.CBB, JSON.stringify(data.content));
      yield put(userSignInAction(data.content));
      history.push(PAGES_CBB.PROJECT_MANAGER);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
  yield delay(400);
  yield put(hiddenLoadingAction());
}

export function* takeSignInAPI() {
  yield takeLatest(USER_SIGN_IN_API, signInAPI);
}

/*
30/04/2022
Bui Ngoc Long
Sign Up
*/
function* signUpAPI(action) {
  yield put(activeLoadingAction());
  try {
    const { data, status } = yield call(() =>
      userServices.signUpUser(action.newUser)
    );
    if (status === STATUS_CODE.SUCCESS) {
      history.push(PAGES_CBB.SIGN_IN);
      notify(NOTIFY_TYPE.SUCCESS, data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.message);
  }
  yield delay(400);
  yield put(hiddenLoadingAction());
}

export function* takeSignUpAPI() {
  yield takeLatest(USER_SIGN_UP_API, signUpAPI);
}

/*
21/04/2022
Bui Ngoc Long
Get list User
*/
function* getListUserAPI() {
  yield put(activeLoadingAction());
  try {
    const { data, status } = yield call(() => userServices.getListUser());
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListUserAction(data.content));
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
  yield delay(400);
  yield put(hiddenLoadingAction());
}

export function* takeGetListUserAPI() {
  yield takeLatest(GET_LIST_USER_API, getListUserAPI);
}

/*
21/04/2022
Bui Ngoc Long
Get list User
*/
function* getListUserKeywordAPI(action) {
  yield put(activeLoadingAction());
  try {
    const { data, status } = yield call(() =>
      userServices.getListUserKeyword(action.keyword)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListUserKeywordAction(data.content));
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
  yield delay(400);
  yield put(hiddenLoadingAction());
}

export function* takeGetListUserKeywordAPI() {
  yield takeLatest(GET_LIST_USER_KEYWORD_API, getListUserKeywordAPI);
}

/*
30/04/2022
Bui Ngoc Long
Update user
*/
function* updateUserAPI(action) {
  try {
    const { data, status } = yield call(() =>
      userServices.updateUser(action.userUpdate)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListUserAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.content);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
}

export function* takeUpdateUserAPI() {
  yield takeLatest(UPDATE_USER_API, updateUserAPI);
}

/*
30/04/2022
Bui Ngoc Long
Delete user
*/
function* deleteUserAPI(action) {
  try {
    const { data, status } = yield call(() =>
      userServices.deleteUser(action.userId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getListUserAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, data.content);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response.data.content);
  }
}

export function* takeDeleteUserAPI() {
  yield takeLatest(DELETE_USER_API, deleteUserAPI);
}
