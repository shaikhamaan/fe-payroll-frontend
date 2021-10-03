import { useSelector } from "react-redux";
const { default: apiClient } = require("src/apis/api-client");
const { default: apiUrls } = require("src/apis/apis");

const importEmployees = async (
  organization_id,
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  var formData = new FormData();
  formData.append("myFile", dataToSend);
  formData.append("org_id", organization_id);
  try {
    console.log(formData, "idddddddddd");
    const { data = {} } = await apiClient.post(
      apiUrls.employee.importEmployees,
      formData
    );
    console.log(data, "importEmployees-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "importEmployees-error");
    failCallback();
  }
};

const importAssets = async (
  organization_id,
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  var formData = new FormData();
  formData.append("csvfile", dataToSend);
  formData.append("organization_id", organization_id);
  try {
    console.log(formData, "idddddddddd");
    const { data = {} } = await apiClient.post(
      apiUrls.asset.importAssets,
      formData
    );
    console.log(data, "importAssets-success");
    successCallback(data);
  } catch (err) {
    console.log(err, "importAssets-error");
    failCallback();
  }
};

export { importEmployees, importAssets };
