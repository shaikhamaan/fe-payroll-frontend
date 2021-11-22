import React, { useState } from "react";
import { CCard, CCardBody, CCol, CFormGroup } from "@coreui/react";
import DatePicker from "src/components/formFields/datePicker";
import Select from "src/components/formFields/select";
import SimpleInput from "src/components/formFields/simpleInput";
import SimpleButton from "src/components/buttons/simpleButton";
import { useDispatch, useSelector } from "react-redux";
import { ADD_EMPLOYEE_DATA, SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import countries from "../../../constants/jsons/countries";
// import { getCityStateFromPinCode } from "src/views/organization/add/apis";
import moment from "moment";
import { SnackbarProvider, useSnackbar } from "notistack";
import { store } from "src/redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure();
const PayScale = ({
  setActive,
  setUserDetails,
  userDetails,
  setUserId,
  isDisabled,
}) => {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const dispatch = useDispatch();
  const organization_id = useSelector((state) => state);

  //   const details =  {
  //     employee_name : "",
  //     work_location : "",
  //     entry_made_on : "",
  //     entry_added_by : "",
  //     employee_code : ""
  //   }
  // //   const {
  // //     employee_grade = "",
  // //     pay_scale_term = "",
  // //     pay_scale_type = "",
  // //     pay_scale =""
  // //   } = userDetails;

  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
              employee_grade: "",
              pay_scale_term: "",
              pay_scale_type: "",
              pay_scale: "",
            }}
            //validateOnChange={validateAfterSubmit}
            // validateOnBlur
            //validationSchema={basicDetailsValidation}
            onSubmit={async (values, { resetForm }) => {
              //console.log(values);
              const result = await axios.post(
                "http://localhost:5000/payscale",
                values
              );
              if (result.data.status == "success") {
                toast.success(result.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                toast.error(result.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              }
            }}
          >
            {({
              errors,
              touched,
              values,
              setFieldValue,
              validateForm,
              submitForm,
            }) => {
              return (
                <Form>
                  <CCardBody>
                    <CFormGroup className="my-0" row>
                      <CCol xs="12" lg="6">
                        <Select
                          custom
                          name="select"
                          id="employee_grade"
                          options={[
                            { key: "Please select your grade", value: "" },
                            {
                              key: "PH ladies - standard",
                              value: "PH ladies - standard",
                            },
                            {
                              key: "PH ladies - sorters",
                              value: "PH ladies - sorters",
                            },
                            {
                              key: "PH ladies - sorters",
                              value: "PH ladies - sorters",
                            },
                            {
                              key: "PH Bengal Boys",
                              value: "PH Bengal Boys",
                            },
                            {
                              key: "PH Bengal Boys Supervisor",
                              value: "PH Bengal Boys Supervisor",
                            },
                            {
                              key: "PH Local Boys",
                              value: "PH Local Boys",
                            },
                            {
                              key: "PH Line Supervisors",
                              value: "PH Line Supervisors",
                            },
                            {
                              key: "Housekeeping",
                              value: "Housekeeping",
                            },
                            {
                              key: "Canteen",
                              value: "Canteen",
                            },
                            {
                              key: "Harvester Standard",
                              value: "Harvester Standard",
                            },
                            {
                              key: "Harvester Supervisor",
                              value: "Harvester Supervisor",
                            },
                            {
                              key: "PH Qaulity Supervisors",
                              value: "PH Qaulity Supervisors",
                            },
                            {
                              key: "Security",
                              value: "Security",
                            },
                            {
                              key: "Maintenance",
                              value: "Maintenance",
                            },
                            {
                              key: "Workshop",
                              value: "Workshop",
                            },
                            {
                              key: "OF Seasonal",
                              value: "OF Seasonal",
                            },
                            {
                              key: "OF Full Time",
                              value: "OF Full Time",
                            },
                          ]}
                          onChange={(e) => {
                            setFieldValue("employee_grade", e.target.value);
                          }}
                          value={values?.employee_grade}
                          error={
                            touched?.employee_grade && errors?.employee_grade
                          }
                          title="Employee Grade"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      <br />
                      <CCol xs="12" lg="6">
                        <Select
                          custom
                          name="select"
                          id="pay_scale_term"
                          options={[
                            { key: "Please select Pay Scale Term", value: "" },
                            {
                              key: "Per Day",
                              value: "Per Day",
                            },
                            {
                              key: "Monthly Fixed",
                              value: "Monthly Fixed",
                            },
                          ]}
                          onChange={(e) => {
                            setFieldValue("pay_scale_term", e.target.value);
                          }}
                          value={values?.pay_scale_term}
                          error={
                            touched?.pay_scale_term && errors?.pay_scale_term
                          }
                          title="Pay Scale Term"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      <br />
                      <CCol xs="12" lg="6">
                        <Select
                          custom
                          name="select"
                          id="pay_scale_type"
                          options={[
                            { key: "Please select Pay Scale Type", value: "" },
                            {
                              key: "Pre-Defined",
                              value: "Pre-Defined",
                            },
                            {
                              key: "Custom",
                              value: "Custom",
                            },
                          ]}
                          onChange={(e) => {
                            setFieldValue("pay_scale_type", e.target.value);
                          }}
                          value={values?.pay_scale_type}
                          error={
                            touched?.pay_scale_type && errors?.pay_scale_type
                          }
                          title="Pay Scale Type"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      <br />
                      <CCol xs="5" lg="6">
                        <SimpleInput
                          id="pay_scale"
                          placeholder="0"
                          onChange={(e) => {
                            setFieldValue("pay_scale", e.target.value);
                          }}
                          value={values?.pay_scale}
                          error={touched?.pay_scale && errors?.pay_scale}
                          title="Pay Scale"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    <SimpleButton
                      onClick={() => {
                        setValidateAfterSubmit(true);
                        dispatch({ type: SET_LOADER, payload: true });
                        validateForm().then((e) => {
                          console.log(e, "asddchnoi");
                          dispatch({ type: SET_LOADER, payload: false });
                        });
                      }}
                      title="Add"
                      color="primary"
                      className="float-right my-3"
                      type="submit"
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
};

export default PayScale;
