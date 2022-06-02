/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "antd";
import { cancelEditorAction } from "../../redux/actions/HOC/HOCActions";
import {
  editCommentTaskAPIAction,
  insertCommentTaskAPIAction,
  updateTaskAPIAction,
} from "../../redux/actions/CyberBugs/TaskActions";
import { EDIT_TASK } from "../../redux/constants/CyberBugs/TaskConstants";
import { TYPE_EDITOR } from "../../redux/constants/HOC/HOCConstants";

export default function EditorComponent() {
  const { visible, object } = useSelector((state) => state.HOCReducers.editor);

  let [valueChange, setValueChange] = useState(null);

  useEffect(() => {
    switch (visible) {
      case TYPE_EDITOR.TASK_DESCRIPTION:
        setValueChange(object.description);
        return;

      case TYPE_EDITOR.EDIT_COMMENT:
        setValueChange(object.commentContent);
        return;

      default:
        return;
    }
  }, []);

  const dispatch = useDispatch();

  return visible ? (
    <div>
      <div className="mb-2">
        <Editor
          value={valueChange}
          init={{
            height: 200,
            menubar: false,
            content_style: "body {font-size:16px }",
          }}
          onEditorChange={(value) => {
            setValueChange(value);
          }}
        />
      </div>
      <Button
        className="me-2"
        type="primary"
        ghost
        onClick={() => {
          dispatch(cancelEditorAction());
          switch (visible) {
            case TYPE_EDITOR.TASK_DESCRIPTION:
              dispatch(
                updateTaskAPIAction(EDIT_TASK, "description", valueChange)
              );
              return;

            case TYPE_EDITOR.INSERT_COMMENT:
              dispatch(insertCommentTaskAPIAction(object.taskId, valueChange));
              return;

            case TYPE_EDITOR.EDIT_COMMENT:
              dispatch(
                editCommentTaskAPIAction(object.id, valueChange, object.taskId)
              );
              return;

            default:
              return;
          }
        }}
      >
        Save
      </Button>
      <Button
        type="danger"
        ghost
        onClick={() => {
          dispatch(cancelEditorAction());
        }}
      >
        Cancel
      </Button>
    </div>
  ) : null;
}
