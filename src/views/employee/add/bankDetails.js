import React from "react";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormGroup,
  CButton,
} from "@coreui/react";
import SimpleInput from "src/components/formFields/simpleInput";
import { addEmployee } from "./api";
import { ADD_EMPLOYEE_DATA,SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SimpleButton from "src/components/buttons/simpleButton";
import { bankDetailsValidation } from "./validations";
import { SnackbarProvider, useSnackbar } from "notistack";
import {store} from 'src/redux/store'

function BankDetails({ setUserDetails, userDetails, setActive, isDisabled }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const data = store.getState().commonReducer.data;
  
  const {
    
    bank_name = "",
    bank_ifsc_code = "",
    bank_account_no = "",
    bank_account_name = "",
    account_relation = "",
    bank_branch = "",
    passbook_photo = "",
  } = userDetails;
  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
              bank_name,
              bank_ifsc_code,
              bank_account_no,
              bank_account_name,
              account_relation,
              bank_branch,
              passbook_photo,
            }}
            //validationSchema={bankDetailsValidation}
            onSubmit={async (values) => {
              dispatch({ type: SET_LOADER, payload: true });
              
              for(const key in values){
                data[key] = values[key]
              }

              dispatch({ type: ADD_EMPLOYEE_DATA, values: data})

              setActive(3);
              
            }}
          >
            {({ errors, touched, values, setFieldValue, resetForm,submitForm }) => {
              return (
                <Form>
                  <CCardBody>
                    <CRow>
                      <CCol xs="12" lg="6">
                        <CFormGroup>
                          <SimpleInput
                            id="bank_name"
                            placeholder="Enter your bank name"
                            required
                            onChange={(e) => {
                              setFieldValue("bank_name", e.target.value);
                            }}
                            value={values?.bank_name}
                            error={touched?.bank_name && errors?.bank_name}
                            title="Bank Name"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" lg="6">
                        <CFormGroup>
                          <SimpleInput
                            id="bank_ifsc_code"
                            placeholder="Enter your bank IFSC Code"
                            required
                            onChange={(e) => {
                              setFieldValue("bank_ifsc_code", e.target.value);
                            }}
                            value={values?.bank_ifsc_code}
                            error={
                              touched?.bank_ifsc_code && errors?.bank_ifsc_code
                            }
                            title="Bank IFSC Code"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" lg="6">
                        <CFormGroup>
                          <SimpleInput
                            id="bank-account-no"
                            placeholder="Enter your Bank Account No"
                            required
                            onChange={(e) => {
                              setFieldValue("bank_account_no", e.target.value);
                            }}
                            value={values?.bank_account_no}
                            error={
                              touched?.bank_account_no &&
                              errors?.bank_account_no
                            }
                            title="Bank Account Number"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" lg="6">
                        <CFormGroup>
                          <SimpleInput
                            id="bank-account-name"
                            placeholder="Enter your Bank Account Name"
                            required
                            onChange={(e) => {
                              setFieldValue(
                                "bank_account_name",
                                e.target.value
                              );
                            }}
                            value={values?.bank_account_name}
                            error={
                              touched?.bank_account_name &&
                              errors?.bank_account_name
                            }
                            title="Bank Account Name"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" lg="6">
                        <CFormGroup>
                          <SimpleInput
                            id="account-relation"
                            placeholder="Enter your account relation"
                            required
                            onChange={(e) => {
                              setFieldValue("account_relation", e.target.value);
                            }}
                            value={values?.account_relation}
                            error={
                              touched?.account_relation &&
                              errors?.account_relation
                            }
                            title="Account Relation"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" lg="6">
                        <CFormGroup>
                          <SimpleInput
                            id="bank_branch"
                            placeholder="Enter your bank branch name"
                            required
                            onChange={(e) => {
                              setFieldValue("bank_branch", e.target.value);
                            }}
                            value={values?.bank_branch}
                            error={touched?.bank_branch && errors?.bank_branch}
                            title="Bank Branch Name"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" lg="12">
                        <CFormGroup>
                          <SimpleInput
                            id="passbook-photo"
                            placeholder="Enter your passbook photo url"
                            required
                            onChange={(e) => {
                              setFieldValue("passbook_photo", e.target.value);
                            }}
                            value={values?.passbook_photo}
                            error={
                              touched?.passbook_photo && errors?.passbook_photo
                            }
                            title="Passbook Url"
                            disabled={isDisabled}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CButton
                      onClick={() => {
                        resetForm();
                        setActive(1);
                      }}
                      color="primary"
                      className="mr-2"
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

export default BankDetails;
