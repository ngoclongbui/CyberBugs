import React from "react";
import { Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { userSignInAPIAction } from "../../../redux/actions/CyberBugs/UserActions";
import { PAGES_CBB } from "../../../util/constants/settingSystemConstants";

const SignInCBB = (props) => {
  const { values, errors, handleChange, handleSubmit, isValid } = props;

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="avatarLarge mx-auto">
        <img
          src={require("../../../assets/CyberBugs/logo.jfif")}
          alt="avatar"
        />
      </div>
      <p className="text-center mt-3 mb-4 loginTitle">Sign in to CyberBugs</p>
      <div className="formLogin p-4 mx-auto">
        <Input
          className="inputLogin"
          name="email"
          type="text"
          size="large"
          value={values.name}
          placeholder="Email"
          onChange={handleChange}
          prefix={<MailOutlined />}
        />
        <div className="text-danger" id="feedback">
          {errors.email}
        </div>
        <Input
          className="mt-4 inputLogin"
          name="password"
          type="password"
          size="large"
          value={values.name}
          placeholder="Password"
          onChange={handleChange}
          prefix={<LockOutlined />}
        />
        <div className="text-danger" id="feedback">
          {errors.password}
        </div>
        <Button
          className="mt-4 buttonLogin"
          htmlType="submit"
          type="primary "
          size="large"
          block
          onClick={handleSubmit}
          disabled={!isValid || values.email === "" || values.password === ""}
        >
          Sign In
        </Button>
        <div className="mt-4 text-end">
          <NavLink className="loginLink" to={PAGES_CBB.SIGN_UP}>
            Create an account.
          </NavLink>
        </div>
      </div>
    </form>
  );
};

const SignInCBBWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email address"),
    password: Yup.string()
      .min(6, "Password much have min 6 character")
      .max(32, "Must be 20 characters or less"),
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    props.dispatch(userSignInAPIAction(email, password));
  },

  displayName: "SignInCBB",
})(SignInCBB);

export default connect()(SignInCBBWithFormik);
