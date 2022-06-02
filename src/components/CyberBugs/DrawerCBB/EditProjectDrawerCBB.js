/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Select } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  editProjectAPIAction,
  getListProjectCategoryAPIAction,
} from "../../../redux/actions/CyberBugs/ProjectActions";
import { withFormik } from "formik";
import * as Yup from "yup";
import { submitDrawerAction } from "../../../redux/actions/HOC/HOCActions";
const { Option } = Select;

function EditProjectDrawerCBB(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProjectCategoryAPIAction());
    dispatch(submitDrawerAction(handleSubmit));
  }, []);

  const { values, setFieldValue, handleChange, handleSubmit } = props;
  const { lstProjectCategory } = useSelector((state) => state.ProjectReducers);

  const handleEditorChange = (value) => {
    setFieldValue("description", value);
  };

  const handleCategoryChange = (value) => {
    setFieldValue("categoryId", value);
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form className="container-fluid p-0" onSubmit={submitForm}>
      <div className="row">
        <div className="col-4 mt-3">
          <p className="mb-1">Project ID</p>
          <Input
            className="form-control"
            value={values.id}
            name="id"
            readOnly
          />
        </div>
        <div className="col-4 mt-3">
          <p className="mb-1">Project Name</p>
          <Input
            value={values.projectName}
            name="projectName"
            onChange={handleChange}
          />
        </div>
        <div className="col-4 mt-3">
          <p className="mb-1">Project Category</p>
          <Select
            className="w-100"
            value={values.categoryId}
            name="categoryId"
            onChange={handleCategoryChange}
          >
            {lstProjectCategory?.map((option, index) => (
              <Option key={index} value={option.id}>
                {option.projectCategoryName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-12 mt-3">
          <p className="mb-1">Description</p>
          <Editor
            className="form-control"
            name="description"
            value={values.description}
            init={{
              height: 400,
              menubar: false,
              content_style: "body {font-size:16px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
    </form>
  );
}
const EditProject = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    let { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(editProjectAPIAction(values));
  },

  displayName: "EditProject",
})(EditProjectDrawerCBB);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducers.projectEdit,
});

export default connect(mapStateToProps)(EditProject);
