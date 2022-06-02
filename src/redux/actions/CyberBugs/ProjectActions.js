import {
  ASSIGN_USER_PROJECT_API,
  CREATE_PROJECT_API,
  DELETE_PROJECT_API,
  EDIT_PROJECT,
  EDIT_PROJECT_API,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_API,
  GET_LIST_PROJECT_CATEGORY,
  GET_LIST_PROJECT_CATEGORY_API,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_API,
  REMOVE_USER_PROJECT_API,
} from "../../constants/CyberBugs/ProjectConstants";
import { PUSH_TO_PROJECT_DETAIL_PAGE } from "../../constants/CyberBugs/UserConstants";

/*----------Action Creator-------- */
export const getListProjectAction = (lstProject) => ({
  type: GET_LIST_PROJECT,
  lstProject,
});

export const getListProjectCategoryAction = (lstProjectCategory) => ({
  type: GET_LIST_PROJECT_CATEGORY,
  lstProjectCategory,
});

export const editProjectAction = (projectEdit) => ({
  type: EDIT_PROJECT,
  projectEdit,
});

export const getProjectDetailAction = (projectDetail) => ({
  type: GET_PROJECT_DETAIL,
  projectDetail,
});

/*-----------Async Action--------- */
export const createProjectAPIAction = (newProject) => ({
  type: CREATE_PROJECT_API,
  newProject,
});

export const getListProjectAPIAction = () => ({ type: GET_LIST_PROJECT_API });

export const getListProjectCategoryAPIAction = () => ({
  type: GET_LIST_PROJECT_CATEGORY_API,
});

export const editProjectAPIAction = (projectEdit) => ({
  type: EDIT_PROJECT_API,
  projectEdit,
});

export const deleteProjectAPIAction = (projectDelete) => ({
  type: DELETE_PROJECT_API,
  projectDelete,
});

export const assignUserProjectAPIAction = (projectId, userId) => ({
  type: ASSIGN_USER_PROJECT_API,
  userProjectId: {
    projectId,
    userId,
  },
});

export const removeUserProjectAPIAction = (projectId, userId) => ({
  type: REMOVE_USER_PROJECT_API,
  userProjectId: {
    projectId,
    userId,
  },
});

export const getProjectDetailAPIAction = (projectId) => ({
  type: GET_PROJECT_DETAIL_API,
  projectId,
});

export const pushToProjectDetailPageAction = (projectId) => ({
  type: PUSH_TO_PROJECT_DETAIL_PAGE,
  projectId,
});
