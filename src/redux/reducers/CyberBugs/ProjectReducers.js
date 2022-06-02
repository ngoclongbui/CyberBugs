import {
  EDIT_PROJECT,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_CATEGORY,
  GET_PROJECT_DETAIL,
} from "../../constants/CyberBugs/ProjectConstants";

const initialState = {
  lstProject: [],
  lstProjectCategory: [],
  projectDetail: {},
  projectEdit: {},
};

export const ProjectReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      return { ...state, lstProject: action.lstProject };
    }

    case GET_LIST_PROJECT_CATEGORY: {
      return { ...state, lstProjectCategory: action.lstProjectCategory };
    }

    case EDIT_PROJECT: {
      return { ...state, projectEdit: action.projectEdit };
    }

    case GET_PROJECT_DETAIL: {
      return { ...state, projectDetail: action.projectDetail };
    }

    default:
      return state;
  }
};
