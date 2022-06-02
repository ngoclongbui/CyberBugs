import React from "react";
import { Drawer, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cancelDrawerAction } from "../../redux/actions/HOC/HOCActions";

export default function DrawerComponent(props) {
  const dispatch = useDispatch();

  const { visible, title, drawerContent, callBackSubmit } = useSelector(
    (state) => state.HOCReducers.drawer
  );

  const onClose = () => {
    dispatch(cancelDrawerAction());
  };

  return (
    <>
      <Drawer
        title={title}
        placement="right"
        width={720}
        onClose={onClose}
        visible={visible}
        closable={false}
        extra={
          <Space>
            <Button type="danger" onClick={onClose} ghost>
              Cancel
            </Button>
            <Button type="primary" onClick={callBackSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
