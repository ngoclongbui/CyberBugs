import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PAGES_CBB } from "../../../util/constants/settingSystemConstants";
import CreateProjectModalCBB from "../ModalCBB/CreateProjectModalCBB";
import { openModalAction } from "../../../redux/actions/HOC/HOCActions";
import { openCreateTaskAction } from "../../../redux/actions/CyberBugs/TaskActions";
import { BY_MENU } from "../../../redux/constants/CyberBugs/TaskConstants";

export default function MenuCBB(props) {
  const dispatch = useDispatch();
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img
            src={require("../../../assets/CyberBugs/logo.jfif")}
            alt="logo"
          />
        </div>
        <div className="accountInfo">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div
          onClick={() => {
            dispatch(openCreateTaskAction(BY_MENU, null));
          }}
        >
          <i className="fa-solid fa-check-to-slot me-3" />
          <span className="navLink">Create Task</span>
        </div>
        <div
          data-bs-toggle="modal"
          data-bs-target="#modalToggle"
          onClick={() => {
            dispatch(openModalAction(<CreateProjectModalCBB />, null));
          }}
        >
          <i className="fa-solid fa-folder-open me-3" />
          <span className="navLink">Create Project</span>
        </div>
        <div>
          <i className="fa fa-cog me-3" />
          <NavLink
            className="navLink"
            to={PAGES_CBB.PROJECT_MANAGER}
            activeClassName="active fw-bold"
          >
            Project Manager
          </NavLink>
        </div>
        <div>
          <i className="fa-solid fa-people-group me-3" />
          <NavLink
            className="navLink"
            to={PAGES_CBB.USER_MANAGER}
            activeClassName="active fw-bold"
          >
            User Manager
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck me-3" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals me-3" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste me-3" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow me-3" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box me-3" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
