import localStorageConstants from "src/constants/localstorageConstants";
import axios from "axios";
const { default: apiClient } = require("src/apis/api-client");
const { default: apiUrls } = require("src/apis/apis");

const addEmployee = async (
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.post(
      apiUrls.employee.addEmployee,
      dataToSend
    );
    console.log(data, "addEmployee-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "addEmployee-error");
    failCallback();
  }
};

const changeStatus = async (
  _id,
  status,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(
      apiUrls.employee.changeStatus(status, _id)
    );
    console.log(data, "changeStatus-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "changeStatus-error");
    failCallback();
  }
};

const getEmployeesForManagers = async (
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.post(
      apiUrls.employee.getEmployeesForManagers,
      dataToSend
    );
    console.log(data, "getEmployeesForManagers-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getEmployeesForManagers-error");
    failCallback();
  }
};

const isEmployeeExist = async (
  key,
  value,
  context,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(
      apiUrls.employee.isEmployeeExist(key, value, context?.parent?._id)
    );
    console.log(data, context, "isEmployeeExist-success");
    return data.isValid;
  } catch (err) {
    console.log(err, "isEmployeeExist-error");
    failCallback();
  }
};

const getEmployees = async (
  queryString,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const data = await axios.get(`http://localhost:5000/getdata/${queryString}`)
    console.log(data.data.data, "getEmployee-success");
    successCallback(data.data.data);
    return data?.data?.data;
  } catch (err) {
    console.log(err, "getEmployee-error");
    failCallback();
  }
};

const addAssets = async (dataToSend, callBack = () => {}) => {
  try {
    const { data = {} } = await apiClient.post(
      apiUrls.asset.addAssets,
      dataToSend
    );
    console.log(data, "addAssets-success");
    callBack(null, null);
  } catch (err) {
    console.log(err, "addAssets-error");
    callBack(err, err);
  }
};

const getAssets = async (
  query,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(apiUrls.asset.getAssets(query));
    console.log(data, "getAssets-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getAssets-error");
    failCallback();
  }
};

const deleteAssets = async (
  _id,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.delete(
      apiUrls.asset.deleteAssets(_id)
    );
    console.log(data, "deleteAssets-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "deleteAssets-error");
    failCallback();
  }
};

const updateEmployee = async (
  _id,
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.patch(
      `${apiUrls.employee.updateEmployee}?_id=${_id}`,
      dataToSend
    );
    console.log(data, "updateEmployee-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "updateEmployee-error");
    failCallback();
  }
};

const uploadUserDocument = async (userId, item, callBack = () => {}) => {
  var formData = new FormData();
  console.log(item?.image, "item?.image");
  if (item?.image) {
    formData.append("image", item?.image);
  }
  if (item?.type) {
    formData.append("type", item?.type);
  }
  formData.append("user_id", userId);
  if (item?.title) {
    formData.append("title", item?.title);
  }
  if (item?._id) {
    formData.append("_id", item?._id);
  }
  if (item?.number) {
    formData.append("number", item?.number);
  }
  try {
    const { data = {} } = await apiClient.post(
      apiUrls.userDocuments?.upload,
      formData
    );
    console.log(item, data, "uploadUserDocument-success");
    callBack(null, data);
  } catch (err) {
    console.log(err, "uploadUserDocument-error");
    callBack(err, err);
  }
};

const getUserDocuments = async (
  userId,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(
      apiUrls.userDocuments?.getUserDocuments(userId)
    );
    console.log(data, "getUserDocuments-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getUserDocuments-error");
    failCallback();
  }
};

const getUserPassword = async (
  _id,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(
      apiUrls.employee?.getUserPassword(_id)
    );
    console.log(data, "getUserPassword-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getUserPassword-error");
    failCallback();
  }
};

const getPresignedUrl = async (
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.post(
      apiUrls.getPresignedUrl,
      dataToSend
    );
    console.log(data, "getPresignedUrl-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getPresignedUrl-error");
    failCallback();
  }
};

const deleteUserDocument = async (
  id,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.delete(
      apiUrls.userDocuments.deleteUserDocument(id)
    );
    console.log(data, "deleteUserDocument-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "deleteUserDocument-error");
    failCallback();
  }
};

const uploadProfilePicture = async (
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    var { user_id, image } = dataToSend;
    var formData = new FormData();
    if (user_id && image) {
      formData?.append("image", image);
      formData?.append("user_id", user_id);
    }
    const { data = {} } = await apiClient.post(
      apiUrls.employee?.uploadProfilePicture,
      formData
    );
    console.log(data, "uploadProfilePicture-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "uploadProfilePicture-error");
    failCallback();
  }
};

export {
  deleteUserDocument,
  uploadUserDocument,
  getUserDocuments,
  addEmployee,
  addAssets,
  getAssets,
  deleteAssets,
  getEmployeesForManagers,
  isEmployeeExist,
  changeStatus,
  updateEmployee,
  getUserPassword,
  getPresignedUrl,
  getEmployees,
  uploadProfilePicture,
};
