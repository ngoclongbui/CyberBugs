/* eslint-disable no-useless-escape */
import React from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { PAGES_CBB } from "../../../util/constants/settingSystemConstants";
import { userSignUpAPIAction } from "../../../redux/actions/CyberBugs/UserActions";

const SignUpCBB = (props) => {
  const { values, errors, handleChange, handleSubmit, isValid } = props;

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form className="container" onSubmit={submitForm}>
      <div className="avatarLarge mx-auto">
        <img
          src={require("../../../assets/CyberBugs/logo.jfif")}
          alt="avatar"
        />
      </div>
      <p className="text-center mt-3 mb-4 loginTitle">Join to CyberBugs</p>
      <div className="formLogin p-4 w-75 mx-auto">
        <Input
          className="inputLogin"
          name="email"
          type="text"
          size="large"
          placeholder="Email"
          onChange={handleChange}
          prefix={<MailOutlined />}
        />
        <div className="text-danger" id="feedback">
          {errors.email}
        </div>
        <Input
          className="mt-3 inputLogin"
          name="passWord"
          type="password"
          size="large"
          placeholder="Password"
          onChange={handleChange}
          prefix={<LockOutlined />}
        />
        <div className="text-danger" id="feedback">
          {errors.passWord}
        </div>
        <Input
          className="inputLogin mt-3"
          name="name"
          type="text"
          size="large"
          placeholder="Your Name"
          onChange={handleChange}
          prefix={<UserOutlined />}
        />
        <div className="text-danger" id="feedback">
          {errors.name}
        </div>
        <Input
          className="inputLogin mt-3"
          name="phoneNumber"
          type="tel"
          min="0"
          size="large"
          placeholder="Your Phone"
          onChange={handleChange}
          value={values.phoneNumber}
          prefix={<MobileOutlined />}
        />
        <div className="text-danger" id="feedback">
          {errors.phoneNumber}
        </div>
        <Button
          className="mt-3 buttonLogin"
          type="primary"
          size="large"
          block
          disabled={
            !isValid ||
            values.email === "" ||
            values.passWord === "" ||
            values.name === "" ||
            values.phoneNumber === ""
          }
          onClick={handleSubmit}
        >
          Join with us
        </Button>
        <div className="mt-4 text-end">
          <NavLink className="loginLink" to={PAGES_CBB.SIGN_IN}>
            You have a account? Go to Sign In.
          </NavLink>
        </div>
      </div>
    </form>
  );
};
const nameRegExp = RegExp(
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
);
const phoneRegExp = RegExp(/^[0-9]+$/);
const emailRegExp = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const SignUpCBBWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),

  validationSchema: Yup.object({
    email: Yup.string()
      .matches(emailRegExp, "Invalid email address")
      .email("Invalid email address"),
    name: Yup.string().matches(nameRegExp, "Please enter valid name"),
    phoneNumber: Yup.string()
      .min(10, "Phone much have min 10 number")
      .max(11, "Must be 11 number or less")
      .matches(phoneRegExp, "Your phone is invalid"),
    passWord: Yup.string()
      .min(6, "Password much have min 6 character")
      .max(32, "Must be 20 characters or less"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(userSignUpAPIAction(values));
  },

  displayName: "SignInCBB",
})(SignUpCBB);

export default connect()(SignUpCBBWithFormik);
