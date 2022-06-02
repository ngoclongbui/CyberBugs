/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button, Popconfirm, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteUserAPIAction,
  getListUserAPIAction,
  getListUserKeywordAPIAction,
  updateUserAction,
} from "../../../redux/actions/CyberBugs/UserActions";
import { openModalAction } from "../../../redux/actions/HOC/HOCActions";
import EditUserModalCBB from "../../../components/CyberBugs/ModalCBB/EditUserModalCBB";
const { Search } = Input;

export default function UserManagerCBB(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUserAPIAction());
  }, []);

  let { lstUser } = useSelector((state) => state.UserReducers);

  const onSearch = (value) => {
    dispatch(getListUserKeywordAPIAction(value));
  };

  let [sortedInfo, setSortedInfo] = useState(null);
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  sortedInfo = sortedInfo || {};
  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      width: "100px",
      ellipsis: true,
      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      dataIndex: "action",
      key: "action",
      align: "center",
      width: "120px",
      render: (text, record, index) => (
        <Space>
          <Button
            data-bs-toggle="modal"
            data-bs-target="#modalToggle"
            type="primary"
            shape="circle"
            ghost
            icon={<EditOutlined />}
            onClick={() => {
              dispatch(updateUserAction(record));
              dispatch(openModalAction(<EditUserModalCBB />, null));
            }}
          />
          <Popconfirm
            placement="left"
            title={`Are you sure?`}
            onConfirm={() => {
              dispatch(deleteUserAPIAction(record.userId));
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
      <h3 className="my-3">User Manager</h3>
      <Search
        className="mb-3"
        placeholder="Input keyword"
        allowClear
        enterButton="Search"
        onSearch={onSearch}
      />
      <div>
        <Table
          bordered
          size="middle"
          pagination={{ pageSize: 8, size: "Default" }}
          rowKey="userId"
          columns={columns}
          dataSource={lstUser}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
