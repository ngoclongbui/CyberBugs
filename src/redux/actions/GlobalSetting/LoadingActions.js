import { LOADING } from "../../constants/GlobalSetting/LoadingConstants";
/*----------Action Creator-------- */
export const activeLoadingAction = () => ({ type: LOADING.ACTIVE });
export const hiddenLoadingAction = () => ({ type: LOADING.HIDE });
