import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CSelect,
  CButton,
} from "@coreui/react";
import SimpleInput from "src/components/formFields/simpleInput";
import { useSelector } from "react-redux";
import { getEmployees, getEmployeesForManagers } from "./api";
import Select from "src/components/formFields/select";
import { array } from "prop-types";
import { addEmployee } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { jobDetailsValidation } from "./validations";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import DatePicker from "src/components/formFields/datePicker";
import moment from "moment";

function JobDetails({ setActive, userDetails, setUserDetails, isDisabled }) {
  const { id } = useParams();
  const {
    aadhar_no = "",
    employee_photo = "",
    experience_status = "",
    years_of_experience = "",
    education = "",
    employee_grade = "",
  } = userDetails;
  // const org_id = useSelector(
  //   (state) => state.auth?.userDetails?.organization_id
  // );
  // var final_org_id = org_id ? org_id : organization_id;
  // console.log(final_org_id, "oooooooooo");
  const [managers, setManagers] = useState([
    { key: "Please select", value: "" },
  ]);

  // useEffect(async () => {
  //   if (id) {
  //     getEmployees(
  //       `?_id=${id}`,
  //       (data) => {
  //         setUserDetails(data?.data[0]);
  //         console.log(userDetails, "userrrrrr");
  //       },
  //       () => {}
  //     );
  //   }
  //   if (final_org_id) {
  //     getEmployeesForManagers(
  //       {
  //         employee_code: userDetails?.employee_code,
  //         organization_id: org_id ? org_id : userDetails?.organization_id,
  //       },
  //       (data) => {
  //         var users = data?.data;
  //         console.log(data?.data, "dataEm");
  //         const arrayy = users
  //           .filter((item) => item._id != id)
  //           .map((user) => ({
  //             key: `${user?.first_name} ${user?.last_name} (${user?.employee_code})`,
  //             value: user?.employee_code,
  //           }));
  //         console.log(arrayy, "arrayyyy");
  //         setManagers([...managers, ...arrayy]);
  //       },
  //       () => {
  //         console.log("Nope");
  //       }
  //     );
  //   }
  // }, [final_org_id]);

  console.log(managers);

  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
              aadhar_no,
              employee_photo,
              experience_status,
              years_of_experience,
              education,
              employee_grade,
            }}
            //validationSchema={jobDetailsValidation}
            onSubmit={async (values) => {
              // setActive(1);
              dispatch({ type: SET_LOADER, payload: true });
              setActive(4);
              // addEmployee(
              //   _id ? { ...values, _id } : values,
              //   (data) => {
              //     setUserDetails(data?.data);
              //     setActive(5);
              //     dispatch({ type: SET_LOADER, payload: false });
              //     enqueueSnackbar("Saved.", {
              //       variant: "success",
              //       anchorOrigin: {
              //         vertical: "bottom",
              //         horizontal: "left",
              //       },
              //     });
              //   },
              //   () => {
              //     alert("Error while saving");
              //     dispatch({ type: SET_LOADER, payload: false });
              //   }
              // );
            }}
          >
            {({ errors, touched, values, setFieldValue, resetForm }) => {
              return (
                <Form>
                  <CCardBody>
                    <CFormGroup row className="mt-4">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="aadhar_no"
                          placeholder="31246847XXXX"
                          onChange={(e) => {
                            setFieldValue("aadhar_no", e.target.value);
                          }}
                          value={values?.aadhar_no}
                          error={touched?.aadhar_no && errors?.aadhar_no}
                          title="Aadhar Number"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="employee-photo"
                          placeholder="Your Image URL"
                          onChange={(e) => {
                            setFieldValue("employee_photo", e.target.value);
                          }}
                          value={values?.employee_photo}
                          error={
                            touched?.employee_photo && errors?.employee_photo
                          }
                          title="Your Image"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row className="mt-4">
                      <CCol
                        xs="12"
                        lg={
                          values?.experience_status === "experienced" ? 6 : 12
                        }
                      >
                        <Select
                          custom
                          name="select"
                          id="select"
                          options={[
                            { key: "Please select", value: "" },
                            { key: "Experieced", value: "experienced" },
                            { key: "No Experience", value: "inexperienced" },
                          ]}
                          onChange={(e) => {
                            setFieldValue("experience_status", e.target.value);
                          }}
                          value={values?.experience_status}
                          error={
                            touched?.experience_status &&
                            errors?.experience_status
                          }
                          title="Experience Status"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>

                      <CCol xs="12" lg="6">
                        {values?.experience_status === "experienced" ? (
                          <SimpleInput
                            id="years-of-experience"
                            placeholder="Enter years of your experience"
                            onChange={(e) => {
                              setFieldValue(
                                "years_of_experience",
                                e.target.value
                              );
                            }}
                            value={values?.years_of_experience}
                            error={
                              touched?.years_of_experience &&
                              errors?.years_of_experience
                            }
                            title="Years of Experience"
                            required
                            disabled={isDisabled}
                          />
                        ) : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row className="mt-4">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="education"
                          placeholder="Enter your highest education"
                          onChange={(e) => {
                            setFieldValue("education", e.target.value);
                          }}
                          value={values?.education}
                          error={touched?.education && errors?.education}
                          title="Highest Education"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>

                      <CCol xs="12" lg="6">
                        
                        <SimpleInput
                          id="employee_grade"
                          placeholder="Enter your grade"
                          onChange={(e) => {
                            setFieldValue("employee_grade", e.target.value);
                          }}
                          value={values?.employee_grade}
                          error={touched?.employee_grade && errors?.employee_grade}
                          title="Grade"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    <CButton
                      onClick={() => {
                        resetForm();
                        setActive(2);
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

export default JobDetails;
