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

const MassUploadEmployees = () => {
  const organization_id = useSelector(
    (state) => state?.auth?.userDetails?.organization_id
  );
  const dispatch = useDispatch();
  const [fileChoosen, setFileChoosen] = useState("");
  const [responseText, setResponseText] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [disable, setDisable] = useState(false);
  // var textInputRef = useRef()
  const { saveAsCsv } = useJsonToCsv();
  return (
    <div>
      <CCol xs="12" lg="12">
        <CCard className="p-4">
          <Formik
            enableReinitialize
            initialValues={{}}
            onSubmit={async (values) => {
              // if (fileChoosen) {
              //   dispatch({ type: SET_LOADER, payload: true });
              //   importEmployees(
              //     organization_id,
              //     fileChoosen,
              //     (data) => {
              //       dispatch({ type: SET_LOADER, payload: false });
              //       setResponseText(data?.message);
              //       setExcelData(data?.data?.unUploadedEmployeesList);
              //     },
              //     () => {
              //       dispatch({ type: SET_LOADER, payload: false });
              //     }
              //   );
              // } else {
              //   dispatch({ type: SET_LOADER, payload: false });
              //   setResponseText("Upload a Valid CSV file");
              // }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => {
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
                  {responseText?.length > 0 ? (
                    <p
                      className="mt-2"
                      style={{
                        fontSize: 12,
                        color: responseText.length ? "red" : null,
                      }}
                    >
                      {responseText}
                    </p>
                  ) : null}
                  <div className="d-flex justify-content-between align-items-center">
                    {excelData?.length > 0 ? (
                      <a
                        href="#"
                        onClick={() =>
                          saveAsCsv({
                            data: excelData,
                            fields,
                            filename: "Not Uploaded Employees",
                          })
                        }
                        className="mt-2"
                      >
                        Download file for rejected employees
                      </a>
                    ) : (
                      <a
                        href="#"
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
                      type="submit"
                      disable={disable}
                      // ref={textInputRef}
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

export default MassUploadEmployees;
