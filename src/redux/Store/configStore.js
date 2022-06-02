import { createStore, applyMiddleware, combineReducers } from "redux";
import createMiddleWareSaga from "redux-saga";
import { ProjectReducers } from "../reducers/CyberBugs/ProjectReducers";
import { TaskReducers } from "../reducers/CyberBugs/TaskReducers";
import { UserReducers } from "../reducers/CyberBugs/UserReducers";
import { LoadingReducers } from "../reducers/GlobalSetting/LoadingReducers";
import { HOCReducers } from "../reducers/HOC/HOCReducers";
import { rootSaga } from "../sagas/rootSagas/rootSagas";

const middleWareSaga = createMiddleWareSaga();

const rootReducers = combineReducers({
  /* HOC (modal, drawer) */
  HOCReducers,
  /* GlobalSetting*/
  LoadingReducers,
  /* CyberBugs Project */
  UserReducers,
  ProjectReducers,
  TaskReducers,
});

const store = createStore(rootReducers, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;
