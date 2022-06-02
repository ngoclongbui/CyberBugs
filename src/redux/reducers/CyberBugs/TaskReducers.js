import {
  ADD_ASSIGNMENT,
  EDIT_TASK,
  GET_LIST_PRIORITY_TASK,
  GET_LIST_STATUS_TASK,
  GET_LIST_TASK_TYPE,
  GET_TASK_DETAIL,
  REMOVE_ASSIGNMENT,
  SET_VALUE_DEFAULT_CREATE_TASK,
  UNSET_VALUE_DEFAULT_CREATE_TASK,
} from "../../constants/CyberBugs/TaskConstants";

const initialState = {
  taskDetail: {},
  lstStatusTask: [],
  lstPriorityTask: [],
  lstTaskType: [],
  lstComment: [],
  setValue: {},
  valueDefault: {},
};

export const TaskReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_STATUS_TASK:
      return { ...state, lstStatusTask: action.lstStatusTask };

    case GET_LIST_PRIORITY_TASK:
      return { ...state, lstPriorityTask: action.lstPriorityTask };

    case GET_LIST_TASK_TYPE:
      return { ...state, lstTaskType: action.lstTaskType };

    case SET_VALUE_DEFAULT_CREATE_TASK:
      return { ...state, setValue: action.setValue };

    case UNSET_VALUE_DEFAULT_CREATE_TASK:
      return { ...state, setValue: action.valueDefault };

    case GET_TASK_DETAIL:
      return { ...state, taskDetail: action.taskDetail };

    case EDIT_TASK:
      const { nameEdited, valueEdited } = action;
      return {
        ...state,
        taskDetail: { ...state.taskDetail, [nameEdited]: valueEdited },
      };

    case ADD_ASSIGNMENT:
      state.taskDetail.assigness = [...state.taskDetail.assigness, action.user];
      return { ...state };

    case REMOVE_ASSIGNMENT:
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness.filter(
          (user) => user.id !== action.userId
        ),
      ];
      return { ...state };

    default:
      return state;
  }
};
