/* eslint-disable no-useless-escape */
import React from "react";
import { useDispatch } from "react-redux";
import { Popover, Avatar, Button } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getTaskDetailAPIAction,
  openCreateTaskAction,
  updateTaskAPIAction,
} from "../../../redux/actions/CyberBugs/TaskActions";
import {
  BY_PROJECT_DETAIL,
  EDIT_TASK,
} from "../../../redux/constants/CyberBugs/TaskConstants";

export default function ContentMainCBB(props) {
  let { project } = props;

  const dispatch = useDispatch();

  const handleDragStart = (taskDetail) => {
    dispatch(getTaskDetailAPIAction(taskDetail.taskId));
  };

  const handleOnDrop = (nameEdited, valueEdited) => {
    dispatch(updateTaskAPIAction(EDIT_TASK, nameEdited, valueEdited));
  };

  const handleOnDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const renderCardTask = () =>
    project.lstTask?.map((task, index) => (
      <div
        onDragOver={(e) => {
          handleOnDragOver(e);
        }}
        onDrop={() => {
          handleOnDrop("statusId", task.statusId);
        }}
        className="card me-2 pb-2 cardTask"
        key={index}
      >
        <div className="card-header pb-2 ">{task.statusName}</div>
        {renderListTaskDetail(task.lstTaskDeTail)}
        <Button
          className="mt-2 mx-auto"
          shape="circle"
          size="large"
          onClick={() => {
            dispatch(
              openCreateTaskAction(BY_PROJECT_DETAIL, project.id, task.statusId)
            );
          }}
          icon={<PlusOutlined />}
        />
      </div>
    ));

  const renderListTaskDetail = (lstTaskDeTail) => (
    <ul className="list-group list-group-flush border-0 listTask">
      {lstTaskDeTail?.map((taskDetail, index) => (
        <li
          className="list-group-item shadow-sm mt-2 mx-2 rounded-3"
          data-bs-toggle="modal"
          data-bs-target="#modalToggle"
          draggable="true"
          onDragStart={() => {
            handleDragStart(taskDetail);
          }}
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(getTaskDetailAPIAction(taskDetail.taskId));
          }}
        >
          <div className="d-flex justify-content-between">
            <h6>{taskDetail?.taskName}</h6>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="flex-row">{taskDetail.priorityTask?.priority}</div>
            <div className="flex-row-reverse">
              <div className="avatar-group d-flex">
                {taskDetail.assigness?.length > 2 ? (
                  <Avatar icon={<EllipsisOutlined />} />
                ) : null}
                {renderAssigness(taskDetail.assigness)}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderAssigness = (assigness) =>
    assigness?.slice(0, 2).map((assign, index) => (
      <Popover key={index} content={assign.name}>
        <Avatar className="ms-1" src={assign.avatar} alt="avatar" />
      </Popover>
    ));

  return (
    <div className="container-fluid mt-2 mb-3 ">
      <div className="p-0 d-flex justify-content-between ">
        {renderCardTask()}
      </div>
    </div>
  );
}
