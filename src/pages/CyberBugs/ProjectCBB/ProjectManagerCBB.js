/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Avatar,
  Popconfirm,
  Popover,
  AutoComplete,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  assignUserProjectAPIAction,
  deleteProjectAPIAction,
  editProjectAction,
  getListProjectAPIAction,
  pushToProjectDetailPageAction,
  removeUserProjectAPIAction,
} from "../../../redux/actions/CyberBugs/ProjectActions";
import { openDrawerAction } from "../../../redux/actions/HOC/HOCActions";
import parser from "html-react-parser";
import EditProjectDrawerCBB from "../../../components/CyberBugs/DrawerCBB/EditProjectDrawerCBB";
import {
  getListUserAPIAction,
  getListUserKeywordAPIAction,
} from "../../../redux/actions/CyberBugs/UserActions";

export default function ProjectManagerCBB(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProjectAPIAction());
    dispatch(getListUserAPIAction());
  }, []);

  const { lstProject } = useSelector((state) => state.ProjectReducers);
  const { lstUser } = useSelector((state) => state.UserReducers);

  /*--------Autocomplete ddd user-------*/
  let [keyword, setKeyword] = useState(null);
  const keywordRef = useRef(null);

  /*--------Popover table list member-------*/
  const contentMember = (project) => {
    const columnsPopover = [
      {
        title: "User Id",
        dataIndex: "userId",
        key: "userId",
      },
      {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record, index) => <Avatar src={record.avatar} />,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        dataIndex: "action",
        key: "action",
        render: (text, record, index) => (
          <Popconfirm
            placement="left"
            title={`Are you sure?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              let userId = record.userId;
              let projectId = project.id;
              dispatch(removeUserProjectAPIAction(projectId, userId));
            }}
          >
            <Button
              type="danger"
              shape="circle"
              ghost
              icon={<CloseOutlined />}
            />
          </Popconfirm>
        ),
      },
    ];

    return (
      <Table
        size="small"
        rowKey={(obj) => obj.name}
        pagination={{ hideOnSinglePage: true }}
        dataSource={project.members}
        columns={columnsPopover}
      />
    );
  };

  /*--------Table list project-------*/
  let [sortedInfo, setSortedInfo] = useState(null);
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  sortedInfo = sortedInfo || {};

  const renderMembers = (members) =>
    members
      ?.slice(0, 3)
      .map((member, index) => (
        <Avatar className="me-1" key={index} src={member.avatar} alt="avatar" />
      ));

  const columns = [
    {
      title: "Project Id",
      dataIndex: "id",
      key: "id",
      width: "100px",
      ellipsis: true,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
    },
    {
      title: "Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => {
        let after = a.projectName?.trim().toLowerCase();
        let before = b.projectName?.trim().toLowerCase();
        if (before < after) {
          return -1;
        }
        return 1;
      },
      sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
      ellipsis: true,
      render: (text, record, index) => (
        <span
          className="text-primary"
          type="button"
          onClick={() => {
            dispatch(pushToProjectDetailPageAction(record.id));
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text, record, index) =>
        parser(text).props?.children === undefined
          ? parser(text)[0]?.props?.children
          : parser(text)?.props?.children,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => (
        <Tag color="cyan">{parser(record.creator.name)}</Tag>
      ),
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      render: (text, record, index) => (
        <>
          <Popover placement="left" content={() => contentMember(record)}>
            {renderMembers(record.members)}
            {record.members?.length > 3 ? (
              <Avatar className="me-2" icon={<EllipsisOutlined />} />
            ) : null}
          </Popover>
          <Popover
            title="Add user"
            placement="left"
            trigger="click"
            content={() => (
              <AutoComplete
                className="w-100"
                placeholder="Input User Name"
                value={keyword}
                options={lstUser?.map((user, index) => ({
                  label: user.name,
                  value: user.userId.toString(),
                }))}
                onChange={(textUserInput) => {
                  setKeyword(textUserInput);
                }}
                onSearch={(keyword) => {
                  if (keywordRef.current) {
                    clearTimeout(keywordRef.current);
                  }
                  keywordRef.current = setTimeout(() => {
                    dispatch(getListUserKeywordAPIAction(keyword));
                  }, 300);
                }}
                onSelect={(userId) => {
                  setKeyword(null);
                  userId = Number(userId);
                  let projectId = record.id;
                  dispatch(assignUserProjectAPIAction(projectId, userId));
                }}
              />
            )}
          >
            <Button shape="circle" icon={<PlusOutlined />} />
          </Popover>
        </>
      ),
    },
    {
      dataIndex: "action",
      key: "action",
      align: "center",
      width: "120px",
      render: (text, record, index) => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            ghost
            icon={<EditOutlined />}
            onClick={() => {
              dispatch(
                openDrawerAction("Edit Project", <EditProjectDrawerCBB />)
              );
              dispatch(editProjectAction(record));
            }}
          />
          <Popconfirm
            placement="left"
            title={`Are you sure?`}
            onConfirm={() => {
              dispatch(deleteProjectAPIAction(record));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              shape="circle"
              ghost
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <h3 className="my-3">Project Management</h3>
      <div>
        <Table
          bordered
          size="middle"
          pagination={{ pageSize: 8, size: "Default" }}
          rowKey="id"
          columns={columns}
          dataSource={lstProject}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
