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
import Select from "src/components/formFields/select";
import { addEmployee } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { communicationValidation } from "./validations";
import { useSnackbar, SnackbarProvider } from "notistack";
import PhoneNumberInput from "src/components/formFields/phoneNumberInput";

function Communication({ userDetails, setUserDetails, setActive, isDisabled }) {
  const {
    _id,
    mobile_number = "",
    whatsapp_status = "",
    vehicle_group = "",
    mobile_relation = "",
  } = userDetails;
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
              _id,
              mobile_number,
              whatsapp_status,
              vehicle_group,
              mobile_relation,
            }}
            //validationSchema={communicationValidation}
            onSubmit={async (values) => {
              // setActive(1);
              dispatch({ type: SET_LOADER, payload: true });
              console.log(values, "values");
              setActive(2);
              // addEmployee(
              //   _id ? { ...values, _id } : values,
              //   (data) => {
              //     setUserDetails(data?.data);
              //     if (!isDisabled) {
              //       setActive(2);
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
                    <CFormGroup row>
                      <CCol xs="12" sm="6" lg="6">
                        <PhoneNumberInput
                          title="Mobile Number"
                          value={values?.mobile_number}
                          onChange={(e) => {
                            console.log(e);
                            setFieldValue("mobile_number", e ? `+${e}` : "");
                          }}
                          id="phone_number"
                          error={
                            touched?.mobile_number && errors?.mobile_number
                          }
                          required
                          disabled={isDisabled}
                        />
                      </CCol>

                      <CCol xs="12" lg="6">
                        <Select
                          custom
                          name="select"
                          id="select"
                          options={[
                            { key: "Please select", value: "" },
                            { key: "Active", value: "Active" },
                            { key: "Inactive", value: "Inactive" },
                          ]}
                          onChange={(e) => {
                            setFieldValue("whatsapp_status", e.target.value);
                          }}
                          value={values?.whatsapp_status}
                          error={
                            touched?.whatsapp_status && errors?.whatsapp_status
                          }
                          title="WhatsApp Status"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row className="mt-4">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="vehicle-group"
                          placeholder="Enter Vehicle Group"
                          onChange={(e) => {
                            setFieldValue("vehicle_group", e.target.value);
                          }}
                          value={values?.vehicle_group}
                          error={
                            touched?.vehicle_group && errors?.vehicle_group
                          }
                          title="Vehicle Group"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="mobile_relation"
                          placeholder="Enter Mobile Relation"
                          onChange={(e) => {
                            setFieldValue("personal_email", e.target.value);
                          }}
                          value={values?.mobile_relation}
                          error={
                            touched?.mobile_relation && errors?.mobile_relation
                          }
                          title="Mobile Relation"
                        />
                      </CCol>
                    </CFormGroup>
                    <CButton
                      onClick={() => {
                        resetForm();
                        setActive(0);
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

export default Communication;
