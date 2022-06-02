import React from "react";
import { Router, Switch } from "react-router-dom";
import { LoginTemplateCBB } from "./templates/CyberBugs/LoginTemplateCBB";
import { HomeTemplateCBB } from "./templates/CyberBugs/HomeTemplateCBB";
import SignInCBB from "./pages/CyberBugs/LoginCBB/SignInCBB";
import SignUpCBB from "./pages/CyberBugs/LoginCBB/SignUpCBB";
import CreateProjectModalCBB from "./components/CyberBugs/ModalCBB/CreateProjectModalCBB";
import ProjectManagerCBB from "./pages/CyberBugs/ProjectCBB/ProjectManagerCBB";
import ProjectDetailCBB from "./pages/CyberBugs/ProjectCBB/ProjectDetailCBB";
import UserManagerCBB from "./pages/CyberBugs/UserCBB/UserManagerCBB";
import DrawerComponent from "./HOC/DrawerComponent/DrawerComponent";
import ModalComponent from "./HOC/ModalComponent/ModalComponent";
import Loading from "./components/GlobalSetting/Loading/Loading";
import { history } from "./util/libs/history";
import { PAGES_CBB } from "./util/constants/settingSystemConstants";

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ModalComponent />
      <DrawerComponent />
      <Switch>
        <LoginTemplateCBB
          exact
          path={PAGES_CBB.SIGN_IN}
          Component={SignInCBB}
        />
        <LoginTemplateCBB
          exact
          path={PAGES_CBB.SIGN_UP}
          Component={SignUpCBB}
        />
        <HomeTemplateCBB
          exact
          path={PAGES_CBB.SIGN_UP}
          Component={CreateProjectModalCBB}
        />
        <HomeTemplateCBB
          exact
          path={`${PAGES_CBB.PROJECT_DETAIL}/:${PAGES_CBB.PROJECT_ID}`}
          Component={ProjectDetailCBB}
        />
        <HomeTemplateCBB
          exact
          path={PAGES_CBB.PROJECT_MANAGER}
          Component={ProjectManagerCBB}
        />
        <HomeTemplateCBB
          exact
          path={PAGES_CBB.USER_MANAGER}
          Component={UserManagerCBB}
        />
        <LoginTemplateCBB exact path={PAGES_CBB.OTHER} Component={SignInCBB} />
        <LoginTemplateCBB exact path={PAGES_CBB.ERROR} Component={SignInCBB} />
      </Switch>
    </Router>
  );
}

export default App;
