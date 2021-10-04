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
import { addEmployee } from "./api";
import { SET_LOADER, ADD_EMPLOYEE_DATA } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { emergencyContactValidation } from "./validations";
import { useSnackbar } from "notistack";
import Select from "src/components/formFields/select";
import PhoneNumberInput from "src/components/formFields/phoneNumberInput";
import { store } from "src/redux/store";
import axios from "axios";
import { useState } from 'react'

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

  const [visible, setVisible] = useState(false)

  const {
    emergency_contact = "",
    emergency_contact_no = "",
    emergency_person_relation = "",
    pay_scale = "",
    pay_scale_type = "",
    payscale_per_hour = "",
    pay_scale_term = ""
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
              pay_scale,
              pay_scale_type,
              payscale_per_hour,
              pay_scale_term
            }}
            //validationSchema={emergencyContactValidation}
            onSubmit={async (values) => {
              dispatch({ type: SET_LOADER, payload: true });
              for (const key in values) {
                data[key] = values[key]
              }


              dispatch({ type: ADD_EMPLOYEE_DATA, values: data })

              const d = await axios.post('http://localhost:5000', data)
              
              console.log(d.data.message);
              alert(String(d.data.message))

            }}
          >
            {({ errors, touched, values, setFieldValue, resetForm, submitForm }) => {
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
                          value={values?.emergency_contact_no?.mobile?.toString()}
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
                    <CFormGroup row className="mt-4">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="pay-scale"
                          placeholder="Pay Scale"
                          onChange={(e) => {
                            setFieldValue("pay_scale", e.target.value);
                          }}
                          value={values?.pay_scale}
                          error={
                            touched?.pay_scale &&
                            errors?.pay_scale
                          }
                          title="Pay Scale"
                          required
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="pay-scale-type"
                          placeholder="Pay Scale Type"
                          onChange={(e) => {
                            setFieldValue("pay_scale_type", e.target.value);
                          }}
                          value={values?.pay_scale_type}
                          error={
                            touched?.pay_scale_type &&
                            errors?.pay_scale_type
                          }
                          title="Pay Scale Type"
                          required
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="payscale-per-hour"
                          placeholder="Pay Scale Per Hour"
                          onChange={(e) => {
                            setFieldValue("payscale_per_hour", e.target.value);
                          }}
                          value={values?.payscale_per_hour}
                          error={
                            touched?.payscale_per_hour &&
                            errors?.payscale_per_hour
                          }
                          title="Pay Scale Hour"
                          required
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="payscale-term"
                          placeholder="Pay Scale Per Term"
                          onChange={(e) => {
                            setFieldValue("pay_scale_term", e.target.value);
                          }}
                          value={values?.pay_scale_term}
                          error={
                            touched?.pay_scale_term &&
                            errors?.pay_scale_term
                          }
                          title="Pay Scale Term"
                          required
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


function Popup(props) {
  return (
    <>
      <CModal visible={props.visible} >
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
        <CModalFooter>
          <CButton color="secondary">
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}




export default EmergencyContact;
