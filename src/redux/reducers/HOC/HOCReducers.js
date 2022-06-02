import {
  CANCEL_DRAWER,
  CANCEL_EDITOR,
  OPEN_DRAWER,
  OPEN_EDITOR,
  OPEN_MODAL,
  SUBMIT_DRAWER,
} from "../../constants/HOC/HOCConstants";
const initialState = {
  modal: {
    modalContent: null,
    modalSize: null,
  },
  drawer: {
    visible: false,
    title: null,
    drawerContent: null,
    callBackSubmit: (propsValues) => {},
  },
  drawerDefault: {
    visible: false,
    title: null,
    drawerContent: null,
    callBackSubmit: (propsValues) => {},
  },
  editor: {
    visible: null,
    object: {},
  },
  editorDefault: {
    visible: null,
    object: {},
  },
};

export const HOCReducers = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      let updateModal = { ...state.modal };
      updateModal.modalContent = action.modalContent;
      updateModal.modalSize = action.modalSize;
      return { ...state, modal: updateModal };
    }

    case OPEN_DRAWER: {
      let updateDrawer = { ...state.drawer };
      updateDrawer.visible = true;
      updateDrawer.title = action.title;
      updateDrawer.drawerContent = action.drawerContent;
      return { ...state, drawer: updateDrawer };
    }

    case CANCEL_DRAWER: {
      return { ...state, drawer: state.drawerDefault };
    }

    case SUBMIT_DRAWER: {
      let updateDrawer = { ...state.drawer };
      updateDrawer.callBackSubmit = action.callBackSubmit;
      return { ...state, drawer: updateDrawer };
    }

    case OPEN_EDITOR: {
      let updateEditor = { ...state.editor };
      updateEditor.visible = action.typeSubmit;
      updateEditor.object = action.object;
      return { ...state, editor: updateEditor };
    }

    case CANCEL_EDITOR: {
      return { ...state, editor: state.editorDefault };
    }

    default:
      return state;
  }
};
