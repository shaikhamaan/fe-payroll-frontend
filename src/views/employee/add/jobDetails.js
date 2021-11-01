import React, { useState } from "react";
import { CCard, CCardBody, CCol, CFormGroup, CButton } from "@coreui/react";
import SimpleInput from "src/components/formFields/simpleInput";
import Select from "src/components/formFields/select";
import { ADD_EMPLOYEE_DATA, SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { store } from "src/redux/store";
function JobDetails({ setActive, userDetails, setUserDetails, isDisabled }) {
  //const { id } = useParams();
  const {
    aadhar_no = "",
    employee_photo = "",
    experience_status = "",
    years_of_experience = "",
    education = "",
    employee_grade = "",
  } = userDetails;

  const data = store.getState().commonReducer.data;

  const dispatch = useDispatch();
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
              dispatch({ type: SET_LOADER, payload: true });
              for (const key in values) {
                data[key] = values[key];
              }
              dispatch({ type: ADD_EMPLOYEE_DATA, values: data });
              setActive(4);
            }}
          >
            {({
              errors,
              touched,
              values,
              setFieldValue,
              resetForm,
              submitForm,
            }) => {
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
                          id="employee_photo"
                          placeholder="Employee Image URL"
                          onChange={(e) => {
                            setFieldValue("employee_photo", e.target.value);
                          }}
                          value={values?.employee_photo}
                          error={
                            touched?.employee_photo && errors?.employee_photo
                          }
                          title="Employee Image URL"
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
                          id="experience_status"
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
                            id="years_of_experience"
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
                      <Select
                          custom
                          name="select"
                          id="education"
                          options={[
                            {
                              key: "Please select your education level",
                              value: "",
                            },
                            {
                              key: "7th Pass",
                              value: "7th Pass",
                            },
                            {
                              key: "10th Pass",
                              value: "10th Pass",
                            },
                            {
                              key: "12th Pass",
                              value: "12th Pass",
                            },
                            {
                              key: "Under-Grad Pass",
                              value: "Under-GradPass",
                            },
                            {
                              key: "Post-Grad Pass",
                              value: "Post-Grad Pass",
                            },
                          ]}
                          onChange={(e) => {
                            setFieldValue("education", e.target.value);
                          }}
                          value={values?.education}
                          error={
                            touched?.education && errors?.education
                          }
                          title="Education Level"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>

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
}

export default JobDetails;
