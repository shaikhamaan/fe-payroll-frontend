import React from "react";
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
import { addEmployee } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { emergencyContactValidation } from "./validations";
import { useSnackbar } from "notistack";
import Select from "src/components/formFields/select";
import PhoneNumberInput from "src/components/formFields/phoneNumberInput";

function EmergencyContact({
  userDetails,
  setUserDetails,
  setActive,
  touched,
  isDisabled,
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    _id,
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
              // setActive(1);
              dispatch({ type: SET_LOADER, payload: true });
              console.log(values, "values");
              // addEmployee(
              //   _id ? { ...values, _id, is_profile_completed: true } : values,
              //   (data) => {
              //     setUserDetails(data?.data);
              //     if (!isDisabled) {
              //       setActive(6);
              //     }
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
                        title={isDisabled ? "Save" : "Save & Next"}
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

export default EmergencyContact;
