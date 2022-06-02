/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Input, Select, Slider, InputNumber } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  getListProjectAPIAction,
  getProjectDetailAPIAction,
} from "../../../redux/actions/CyberBugs/ProjectActions";
import {
  createTaskAPIAction,
  getPriorityTaskAPIAction,
  getStatusTaskAPIAction,
  getTaskTypeAPIAction,
} from "../../../redux/actions/CyberBugs/TaskActions";
import { submitDrawerAction } from "../../../redux/actions/HOC/HOCActions";
const { Option } = Select;

function CreateTaskDrawerCBB(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProjectAPIAction());
    dispatch(getStatusTaskAPIAction());
    dispatch(getPriorityTaskAPIAction());
    dispatch(getTaskTypeAPIAction());
    dispatch(submitDrawerAction(handleSubmit));
  }, []);

  const { lstProject } = useSelector((state) => state.ProjectReducers);
  const { lstStatusTask } = useSelector((state) => state.TaskReducers);
  const { lstPriorityTask } = useSelector((state) => state.TaskReducers);
  const { lstTaskType } = useSelector((state) => state.TaskReducers);
  const { projectDetail } = useSelector((state) => state.ProjectReducers);
  const { values, setFieldValue, handleChange, handleSubmit } = props;

  const submitForm = (e) => {
    e.preventDefault();
  };

  // project
  const renderProject = () => (
    <>
      <p className="mb-1">Project</p>
      <Select
        className="w-100"
        showSearch
        name="projectId"
        value={values.projectId}
        optionFilterProp="children"
        onChange={(value) => {
          setFieldValue("projectId", value);
          dispatch(getProjectDetailAPIAction(value));
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {renderProjectListOption()}
      </Select>
    </>
  );

  const renderProjectListOption = () =>
    lstProject?.map((project, index) => (
      <Option key={index} value={project.id}>
        {project.projectName}
      </Option>
    ));

  // taskName
  const renderTaskName = () => (
    <>
      <p className="mb-1">Task Name</p>
      <Input className="form-control" name="taskName" onChange={handleChange} />
    </>
  );

  // status
  const renderStatus = () => (
    <>
      <p className="mb-1">Status</p>
      <Select
        className="w-100"
        name="statusId"
        value={values.statusId}
        onChange={(value) => {
          setFieldValue("statusId", value);
        }}
      >
        {renderStatusListOption()}
      </Select>
    </>
  );
  const renderStatusListOption = () =>
    lstStatusTask?.map((status, index) => (
      <Option key={index} value={status.statusId}>
        {status.statusName}
      </Option>
    ));

  // priority
  const renderPriority = () => (
    <>
      <p className="mb-1">Priority</p>
      <Select
        className="w-100"
        name="priorityId"
        value={values.priorityId}
        onChange={(value) => {
          setFieldValue("priorityId", value);
        }}
      >
        {renderPriorityListOption()}
      </Select>
    </>
  );
  const renderPriorityListOption = () =>
    lstPriorityTask?.map((priority, index) => (
      <Option key={index} value={priority.priorityId}>
        {priority.priority}
      </Option>
    ));

  // taskType
  const renderTaskType = () => (
    <>
      <p className="mb-1">Task type</p>
      <Select
        className="w-100"
        name="typeId"
        value={values.typeId}
        onChange={(value) => {
          setFieldValue("typeId", value);
        }}
      >
        {renderTaskTypeListOption()}
      </Select>
    </>
  );
  const renderTaskTypeListOption = () =>
    lstTaskType?.map((taskType, index) => (
      <Option key={index} value={taskType.id}>
        {taskType.taskType}
      </Option>
    ));

  // assigness
  const userByProjectIdOption = projectDetail.members?.map((user) => ({
    value: user?.userId,
    label: user?.name,
  }));

  const renderAssigness = () => (
    <>
      <p className="mb-1">Assigness</p>
      <Select
        className="w-100"
        name="userId"
        mode="multiple"
        placeholder="Input User Name"
        options={userByProjectIdOption}
        optionLabelProp="label"
        onChange={(value) => {
          setFieldValue("listUserAsign", value);
        }}
      />
    </>
  );

  // timeTracking
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const renderTimeTracking = () => (
    <>
      <p className="mb-1">Time tracking</p>
      <Slider
        defaultValue={30}
        value={timeTracking.timeTrackingSpent}
        max={
          Number(timeTracking.timeTrackingSpent) +
          Number(timeTracking.timeTrackingRemaining)
        }
      />
      <div className="d-flex justify-content-between">
        <span>{timeTracking.timeTrackingSpent}h logged</span>
        <span>{timeTracking.timeTrackingRemaining}h remaining</span>
      </div>
    </>
  );

  // originalEstimate
  const renderOriginalEstimate = () => (
    <>
      <p className="mb-1">Original Estimate</p>
      <InputNumber
        className="form-control w-100"
        name="originalEstimate"
        min={0}
        defaultValue={0}
        onChange={(value) => {
          setFieldValue("originalEstimate", value);
        }}
      />
    </>
  );

  // timeSpent
  const renderTimeSpent = () => (
    <div>
      <p className="mb-1">Time spent</p>
      <InputNumber
        className="form-control w-75"
        name="timeTrackingSpent"
        min={0}
        defaultValue={0}
        onChange={(value) => {
          setTimeTracking({
            ...timeTracking,
            timeTrackingSpent: value,
          });
          setFieldValue("timeTrackingSpent", value);
        }}
      />
    </div>
  );

  // timeRemaining
  const renderTimeRemaining = () => (
    <div className="text-end">
      <p className="mb-1">Time remaining</p>
      <InputNumber
        className="w-75"
        name="timeTrackingRemaining"
        min={0}
        defaultValue={0}
        onChange={(value) => {
          setTimeTracking({
            ...timeTracking,
            timeTrackingRemaining: value,
          });
          setFieldValue("timeTrackingRemaining", value);
        }}
      />
    </div>
  );

  // description
  const renderDescription = () => (
    <>
      <p className="mb-1">Description</p>
      <Editor
        className="form-control"
        name="description"
        init={{
          height: 200,
          menubar: false,
          content_style: "body {font-size:16px }",
        }}
        onEditorChange={(value) => {
          setFieldValue("description", value);
        }}
      />
    </>
  );

  return (
    <form className="container-fluid p-0" onSubmit={submitForm}>
      <div className="row align-self-stretch">
        <div className="col-12">{renderProject()}</div>
        <div className="col-6 mt-3">{renderTaskName()}</div>
        <div className="col-6 mt-3">{renderStatus()}</div>
        <div className="col-6 mt-3">{renderPriority()}</div>
        <div className="col-6 mt-3">{renderTaskType()}</div>
        <div className="col-6 mt-3">{renderAssigness()}</div>
        <div className="col-6 mt-3">{renderTimeTracking()}</div>
        <div className="col-6 mt-3">{renderOriginalEstimate()}</div>
        <div className="col-6 mt-3 d-flex justify-content-between">
          {renderTimeSpent()}
          {renderTimeRemaining()}
        </div>
        <div className="col-12 mt-3">{renderDescription()}</div>
      </div>
    </form>
  );
}

const CreateTask = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const {
      lstProject,
      lstStatusTask,
      lstPriorityTask,
      lstTaskType,
      setValue,
    } = props;
    let projectIdDefault = null;
    let statusIdDefault = null;
    if (!setValue) {
      statusIdDefault = lstStatusTask[0]?.statusId;
      projectIdDefault = lstProject[0]?.id;
    } else {
      projectIdDefault = setValue.projectId;
      statusIdDefault = setValue.statusId;
    }
    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: statusIdDefault,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectIdDefault,
      typeId: lstTaskType[0]?.id,
      priorityId: lstPriorityTask[0]?.priorityId,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(createTaskAPIAction(values));
  },

  displayName: "CreateTask",
})(CreateTaskDrawerCBB);

const mapStateToProps = (state) => ({
  lstProject: state.ProjectReducers.lstProject,
  lstStatusTask: state.TaskReducers.lstStatusTask,
  lstPriorityTask: state.TaskReducers.lstPriorityTask,
  lstTaskType: state.TaskReducers.lstTaskType,
  setValue: state.TaskReducers.setValue,
});

export default connect(mapStateToProps)(CreateTask);
