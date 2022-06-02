import {
  DELETE_USER_API,
  GET_LIST_USER,
  GET_LIST_USER_API,
  GET_LIST_USER_BY_PROJECT_ID,
  GET_LIST_USER_KEYWORD,
  GET_LIST_USER_KEYWORD_API,
  UPDATE_USER,
  UPDATE_USER_API,
  USER_SIGN_IN,
  USER_SIGN_IN_API,
  USER_SIGN_UP_API,
} from "../../constants/CyberBugs/UserConstants";

/*----------Action Creator-------- */
export const userSignInAction = (userInfo) => ({
  type: USER_SIGN_IN,
  userInfo,
});

export const getListUserAction = (lstUser) => ({
  type: GET_LIST_USER,
  lstUser,
});

export const getListUserKeywordAction = (lstUserKeyword) => ({
  type: GET_LIST_USER_KEYWORD,
  lstUserKeyword,
});

export const getListUserByProjectIdAction = (lstUserByProjectId) => ({
  type: GET_LIST_USER_BY_PROJECT_ID,
  lstUserByProjectId,
});

export const updateUserAction = (userUpdate) => ({
  type: UPDATE_USER,
  userUpdate,
});

/*-----------Async Action--------- */
export const userSignInAPIAction = (email, password) => ({
  type: USER_SIGN_IN_API,
  userInfo: {
    email,
    passWord: password,
  },
});

export const userSignUpAPIAction = (newUser) => ({
  type: USER_SIGN_UP_API,
  newUser,
});

export const getListUserAPIAction = () => ({
  type: GET_LIST_USER_API,
});

export const getListUserKeywordAPIAction = (keyword) => ({
  type: GET_LIST_USER_KEYWORD_API,
  keyword,
});

export const updateUserAPIAction = (userUpdate) => ({
  type: UPDATE_USER_API,
  userUpdate,
});

export const deleteUserAPIAction = (userId) => ({
  type: DELETE_USER_API,
  userId,
});
