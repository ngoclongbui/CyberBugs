import React from "react";
import { Route } from "react-router-dom";
import style from "./LoginTemplateCBB.module.css";

export const LoginTemplateCBB = (props) => {
  let { Component, ...resRouter } = props;

  return (
    <Route
      {...resRouter}
      render={(propsRoute) => {
        return (
          <div className={`container-fluid ${style.bgBehind}`}>
            <div className={`container ${style.bgFront}`}>
              <div className="row">
                <div className={`col-4 offset-8 ${style.content}`}>
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
