import { LOADING } from "../../constants/GlobalSetting/LoadingConstants";

const initialState = {
  isLoading: false,
};

export const LoadingReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING.ACTIVE:
      return { ...state, isLoading: true };

    case LOADING.HIDE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
