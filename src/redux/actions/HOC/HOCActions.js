import {
  CANCEL_DRAWER,
  CANCEL_EDITOR,
  OPEN_DRAWER,
  OPEN_EDITOR,
  OPEN_MODAL,
  SUBMIT_DRAWER,
} from "../../constants/HOC/HOCConstants";

/*---------bootstrap----------*/
export const openModalAction = (modalContent, modalSize) => ({
  type: OPEN_MODAL,
  modalContent,
  modalSize,
});

/*-----------drawer-----------*/
export const openDrawerAction = (title, drawerContent) => ({
  type: OPEN_DRAWER,
  title,
  drawerContent,
});

export const cancelDrawerAction = () => ({
  type: CANCEL_DRAWER,
});

export const submitDrawerAction = (callBackSubmit) => ({
  type: SUBMIT_DRAWER,
  callBackSubmit,
});

/*-----------editor-----------*/
export const openEditorAction = (object, typeSubmit) => ({
  type: OPEN_EDITOR,
  object,
  typeSubmit,
});

export const cancelEditorAction = () => ({
  type: CANCEL_EDITOR,
});
