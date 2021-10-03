import React, { useRef, useState } from "react";
import { CCard, CCol } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "src/components/formFields/fileUpload";
import { importAssets } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import SimpleButton from "src/components/buttons/simpleButton";
import apiUrls, { apiBaseUrl } from "src/apis/apis";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import { fields } from "./utils/fields";
import { JsonToCsv, useJsonToCsv } from "react-json-csv";

const MassUploadAssets = () => {
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
              if (fileChoosen) {
                dispatch({ type: SET_LOADER, payload: true });
                importAssets(
                  organization_id,
                  fileChoosen,
                  (data) => {
                    dispatch({ type: SET_LOADER, payload: false });
                    setResponseText(data?.message);
                    setExcelData(data?.data?.unUploadedAssetsList);
                  },
                  () => {
                    dispatch({ type: SET_LOADER, payload: false });
                  }
                );
              } else {
                dispatch({ type: SET_LOADER, payload: false });
                setResponseText("Upload a Valid CSV file");
              }
            }}
          >
            {({ errors, touched, values, setFieldValue }) => {
              return (
                <Form>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>Upload Assets</h3>
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
                    * only CSV files allowed
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
                  <p className="mt-2" style={{ fontSize: 12 }}>
                    Date format should be YYYY/MM/DD or YYYY-MM-DD
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    {excelData?.length > 0 ? (
                      <a
                        href="#"
                        onClick={() =>
                          saveAsCsv({
                            data: excelData,
                            fields: {
                              asset_type: "Asset Type",
                              asset_number: "Asset Number",
                              date_issued: "Date Issued",
                              date_returned: "Date Returned",
                              employee_code: "Employee Code",
                              error: "error",
                            },
                            filename: "Not Uploaded Assets",
                          })
                        }
                        className="mt-2"
                      >
                        Download file for rejected assets
                      </a>
                    ) : (
                      <a
                        href={`${apiBaseUrl}${apiUrls?.downloads?.assetUploadSampleSheet}`}
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

export default MassUploadAssets;
