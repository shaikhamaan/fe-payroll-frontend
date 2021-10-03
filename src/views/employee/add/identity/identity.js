import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CFormGroup, CCol, CButton } from "@coreui/react";
import { getUserDocuments, uploadUserDocument } from "../api";
import { SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import mapSeries from "async/mapSeries";
import { useParams } from "react-router";
import IdentityInput from "./identityInput";
import identityInitialValues from "./initialValues";
import SimpleReactLightbox from "simple-react-lightbox";
import FilePicker from "src/components/formFields/filePicker";
import SimpleInput from "src/components/formFields/simpleInput";
import { useSnackbar } from "notistack";
import identityValidation from "./validation";
import ImagePreview from "src/components/previews/imagePreview";
import localStorageConstants from "src/constants/localstorageConstants";

function Identity({ setActive, userDetails: { _id }, isDisabled }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const [userDocuments, setUserDocuments] = useState([]);
  const [refreshDocs, setRefreshDocs] = useState(0);
  const userId = id ? id : _id;
  function convert(arr, key) {
    let output = {};
    arr.forEach(function (item) {
      if (output[item[key]] !== "undefined") {
        output[item[key]] = item;
      }
    });
    console.log(output);
    return output;
  }

  useEffect(() => {
    getUserDocuments(
      userId,
      (data) => {
        if (data?.status === "success" && data?.data?.length > 0) {
          let newArray = convert(data?.data, "type");
          console.log(newArray, "modifiedData");
          let modifiedData;
          Object.keys(identityInitialValues).map((item) => {
            modifiedData = {
              ...modifiedData,
              [item]: { ...identityInitialValues[item], ...newArray[item] },
            };
          });

          console.log(modifiedData, "modifiedData getUserDocuments item");
          setUserDocuments(modifiedData);
        } else {
          setUserDocuments(identityInitialValues);
        }
      },
      () => {}
    );
  }, [refreshDocs]);

  console.log(userDocuments, "userDocuments");
  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={userDocuments}
            validationSchema={identityValidation}
            onSubmit={async (values) => {
              console.log(values, "userDocumentssss on submit");
              // return;
              dispatch({ type: SET_LOADER, payload: true });
              mapSeries(
                Object.keys(values),
                (item, async_callback) => {
                  if (values[item]?.number) {
                    uploadUserDocument(userId, values[item], async_callback);
                  } else {
                    async_callback(null, null);
                  }
                },
                (err, result) => {
                  console.log(err, result, "async_callback");
                  dispatch({ type: SET_LOADER, payload: false });
                  if (!err) {
                    enqueueSnackbar("Saved.", {
                      variant: "success",
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                    });
                    setActive(3);
                    setRefreshDocs(refreshDocs + 1);
                  }
                }
              );
            }}
          >
            {({ errors, touched, values, setFieldValue, resetForm }) => {
              const propsToPasss = {
                touched,
                values,
                setFieldValue,
              };
              console.log(values, errors, "userDocumentssss");
              return (
                <Form>
                  <CCardBody>
                    <CFormGroup row className="mt-2">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          placeholder="Enter Aadhar Number"
                          onChange={(e) => {
                            setFieldValue("Aadhar.number", e.target.value);
                          }}
                          value={values?.Aadhar?.number}
                          error={
                            touched?.Aadhar?.number && errors?.Aadhar?.number
                          }
                          title="Aadhar"
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol
                        xs="12"
                        lg="6"
                        style={{
                          marginTop: 28,
                        }}
                      >
                        <FilePicker
                          userId={userId}
                          filePath={values?.Aadhar?.filePath}
                          onFileSelect={(e) => {
                            setFieldValue(`Aadhar.image`, e);
                          }}
                          error={
                            touched?.Aadhar?.image && errors?.Aadhar?.image
                          }
                          imagePreview={(selectedImagePath) => (
                            <ImagePreview
                              url={selectedImagePath}
                              userId={userId}
                              filePath={values?.Aadhar?.filePath}
                            />
                          )}
                          accept={".png, .jpg, .jpeg, .pdf"}
                          disabled={isDisabled}
                        />
                      </CCol>
                      {/* <CCol
                        xs="12"
                        lg="2"
                        style={{
                          marginTop: 28,
                        }}
                      >
                        <ImagePreview
                          userId={userId}
                          filePath={values?.Aadhar?.filePath}
                        />
                      </CCol> */}
                    </CFormGroup>
                    <CFormGroup row className="mt-2" lg="12">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          placeholder="Enter PAN Number"
                          onChange={(e) => {
                            setFieldValue("PAN.number", e.target.value);
                          }}
                          value={values?.PAN?.number}
                          error={touched?.PAN?.number && errors?.PAN?.number}
                          title="PAN"
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol
                        xs="12"
                        lg="6"
                        style={{
                          marginTop: 28,
                        }}
                      >
                        <FilePicker
                          userId={userId}
                          filePath={values?.PAN?.filePath}
                          onFileSelect={(e) => {
                            setFieldValue(`PAN.image`, e);
                          }}
                          error={touched?.PAN?.image && errors?.PAN?.image}
                          imagePreview={(selectedImagePath) => (
                            <ImagePreview
                              url={selectedImagePath}
                              userId={userId}
                              filePath={values?.PAN?.filePath}
                            />
                          )}
                          accept={".png, .jpg, .jpeg, .pdf"}
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row className="mt-2">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="driving-license"
                          placeholder="Enter Driving License (XXX XXXXXXXXXXXX)"
                          onChange={(e) => {
                            setFieldValue(
                              `${"Driving License"}.number`,
                              e.target.value
                            );
                          }}
                          value={values["Driving License"]?.number}
                          error={
                            touched["Driving License"]?.number &&
                            errors["Driving License"]?.number
                          }
                          title="Driving License"
                          disabled={isDisabled}
                        />
                      </CCol>

                      <CCol
                        xs="12"
                        lg="6"
                        style={{
                          marginTop: 28,
                        }}
                      >
                        <FilePicker
                          userId={userId}
                          filePath={values["Driving License"]?.filePath}
                          onFileSelect={(e) => {
                            setFieldValue(`${"Driving License"}.image`, e);
                          }}
                          error={
                            touched["Driving License"]?.image &&
                            errors["Driving License"]?.image
                          }
                          imagePreview={(selectedImagePath) => (
                            <ImagePreview
                              url={selectedImagePath}
                              userId={userId}
                              filePath={values["Driving License"]?.filePath}
                            />
                          )}
                          accept={".png, .jpg, .jpeg, .pdf"}
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row className="mt-2">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="pf-number"
                          placeholder="Enter PF Number"
                          onChange={(e) => {
                            setFieldValue("PF.number", e.target.value);
                          }}
                          value={values?.PF?.number}
                          // error={
                          //   touched?.job_details?.department &&
                          //   errors?.job_details?.department
                          // }
                          title="PF Number"
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol
                        xs="12"
                        lg="6"
                        style={{
                          marginTop: 28,
                        }}
                      >
                        <FilePicker
                          userId={userId}
                          filePath={values?.PF?.filePath}
                          onFileSelect={(e) => {
                            setFieldValue(`PF.image`, e);
                          }}
                          imagePreview={(selectedImagePath) => (
                            <ImagePreview
                              url={selectedImagePath}
                              userId={userId}
                              filePath={values?.PF?.filePath}
                            />
                          )}
                          accept={".png, .jpg, .jpeg, .pdf"}
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row className="mt-2">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="vehicle-number"
                          placeholder="Enter Vehicle Number (XX XX XX XXXX)"
                          onChange={(e) => {
                            let toSave = e.target.value;
                            // if (toSave?.length === 2) {
                            //   toSave = toSave + " ";
                            // }
                            setFieldValue(
                              `${"Vehicle Number"}.number`,
                              e.target.value
                            );
                          }}
                          value={values["Vehicle Number"]?.number}
                          error={
                            touched["Vehicle Number"]?.number &&
                            errors["Vehicle Number"]?.number
                          }
                          title="Vehicle Number"
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>

                    <CButton
                      onClick={() => {
                        resetForm();
                        setActive(1);
                      }}
                      color="primary"
                      className="mr-2"
                      color="primary"
                    >
                      Previous
                    </CButton>
                    <SimpleButton
                      title="Save & Next"
                      color="primary"
                      className="float-right"
                    />
                  </CCardBody>
                </Form>
              );
            }}
          </Formik>
        </CCard>
      </CCol>
    </>
  );
}

export default Identity;

{
  /* {values?.docs?.map((item, index) => {
                      return (
                        <IdentityInput
                          {...propsToPasss}
                          item={item}
                          index={index}
                          errors={errors}
                        />
                      );
                    })} */
}
