import axios from "axios";

const { default: apiClient } = require("src/apis/api-client");
const { default: apiUrls } = require("src/apis/apis");

const getEmployeesPaginate = async (
  query,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(
      apiUrls.employee.getEmployeePaginate(query)
    );
    console.log(data, "getEmployeePaginate-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getEmployeePaginate-error");
    failCallback();
  }
};

const getEmployees = () => {
  return axios.get("http://localhost:5000/employee");
};

const getUsersWithSelectedFields = async (
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.post(
      apiUrls.employee.getUsersWithSelectedFields,
      dataToSend
    );
    console.log(data, "getUsersWithSelectedFields-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "getUsersWithSelectedFields-error");
    failCallback();
  }
};

const exportEmployees = async (
  type,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.get(
      apiUrls.employee.exportEmployees(type)
    );
    console.log(data, "exportEmployees-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "exportEmployees-error");
    failCallback();
  }
};

export {
  getEmployeesPaginate,
  getEmployees,
  exportEmployees,
  getUsersWithSelectedFields,
};
