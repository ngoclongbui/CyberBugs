import React from "react";
import { Popover, Avatar } from "antd";
import parser from "html-react-parser";
export default function InfoMainCBB(props) {
  let { project } = props;

  return (
    <div className="container-fluid">
      <h3 className="mb-3">{project.projectName}</h3>
      <div className="row" style={{ height: "100px" }}>
        <div className="col-4">
          <div>
            <span className="me-2 fw-bold text-secondary">Creator:</span>
            <span>{project.creator?.name}</span>
          </div>
          <div className="mt-2">
            <span className="me-2 fw-bold text-secondary">Category:</span>
            <span>{project.projectCategory?.name}</span>
          </div>
          <div className="mt-2">
            <span className="me-2 fw-bold text-secondary">Members:</span>
            {project.members?.length ? (
              project.members?.map((member, index) => (
                <Popover key={index} content={member.name}>
                  <Avatar className="me-1" src={member.avatar} alt="avatar" />
                </Popover>
              ))
            ) : (
              <span>Chưa có thành viên tham gia vào dự án</span>
            )}
          </div>
        </div>
        <div className="col-7">
          <div className="row justify-content-start">
            <div className="col-2 align-self-start">
              <span className="me-2 fw-bold text-secondary">Description:</span>
            </div>
            <div className="col overflow-auto" style={{ maxHeight: "90px" }}>
              {project.description ? (
                parser(project.description)
              ) : (
                <span>Chưa có mô tả chi tiết</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
