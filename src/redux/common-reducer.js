import {
  SET_LOADER,
  SET_SHOW_COMMON_MODAL,
  SET_SHOW_COMMON_MODAL_CONTENT,
} from "./actions";
const initialState = {
  sidebarShow: "responsive",
  loader: false,
  isCommonModalVisible: false,
  commonModalContent: {},
};

const commonReducer = (state = initialState, { type, payload, ...rest }) => {
  console.log(type, "action.type");
  switch (type) {
    case "set":
      return { ...state, ...rest };

    case SET_LOADER:
      return { ...state, loader: payload };

    case SET_SHOW_COMMON_MODAL: {
      return { ...state, isCommonModalVisible: payload };
    }

    case SET_SHOW_COMMON_MODAL_CONTENT: {
      return { ...state, commonModalContent: payload };
    }
    default:
      return state;
  }
};
export default commonReducer;
