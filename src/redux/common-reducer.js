import "core-js/es/array";
import {
  ADD_EMPLOYEE_DATA,
  SET_LOADER,
  SET_SHOW_COMMON_MODAL,
  SET_SHOW_COMMON_MODAL_CONTENT,
  SET_LOGIN_STATUS,
} from "./actions";
const initialState = {
  sidebarShow: "responsive",
  loader: false,
  isCommonModalVisible: false,
  commonModalContent: {},
  data: {
    employee_code: "",
    employee_name: "",
    entry_made_on: "",
    employee_photo: "",
    entry_added_by: "",
    employee_grade: "",
    work_location: "",
    vehicle_group: "",
    experience_status: "",
    years_of_experience: "",
    education: "",
    mobile_no: "",
    mobile_relation: "",
    whatsapp_status: "",
    emergency_contact: "",
    emergency_person_relation: "",
    emergency_contact_no: "",
    bank_account_name: "",
    account_relation: "",
    bank_name: "",
    bank_account_no: "",
    bank_ifsc_code: "",
    bank_branch: "",
    passbook_photo: "",
    aadhar_no: "",
  },
  loginStatus: false,
};

const commonReducer = (
  state = initialState,
  { type, payload, values, ...rest }
) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };

    case ADD_EMPLOYEE_DATA:
      return { ...state, data: values };

    case SET_LOADER:
      return { ...state, loader: payload };

    case SET_SHOW_COMMON_MODAL: {
      return { ...state, isCommonModalVisible: payload };
    }

    case SET_SHOW_COMMON_MODAL_CONTENT: {
      return { ...state, commonModalContent: payload };
    }
    case SET_LOGIN_STATUS: {
      return { ...state, loginStatus: payload };
    }
    default:
      return state;
  }
};
export default commonReducer;
