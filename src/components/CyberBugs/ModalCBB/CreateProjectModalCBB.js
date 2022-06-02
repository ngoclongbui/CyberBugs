/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Select, Button } from "antd";
import { withFormik } from "formik";
import {
  createProjectAPIAction,
  getListProjectCategoryAPIAction,
} from "../../../redux/actions/CyberBugs/ProjectActions";
const { Option } = Select;
function CreateProjectModalCBB(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProjectCategoryAPIAction());
  }, []);

  const { values, setFieldValue, handleChange, handleSubmit } = props;
  const { lstProjectCategory } = useSelector((state) => state.ProjectReducers);

  const handleEditorChange = (content) => {
    setFieldValue("description", content);
  };

  const handleSelectChange = (content) => {
    setFieldValue("categoryId", content);
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title" id="modalToggleLabel">
          <h6 className="mb-0">Create Project</h6>
        </div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div className="modal-body createProjectModal">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div className="form-group">
            <p>Name</p>
            <Input className="form-control" name="projectName" />
          </div>
          <div className="form-group mt-3">
            <p>Description</p>
            <Editor
              className="form-control"
              name="description"
              onEditorChange={handleEditorChange}
              init={{
                height: 300,
                menubar: false,
                content_style: "body {font-size:16px }",
              }}
            />
          </div>
          <div className="form-group mt-4">
            <Select
              className="form-select w-100"
              name="categoryId"
              value={values.categoryId}
              onChange={handleSelectChange}
            >
              {lstProjectCategory?.map((option, index) => (
                <Option key={index} value={option.id}>
                  {option.projectCategoryName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-group my-4 ">
            <Button
              className="modalButton me-2"
              type="primary"
              data-bs-dismiss="modal"
              aria-label="Close"
              ghost
              onClick={handleSubmit}
            >
              Create Project
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
        </form>
      </div>
    </>
  );
}
const CreateProjectWithFormik = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.lstProjectCategory[0]?.id,
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(createProjectAPIAction(values));
  },

  displayName: "CreateProject",
})(CreateProjectModalCBB);

const mapStateToProps = (state) => ({
  lstProjectCategory: state.ProjectReducers.lstProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectWithFormik);
