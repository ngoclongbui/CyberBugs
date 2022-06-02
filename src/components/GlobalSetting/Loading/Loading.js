import React from "react";
import { useSelector } from "react-redux";
import style from "./Loading.module.css";
export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducers);
  const renderLoading = () => {
    return (
      <div className={style.bgLoading}>
        <img
          className={style.animatedLoading}
          src={require("../../../assets/Loading/Curve-Loading.gif")}
          alt="loading"
        />
      </div>
    );
  };
  return isLoading ? renderLoading() : "";
}
