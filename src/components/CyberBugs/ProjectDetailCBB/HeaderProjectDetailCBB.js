import React from "react";
import { NavLink } from "react-router-dom";
import { PAGES_CBB } from "../../../util/constants/settingSystemConstants";

export default function HeaderMainCBB(props) {
  let { project } = props;

  return (
    <div className="container-fluid mt-2">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-2">
          <li className="breadcrumb-item">
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={PAGES_CBB.PROJECT_MANAGER}
              activeClassName="active font-weight-bold"
            >
              Project Manager
            </NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {project.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
