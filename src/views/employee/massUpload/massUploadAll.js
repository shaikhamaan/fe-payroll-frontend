import React, { useRef, useState } from "react";
import { CCard, CCol } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "src/components/formFields/fileUpload";
import { importEmployees } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import SimpleButton from "src/components/buttons/simpleButton";
import apiUrls, { apiBaseUrl } from "src/apis/apis";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import { fields } from "./utils/fields";
import { JsonToCsv, useJsonToCsv } from "react-json-csv";
import xlsx from "json-as-xlsx";
import Colors from "src/constants/colors";

const MassUploadAll = () => {
  const organization_id = useSelector(
    (state) => state?.auth?.userDetails?.organization_id
  );

  const dispatch = useDispatch();
  const [fileChoosen, setFileChoosen] = useState("");
  const [successMessage, setSuccessMessage] = useState({});
  const [failedMessage, setFailedMessage] = useState({});
  const [error, setError] = useState("");
  const [allData, setAllData] = useState({});
  const [excelData, setExcelData] = useState([]);
  const [disable, setDisable] = useState(false);
  import axios from 'axios'
  // var textInputRef = useRef()
  const { saveAsCsv } = useJsonToCsv();
  let settings = {
    fileName: "RejectedItems",
    extraLength: 4,
    writeOptions: {},
  };

  return (
    <div>
      <CCol xs="12" lg="12">
        <CCard className="p-4">
          <Formik
            enableReinitialize
            initialValues={{}}

            onSubmit={async (values) => {

              if (fileChoosen) {
                dispatch({ type: SET_LOADER, payload: true });
                importEmployees(
                  organization_id,
                  fileChoosen,
                  (data) => {
                    if (data?.status === "success") {
                      setAllData(data);
                      setSuccessMessage({
                        employee: data?.employeesSuccessMessage,
                        asset: data?.assetsSuccessMessage,
                        document: data?.documentsSuccessMessage,
                      });
                      setFailedMessage({
                        employee: data?.employeesFailedMessage,
                        asset: data?.assetsFailedMessage,
                        document: data?.documentsFailedMessage,
                      });
                      setExcelData([
                        {
                          sheet: "Rejected Employees",
                          columns: fields,
                          content: data?.rejectedEmployees,
                        },
                        {
                          sheet: "Rejected Assets",
                          columns: [
                            { label: "Asset Type", value: "Asset Type" },
                            { label: "Asset Number", value: "Asset Number" },
                            { label: "Date Issued", value: "Date Issued" },
                            { label: "Date Returned", value: "Date Returned" },
                            { label: "Employee Code", value: "Employee Code" },
                            { label: "Errors", value: "error" },
                          ],
                          content: [...data?.rejectedAssets],
                        },
                        {
                          sheet: "Rejected Documents",
                          columns: [
                            { label: "Employee Code", value: "Employee Code" },
                            { label: "Number", value: "Number" },
                            { label: "Type", value: "Type" },
                            { label: "Title", value: "Title" },
                            { label: "Errors", value: "error" },
                          ],
                          content: data?.rejectedDocuments,
                        },
                      ]);
                      dispatch({ type: SET_LOADER, payload: false });
                    } else {
                      setError(data?.message);
                      dispatch({ type: SET_LOADER, payload: false });
                    }
                  },
                  () => {
                    dispatch({ type: SET_LOADER, payload: false });
                    setError(["Network Error"]);
                  }
                );
              } else {
                dispatch({ type: SET_LOADER, payload: false });
                setError(["Upload a Valid CSV file"]);
              }
            }}
          >
            {({ errors, touched, values, setFieldValue, submitForm }) => {
              return (
                <Form>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>Upload Employees</h3>
                  </div>

                  <FileUpload
                    onFileSelect={(e) => {
                      setFileChoosen(e);
                    }}
                  />

                  <p
                    className="mt-2"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    * only xlsx files allowed
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Note: Sheet 1 is for Employees, Sheet 2 is for Assets, Sheet
                    3 is for Documents
                  </p>
                  {error ? (
                    <div>
                      <p
                        className="mt-0"
                        style={{
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        {error}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        className="mt-0"
                        style={{
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        <span style={{ color: "green" }}>
                          {successMessage?.employee}
                        </span>
                        {allData?.rejectedEmployees?.length > 0
                          ? `, ${failedMessage?.employee}`
                          : null}
                      </p>
                      <p
                        className="mt-0"
                        style={{
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        <span style={{ color: "green" }}>
                          {successMessage?.asset}
                        </span>
                        {allData?.rejectedAssets?.length > 0
                          ? `, ${failedMessage?.asset}`
                          : null}
                      </p>
                      <p
                        className="mt-0"
                        style={{
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        <span style={{ color: "green" }}>
                          {successMessage?.document}
                        </span>
                        {allData?.rejectedDocuments?.length > 0
                          ? `, ${failedMessage?.document}`
                          : null}
                      </p>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center">
                    {excelData?.length > 0 ? (
                      <a
                        href="#"
                        onClick={() => {
                          console.log(excelData, "myExcel");
                          xlsx(excelData, settings);
                        }}
                        className="mt-2"
                      >
                        Download file for rejected items
                      </a>
                    ) : (
                      <a
                        href="https://hrms-user-documents.s3.us-east-2.amazonaws.com/public/sample+(2)+(2).xlsx"
                        download
                        className="mt-2"
                      >
                        Download sample file
                      </a>
                    )}

                    <SimpleButton
                      title="Submit"
                      color="primary"
                      className="float-right my-3 mt-4"
                      onClick={console.log('clicked')}
                      disable={disable}
                    />
                  </div>

                </Form>
              );
            }}
          </Formik>
        </CCard>
      </CCol>
    </div>
  );
};

export default MassUploadAll;
