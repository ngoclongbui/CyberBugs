import { USER_INFO } from "../../../util/constants/settingSystemConstants";
import {
  GET_LIST_USER,
  GET_LIST_USER_KEYWORD,
  UPDATE_USER,
  USER_SIGN_IN,
} from "../../constants/CyberBugs/UserConstants";

let userInfo = {};
if (localStorage.getItem(USER_INFO.CBB)) {
  userInfo = JSON.parse(localStorage.getItem(USER_INFO.CBB));
}
const initialState = {
  userInfo,
  lstUser: [],
  userUpdate: {},
};

export const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN: {
      return { ...state, userInfo: action.userInfo };
    }

    case GET_LIST_USER: {
      return { ...state, lstUser: action.lstUser };
    }

    case GET_LIST_USER_KEYWORD: {
      return { ...state, lstUser: action.lstUserKeyword };
    }

    case UPDATE_USER: {
      return { ...state, userUpdate: action.userUpdate };
    }

    default:
      return state;
  }
};
