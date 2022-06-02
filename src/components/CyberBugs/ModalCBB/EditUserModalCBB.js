/* eslint-disable no-useless-escape */
import React from "react";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateUserAPIAction } from "../../../redux/actions/CyberBugs/UserActions";

function EditUserModalCBB(props) {
  const { values, handleChange, handleSubmit, isValid, errors } = props;
  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title d-flex" id="modalToggleLabel">
          <h6 className="mb-0">
            User Update <span className="text-secondary">#{values.id}</span>
          </h6>
        </div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div className="modal-body updateUserModal">
        <form onSubmit={submitForm} onChange={handleChange}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p className="mb-1">Name</p>
                <Input
                  value={values.name}
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger" id="feedback">
                {errors.name}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p className="mb-1">Email</p>
                <Input
                  value={values.email}
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger" id="feedback">
                {errors.email}
              </div>
            </div>
            <div className="col-6 mt-3">
              <div className="form-group">
                <p className="mb-1">Phone</p>
                <Input
                  className="form-control w-100"
                  name="phoneNumber"
                  type="tel"
                  min="0"
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger" id="feedback">
                {errors.phoneNumber}
              </div>
            </div>
            <div className="col-6 mt-3">
              <div className="form-group">
                <p className="mb-1">Password</p>
                <Input
                  type="password"
                  placeholder="Input your new password"
                  value={values.passWord}
                  className="form-control"
                  name="passWord"
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger" id="feedback">
                {errors.passWord}
              </div>
            </div>
          </div>
          <div className="offset-6 col-6 ps-2">
            <div className="form-group mt-4 mb-2 ps-1 d-flex justify-content-between">
              <Button
                className="modalButton"
                type="primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                ghost
                disabled={
                  !isValid ||
                  values.email === "" ||
                  values.passWord === "" ||
                  values.name === "" ||
                  values.phoneNumber === ""
                }
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                className="modalButton"
                type="danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                ghost
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
const nameRegExp = RegExp(
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
);
const phoneRegExp = RegExp(/^[0-9]+$/);
const emailRegExp = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const EditUserWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let { userUpdate } = props;
    return {
      id: userUpdate?.userId.toString(),
      passWord: "",
      email: userUpdate?.email,
      name: userUpdate?.name,
      phoneNumber: userUpdate?.phoneNumber,
    };
  },

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
    props.dispatch(updateUserAPIAction(values));
  },

  displayName: "Edit User Form",
})(EditUserModalCBB);

const mapStateToProps = (state) => ({
  userUpdate: state.UserReducers.userUpdate,
});

export default connect(mapStateToProps)(EditUserWithFormik);
