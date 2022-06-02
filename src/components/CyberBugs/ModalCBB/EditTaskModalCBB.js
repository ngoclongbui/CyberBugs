/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentTaskAPIAction,
  deleteTaskAPIAction,
  getPriorityTaskAPIAction,
  getStatusTaskAPIAction,
  getTaskTypeAPIAction,
  updateTaskAddAssignessAPIAction,
  updateTaskAPIAction,
  updateTaskRemoveAssignessAPIAction,
} from "../../../redux/actions/CyberBugs/TaskActions";
import parser from "html-react-parser";
import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Select, Slider, InputNumber, Avatar, Button } from "antd";
import {
  ADD_ASSIGNMENT,
  EDIT_TASK,
  REMOVE_ASSIGNMENT,
} from "../../../redux/constants/CyberBugs/TaskConstants";
import {
  cancelEditorAction,
  openEditorAction,
} from "../../../redux/actions/HOC/HOCActions";
import EditorComponent from "../../../HOC/EditorComponent/EditorComponent";
import { TYPE_EDITOR } from "../../../redux/constants/HOC/HOCConstants";
import { getProjectDetailAPIAction } from "../../../redux/actions/CyberBugs/ProjectActions";

const { Option } = Select;

export default function EditTaskModalCBB(props) {
  const dispatch = useDispatch();

  // call api get data
  useEffect(() => {
    dispatch(getStatusTaskAPIAction());
    dispatch(getPriorityTaskAPIAction());
    dispatch(getTaskTypeAPIAction());
    dispatch(getProjectDetailAPIAction(taskDetail.projectId));
  }, []);

  // get data from reducer
  const { userInfo } = useSelector((state) => state.UserReducers);
  const { taskDetail } = useSelector((state) => state.TaskReducers);
  const { lstStatusTask } = useSelector((state) => state.TaskReducers);
  const { projectDetail } = useSelector((state) => state.ProjectReducers);
  const { lstPriorityTask } = useSelector((state) => state.TaskReducers);
  const { lstTaskType } = useSelector((state) => state.TaskReducers);
  const { editor } = useSelector((state) => state.HOCReducers);

  const handleChange = (nameEdited, valueEdited) => {
    dispatch(updateTaskAPIAction(EDIT_TASK, nameEdited, valueEdited));
  };

  // handle render taskType
  const renderTaskTypeIcon = () => {
    switch (taskDetail.typeId) {
      case lstTaskType[0]?.id: {
        return <i className="fa-solid fa-bug"></i>;
      }
      case lstTaskType[1]?.id: {
        return <i className="fa-solid fa-bookmark"></i>;
      }
      default:
        return;
    }
  };

  const renderTaskType = () => (
    <div className="dropdown d-inline">
      <button
        className="dropdown-toggle border-0 bg-white iconTaskType"
        type="button"
        id="dropdownTaskType"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {renderTaskTypeIcon()}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownTaskType">
        {lstTaskType?.map((type, index) => (
          <li
            key={index}
            value={type.id}
            className={`px-2 py-1 taskTypeItem ${
              type.id === taskDetail.typeId ? "active" : null
            }`}
            onClick={(e) => {
              handleChange("typeId", e.target.value);
            }}
          >
            {type.taskType}
          </li>
        ))}
      </ul>
    </div>
  );

  // handle render taskName
  let [taskNameValue, setTaskNameValue] = useState(parser(taskDetail.taskName));
  let [taskNameFlag, setTaskNameFLag] = useState(true);

  useEffect(() => {
    setTaskNameValue(parser(taskDetail.taskName));
    setTaskNameFLag(true);
  }, [taskDetail.taskId]);

  const renderTaskName = () =>
    taskNameFlag ? (
      <h6
        type="button"
        className="mb-0"
        onClick={() => {
          setTaskNameFLag(false);
        }}
      >
        {taskDetail.taskName ? (
          taskDetail.taskName
        ) : (
          <span className="text-danger fw-lighter">Add task name</span>
        )}
      </h6>
    ) : (
      <div className="d-flex">
        <Input
          className="me-2"
          value={taskNameValue}
          name="taskName"
          onChange={(e) => {
            setTaskNameValue(e.target.value);
          }}
        />
        <Button
          className="me-2"
          type="primary"
          ghost
          onClick={() => {
            setTaskNameFLag(true);
            handleChange("taskName", taskNameValue);
          }}
        >
          Save
        </Button>
        <Button
          type="danger"
          ghost
          onClick={() => {
            setTaskNameFLag(true);
            setTaskNameValue(taskDetail?.taskName);
          }}
        >
          Cancel
        </Button>
      </div>
    );

  // handle render description
  useEffect(() => {
    dispatch(cancelEditorAction());
  }, [taskDetail.taskId]);

  const openEditorDescription = (obj, type) =>
    dispatch(openEditorAction(obj, type));

  const renderDescription = () => (
    <>
      <h6>Description</h6>
      <div className="contentDescriptionTask">
        {editor.visible !== TYPE_EDITOR.TASK_DESCRIPTION ? (
          <div
            type="button"
            onClick={() => {
              openEditorDescription(taskDetail, TYPE_EDITOR.TASK_DESCRIPTION);
            }}
          >
            {taskDetail.description ? (
              parser(taskDetail.description)
            ) : (
              <span className="text-danger fw-lighter">
                Add description content
              </span>
            )}
          </div>
        ) : (
          <EditorComponent />
        )}
      </div>
    </>
  );

  // handle render comment
  const renderComment = () => (
    <div className="mt-2">
      <h6>Comment</h6>
      {renderInsertComment()}
      {renderLstCommentTask()}
    </div>
  );

  const renderInsertComment = () => (
    <div className="d-flex w-100">
      <Avatar className="me-2" src={userInfo?.avatar} />
      <div className="w-100">
        {editor.visible !== TYPE_EDITOR.INSERT_COMMENT ? (
          <Input
            placeholder="Press to input new comment"
            className="form-control"
            onClick={() => {
              dispatch(
                openEditorAction(taskDetail, TYPE_EDITOR.INSERT_COMMENT)
              );
            }}
          />
        ) : (
          <EditorComponent />
        )}
      </div>
    </div>
  );

  const renderLstCommentTask = () => (
    <div className="listCommentTask mt-2">
      {taskDetail.lstComment?.map((comment, index) => (
        <div key={index} className="d-flex mt-1">
          {taskDetail.lstComment.length ? (
            <Avatar className="me-2" src={comment.avatar} />
          ) : null}
          <div className="w-100">
            <p className="mb-1 text-secondary">
              Comment by
              <span className="fw-bold ms-1">{comment?.name}</span>
            </p>
            {editor.object.id !== comment.id ? (
              <div>
                {parser(comment.commentContent)}
                <div>
                  <span
                    type="button"
                    className="text-secondary"
                    onClick={() => {
                      let commentEdit = {
                        ...comment,
                        taskId: taskDetail.taskId,
                      };
                      dispatch(
                        openEditorAction(commentEdit, TYPE_EDITOR.EDIT_COMMENT)
                      );
                    }}
                  >
                    Edit
                  </span>
                  <span className="mx-1">•</span>
                  <span
                    type="button"
                    className="text-secondary"
                    onClick={() => {
                      dispatch(
                        deleteCommentTaskAPIAction(
                          comment.id,
                          taskDetail.taskId
                        )
                      );
                    }}
                  >
                    Delete
                  </span>
                </div>
                <hr />
              </div>
            ) : (
              <EditorComponent />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // handle render statusList
  const renderStatusTask = () => (
    <div>
      <h6 className="mb-2">Status</h6>
      <Select
        className="w-100"
        name="statusId"
        value={taskDetail?.statusId}
        onChange={(value) => {
          handleChange("statusId", value);
        }}
      >
        {lstStatusTask?.map((status, index) => (
          <Option key={index} value={status.statusId}>
            {status.statusName}
          </Option>
        ))}
      </Select>
    </div>
  );

  // handle render priorityList
  const renderPriorityTask = () => (
    <div className="mt-3">
      <h6 className="mb-2">Priority</h6>
      <Select
        className="w-100"
        name="priorityId"
        value={taskDetail?.priorityId}
        onChange={(value, e) => {
          handleChange("priorityId", value);
        }}
      >
        {lstPriorityTask?.map((priority, index) => (
          <Option key={index} value={priority.priorityId}>
            {priority.priority}
          </Option>
        ))}
      </Select>
    </div>
  );

  // handle render assigness
  let [numberOfUser, setNumberOfUser] = useState(projectDetail.members.length);

  useEffect(() => {
    setNumberOfUser(projectDetail.members.length);
  }, [projectDetail]);

  const renderAssignessTask = () => (
    <div className="mt-3 assignees">
      <h6 className="mb-1">Assignees</h6>
      <div className="d-flex flex-wrap">
        {renderMemberList()}
        {renderLstAssignessOption()}
      </div>
    </div>
  );

  const renderMemberList = () =>
    projectDetail.members.length < 1 && taskDetail.assigness.length < 1 ? (
      <span className="text-info fw-lighter">
        Don't has member assigned in project
      </span>
    ) : (
      taskDetail.assigness?.map((member, index) => (
        <div
          key={index}
          className="d-flex align-items-center me-2 mt-1 p-1 member rounded-pill"
        >
          <Avatar src={member?.avatar} />
          <span className="ms-2">{member?.name}</span>
          <CloseOutlined
            type="button"
            className="fa fa-times icon removeIcon p-1 ms-1"
            onClick={() => {
              dispatch(
                updateTaskRemoveAssignessAPIAction(REMOVE_ASSIGNMENT, member.id)
              );
            }}
          />
        </div>
      ))
    );

  const renderLstAssignessOption = () =>
    taskDetail.assigness.length < numberOfUser ? (
      <div>
        <Button
          className="d-flex align-items-center justify-content-center addMember mt-1 "
          shape="circle"
          id="dropdownLstAssigness"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          <PlusOutlined />
        </Button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownLstAssigness"
        >
          {projectDetail.members
            .filter(
              (user) =>
                !taskDetail.assigness.find(
                  (member) => user.userId === member.id
                )
            )
            .map((user, index) => (
              <li
                key={index}
                value={user.userId}
                className="px-2 py-1 assigness"
                onClick={(e) => {
                  let userAdding = { ...user, id: e.target.value };
                  dispatch(
                    updateTaskAddAssignessAPIAction(ADD_ASSIGNMENT, userAdding)
                  );
                }}
              >
                {user.name}
              </li>
            ))}
        </ul>
      </div>
    ) : null;

  // handle render originalEstimate
  const renderOriginalEstimate = () => (
    <div className="mt-3">
      <h6 className="mb-2">Original Estimate (Hours)</h6>
      <InputNumber
        className="form-control w-100"
        name="originalEstimate"
        min={0}
        value={taskDetail?.originalEstimate}
        onChange={(value) => {
          handleChange("originalEstimate", value);
        }}
      />
    </div>
  );

  // handle render timeTracking
  let [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: taskDetail?.timeTrackingSpent,
    timeTrackingRemaining: taskDetail?.timeTrackingRemaining,
  });

  const renderTimeTracking = () => (
    <>
      <div className="mt-3">
        <h6 className="mb-2">Time tracking</h6>
        <Slider
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
      </div>
      <div className="mt-1 d-flex justify-content-between">
        <div className="me-3">
          <p className="mb-1">Time spent</p>
          <InputNumber
            className="w-100"
            name="timeTrackingSpent"
            min={0}
            value={taskDetail?.timeTrackingSpent}
            onChange={(value) => {
              setTimeTracking({
                ...timeTracking,
                timeTrackingSpent: value,
              });
              handleChange("timeTrackingSpent", value);
            }}
          />
        </div>
        <div className="text-end">
          <p className="mb-1">Time remaining</p>
          <InputNumber
            className="w-100"
            name="timeTrackingRemaining"
            min={0}
            value={taskDetail?.timeTrackingRemaining}
            onChange={(value) => {
              setTimeTracking({
                ...timeTracking,
                timeTrackingRemaining: value,
              });
              handleChange("timeTrackingRemaining", value);
            }}
          />
        </div>
      </div>
    </>
  );

  // handle render info and button delete task
  const renderInfoAndBtnDelete = () => (
    <div className="d-flex w-100">
      <div className="w-100">
        <div className="text-secondary mt-3">Create at: no binding</div>
        <div className="text-secondary">Last update at: no binding</div>
      </div>
      <div className="mt-auto align-items-end">
        <Button
          type="danger"
          shape="circle"
          data-bs-dismiss="modal"
          aria-label="Close"
          ghost
          icon={<DeleteOutlined />}
          onClick={() => {
            dispatch(
              deleteTaskAPIAction(taskDetail.taskId, taskDetail.projectId)
            );
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="modal-header headerEditTaskModal">
        <div
          className="modal-title d-flex align-items-center"
          id="modalToggleLabel"
        >
          {renderTaskType()}
          {renderTaskName()}
        </div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div className="modal-body bodyEditTaskModal">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              {renderDescription()}
              {renderComment()}
            </div>
            <div className="col-4">
              {renderStatusTask()}
              {renderAssignessTask()}
              {renderPriorityTask()}
              {renderOriginalEstimate()}
              {renderTimeTracking()}
              {renderInfoAndBtnDelete()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
