import React from "react";
import { Route } from "react-router-dom";
import MenuCBB from "../../components/CyberBugs/MenuCBB/MenuCBB";
import style from "./HomeTemplateCBB.module.css";

export const HomeTemplateCBB = (props) => {
  const { Component, ...resParam } = props;

  return (
    <Route
      path={resParam.path}
      render={(propsRoute) => {
        return (
          <div className={`container-fluid ${style.bgBehind}`}>
            <div className={`container ${style.bgFront}`}>
              <div className="row">
                <div className={`col-2 p-0 ${style.menu}`}>
                  <MenuCBB />
                </div>
                <div className={`col-10 ${style.content}`}>
                  <Component {...propsRoute} />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};
