import React from "react";
import {
  CModal,
  CModalFooter,
  CModalHeader,
  CModalBody,
  CModalTitle,
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
import { addEmployee, updateEmployee } from "./api";
import { SET_LOADER, ADD_EMPLOYEE_DATA } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { emergencyContactValidation } from "./validations";
import { SnackbarProvider, useSnackbar } from "notistack";
import Select from "src/components/formFields/select";
import PhoneNumberInput from "src/components/formFields/phoneNumberInput";
import { store } from "src/redux/store";
import axios from "axios";
import { useState } from "react";

function EmergencyContact({
  userDetails,
  setUserDetails,
  setActive,
  touched,
  isDisabled,
}) {
  const data = store.getState().commonReducer.data;

  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [vis, setVisible] = useState(false);

  const {
    emergency_contact = "",
    emergency_contact_no = "",
    emergency_person_relation = "",
  } = userDetails;
  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
              emergency_contact,
              emergency_contact_no,
              emergency_person_relation,
            }}
            //validationSchema={emergencyContactValidation}
            onSubmit={async (values) => {
              for (const key in values) {
                data[key] = values[key];
              }
              dispatch({ type: ADD_EMPLOYEE_DATA, values: data });
              console.log(data);

              const id = data["id"];

              if (id == -1 || id == undefined) {
                delete data["id"];

                const d = await addEmployee(data);

                console.log(d);
                enqueueSnackbar(String(d.data.message), {
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  variant: String(d.data.status),
                });
              } else {
                const d = await updateEmployee(data);

                console.log(d);
                enqueueSnackbar(String(d.data.message), {
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  variant: String(d.data.status),
                });
              }
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
                          id="emergency-contact"
                          placeholder="Enter your emergency contact name"
                          onChange={(e) => {
                            setFieldValue("emergency_contact", e.target.value);
                          }}
                          value={values?.emergency_contact}
                          error={
                            touched?.emergency_contact &&
                            errors?.emergency_contact
                          }
                          title="Emergency Contact Name"
                          required
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <Select
                          id="select"
                          title="Emergency Contact Relation"
                          options={[
                            { key: "Select", value: "" },
                            { key: "Father", value: "Father" },
                            { key: "Mother", value: "Mother" },
                            { key: "Brother", value: "Brother" },
                            { key: "Sister", value: "Sister" },
                            { key: "Wife", value: "Wife" },
                            { key: "Husband", value: "Husband" },
                            { key: "Friend", value: "Friend" },
                            { key: "Other", value: "Other" },
                          ]}
                          onChange={(e) => {
                            setFieldValue(
                              "emergency_person_relation",
                              e.target.value
                            );
                          }}
                          value={values?.emergency_person_relation}
                          error={
                            touched?.emergency_person_relation &&
                            errors?.emergency_person_relation
                          }
                          required
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row className="mt-4">
                      <CCol xs="12" sm="12" lg="12">
                        <PhoneNumberInput
                          title="Emergency Contact Number"
                          value={values?.emergency_contact_no}
                          onChange={(e) => {
                            setFieldValue(
                              "emergency_contact_no",
                              e ? `+${e}` : ""
                            );
                          }}
                          required
                          id="mobile-num"
                          error={
                            touched?.emergency_contact_no &&
                            errors?.emergency_contact_no
                          }
                        />
                      </CCol>
                    </CFormGroup>

                    <CButton
                      onClick={() => {
                        setActive(3);
                        resetForm();
                      }}
                      color="primary"
                      className="mr-2"
                      color="primary"
                    >
                      Previous
                    </CButton>

                    <SimpleButton
                      title={isDisabled ? "Save" : "Submit"}
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

export default EmergencyContact;
