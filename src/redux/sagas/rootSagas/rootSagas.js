import { all } from "@redux-saga/core/effects";
import * as UserSagas from "../CyberBugs/UserSagas";
import * as ProjectSagas from "../CyberBugs/ProjectSagas";
import * as TaskSagas from "../CyberBugs/TaskSagas";
export function* rootSaga() {
  yield all([
    /*Take list user saga*/
    UserSagas.takeSignInAPI(),
    UserSagas.takeSignUpAPI(),
    UserSagas.takeGetListUserAPI(),
    UserSagas.takeGetListUserKeywordAPI(),
    UserSagas.takeUpdateUserAPI(),
    UserSagas.takeDeleteUserAPI(),
    /*Take list project saga*/
    ProjectSagas.takeCreateProjectsAPI(),
    ProjectSagas.takeGetListProjectsAPI(),
    ProjectSagas.takeGetListProjectCategoryAPI(),
    ProjectSagas.takeEditProjectAPI(),
    ProjectSagas.takeDeleteProjectAPI(),
    ProjectSagas.takeAssignUserProjectAPI(),
    ProjectSagas.takeRemoveUserProjectAPI(),
    ProjectSagas.takeGetProjectDetailAPI(),
    ProjectSagas.takePushToProjectDetailPage(),
    /*Take list task saga*/
    TaskSagas.takeGetListStatusTaskAPI(),
    TaskSagas.takeGetListPriorityTaskAPI(),
    TaskSagas.takeGetListTaskTypeAPI(),
    TaskSagas.takeOpenCreateTask(),
    // task detail
    TaskSagas.takeCreateTaskAPI(),
    TaskSagas.takeGetTaskDetailAPI(),
    TaskSagas.takeUpdateTaskAPI(),
    TaskSagas.takeDeleteTaskAPI(),
    // task comment
    TaskSagas.takeGetAllCommentAPI(),
    TaskSagas.takeInsertCommentAPI(),
    TaskSagas.takeEditCommentAPI(),
    TaskSagas.takeDeleteCommentAPI(),
  ]);
}
