import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CButton,
  CCollapse,
} from "@coreui/react";
import SimpleInput from "src/components/formFields/simpleInput";
import DatePicker from "src/components/formFields/datePicker";
import Colors from "src/constants/colors";
import CustomModal from "../modal";
import { deleteAssets } from "src/views/employee/add/api";
import moment from "moment";
import { useSnackbar } from "notistack";

function AssetsForm({
  setFieldValue = () => {},
  setAccordianFunction = () => {},
  setAssetsList = () => {},
  values = {},
  assetsList = {},
  index = "",
  errors = "",
  touched = "",
  accordion = "",
  disabled = false,
}) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const deleteAsset = (index) => {
    setModalLoader(true);
    if (assetsList[index]?._id) {
      deleteAssets(
        assetsList[index]?._id,
        (data) => {
          var array = [...assetsList]; // make a separate copy of the array
          var valuesCopy = [...values?.assets];
          if (index !== -1) {
            array.splice(index, 1);
            valuesCopy.splice(index, 1);
            setAssetsList(array);
            setFieldValue(valuesCopy);
            setDeleteModalVisible(false);
          }
          setModalLoader(false);
        },
        () => {
          setModalLoader(false);
        }
      );
    } else {
      var array = [...assetsList]; // make a separate copy of the array
      var valuesCopy = [...values?.assets];
      if (index !== -1) {
        array.splice(index, 1);
        valuesCopy.splice(index, 1);
        setAssetsList(array);
        setFieldValue(valuesCopy);
        setDeleteModalVisible(false);
      }
    }
  };

  return (
    <div id="accordion">
      <CCard className="mb-2">
        <CCardHeader
          block
          onClick={() => {
            console.log(index, "indexxxx");
            setAccordianFunction(index);
          }}
          id={`heading${index + 1}`}
          className="d-flex justify-content-between align-items-center"
        >
          <CButton
            color="link"
            style={{ outline: "none" }}
            className="text-left m-0 p-0"
          >
            <h5 className="m-0 p-0">Asset {index + 1}</h5>
          </CButton>

          <i
            className={
              accordion === index ? "cil-chevron-bottom" : "cil-chevron-right"
            }
          />
        </CCardHeader>
        <CCollapse show={accordion === parseInt(index)}>
          <CCardBody>
            <CCardBody>
              <CRow>
                <CCol xs="12" lg="12">
                  <CFormGroup>
                    <SimpleInput
                      id="asset-type"
                      title={"Asset Type"}
                      onChange={(e) => {
                        setFieldValue(
                          `assets[${index}].asset_type`,
                          e.target.value
                        );
                      }}
                      value={
                        values?.assets ? values?.assets[index]?.asset_type : ""
                      }
                      placeholder="e.g. Mobile, Laptop, Vehicle"
                      required
                      error={
                        errors?.assets && touched?.assets
                          ? touched?.assets[index]?.asset_type &&
                            errors?.assets[index]?.asset_type
                          : ""
                      }
                      disabled={disabled}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12" lg="6">
                  <CFormGroup>
                    <SimpleInput
                      title="Asset Number"
                      id="asset-number"
                      placeholder="Enter asset number"
                      onChange={(e) => {
                        setFieldValue(
                          `assets[${index}].asset_number`,
                          e.target.value
                        );
                      }}
                      value={
                        values?.assets
                          ? values?.assets[index]?.asset_number
                          : ""
                      }
                      required
                      error={
                        errors?.assets && touched?.assets
                          ? touched?.assets[index]?.asset_number &&
                            errors?.assets[index]?.asset_number
                          : ""
                      }
                      disabled={disabled}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" lg="6">
                  <CFormGroup>
                    <DatePicker
                      title="Date Issued"
                      type="date"
                      id="date-issued"
                      placeholder="Asset issued date"
                      onChange={(e) => {
                        console.log(
                          Date?.parse(e.target.value),
                          new Date(
                            values?.assets[index]?.date_returned
                          )?.getTime(),
                          "ifuf"
                        );
                        if (
                          values?.assets[index] &&
                          values?.assets[index]?.date_returned &&
                          Date?.parse(e.target.value) >
                            new Date(
                              values?.assets[index]?.date_returned
                            )?.getTime()
                        ) {
                          enqueueSnackbar(
                            "Date Returned can't be smaller than Date Issued.",
                            {
                              variant: "error",
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                            }
                          );
                          return;
                        }
                        setFieldValue(
                          `assets[${index}].date_issued`,
                          e.target.value
                        );
                      }}
                      value={
                        values?.assets
                          ? moment(values?.assets[index]?.date_issued).format(
                              "YYYY-MM-DD"
                            )
                          : ""
                      }
                      required
                      error={
                        errors?.assets && touched?.assets
                          ? touched?.assets[index]?.date_issued &&
                            errors?.assets[index]?.date_issued
                          : ""
                      }
                      disabled={disabled}
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" lg="6">
                  <CFormGroup>
                    <DatePicker
                      title="Returned date"
                      type="date"
                      id="date-returned"
                      placeholder="Asset returned date"
                      onChange={(e) => {
                        if (
                          values?.assets[index] &&
                          values?.assets[index]?.date_issued &&
                          Date?.parse(e.target.value) <
                            new Date(
                              values?.assets[index]?.date_issued
                            )?.getTime()
                        ) {
                          enqueueSnackbar(
                            "Date Returned can't be smaller than Date Issued.",
                            {
                              variant: "error",
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                            }
                          );
                          return;
                        }
                        setFieldValue(
                          `assets[${index}].date_returned`,
                          e.target.value
                        );
                      }}
                      value={
                        values?.assets
                          ? moment(values?.assets[index]?.date_returned).format(
                              "YYYY-MM-DD"
                            )
                          : ""
                      }
                      required={false}
                      error={
                        errors?.assets && touched?.assets
                          ? touched?.assets[index]?.date_returned &&
                            errors?.assets[index]?.date_returned
                          : ""
                      }
                      disabled={disabled}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
            {/* </CCard> */}
            {disabled ? null : (
              <div
                className="float-right mr-3 mb-3"
                onClick={() => {
                  setDeleteModalVisible(true);
                }}
              >
                <i
                  className="far fa-trash-alt"
                  style={{
                    fontSize: 21,
                    color: Colors.red,
                    cursor: "pointer",
                  }}
                ></i>
              </div>
            )}
          </CCardBody>
        </CCollapse>
      </CCard>
      <CustomModal
        setIsModalVisible={setDeleteModalVisible}
        secondaryCtaFunction={() => {
          setDeleteModalVisible(false);
        }}
        title="Delete"
        isModalVisible={deleteModalVisible}
        primaryCtaFunction={() => {
          deleteAsset(index);
        }}
        primaryText="Delete"
        secondaryText="Cancel"
        innerText={`Do you want to delete Asset ${index + 1}`}
        loader={modalLoader}
      />
    </div>
  );
}

export default AssetsForm;
