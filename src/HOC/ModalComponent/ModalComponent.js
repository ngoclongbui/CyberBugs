/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";

export default function ModalComponent(props) {
  let { modalContent, modalSize } = useSelector(
    (state) => state.HOCReducers.modal
  );

  const renderModal = (content, size) => {
    return (
      <div
        className="modal fade"
        id="modalToggle"
        tabIndex={-1}
        aria-labelledby="modalToggleLabel"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${size}`}
        >
          <div className="modal-content">{content}</div>
        </div>
      </div>
    );
  };

  return <>{renderModal(modalContent, modalSize)}</>;
}
