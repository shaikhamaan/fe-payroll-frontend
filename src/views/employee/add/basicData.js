import React, { useState } from "react";
import { CCard, CCardBody, CCol, CFormGroup } from "@coreui/react";
import DatePicker from "src/components/formFields/datePicker";
import Select from "src/components/formFields/select";
import SimpleInput from "src/components/formFields/simpleInput";
import SimpleButton from "src/components/buttons/simpleButton";
import { addEmployee } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { ADD_EMPLOYEE_DATA, SET_LOADER } from "src/redux/actions";
import { Formik, Form } from "formik";
import { basicDetailsValidation } from "./validations";
import countries from "../../../constants/jsons/countries";
// import { getCityStateFromPinCode } from "src/views/organization/add/apis";
import moment from "moment";
import { SnackbarProvider, useSnackbar } from "notistack";
import { store } from "src/redux/store";

const BasicData = ({
  setActive,
  setUserDetails,
  userDetails,
  setUserId,
  isDisabled,
}) => {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const organization_id = useSelector((state) => state);

  const {
    employee_name="",
    work_location = "",
    entry_made_on = "",
    entry_added_by = "",
    employee_code = "",
    
  } = userDetails;

  var today = new Date();
  var maxDate = new Date();
  maxDate = moment(maxDate?.setFullYear(today?.getFullYear() - 18)).format(
    "YYYY-MM-DD"
  );

  const data = store.getState().commonReducer.data;
  
  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
            
              work_location,
              entry_made_on,
              entry_added_by,
              employee_code,
              employee_name
            }}
            //validateOnChange={validateAfterSubmit}
            // validateOnBlur
            //validationSchema={basicDetailsValidation}
            onSubmit={async (values, { resetForm }) => {
              dispatch({ type: SET_LOADER, payload: true });
              
              for(const key in values){
                data[key] = values[key]
              }

              dispatch({ type: ADD_EMPLOYEE_DATA, values: data})

              setActive(1);
            }}
          >
            {({ errors, touched, values, setFieldValue, validateForm, submitForm }) => {
              return (
                <Form>
                  <CCardBody>
                    <CFormGroup row className="my-0">
                      <CCol xs="12" lg="12" md="4">
                        <SimpleInput
                          id="employee_name"
                          placeholder="Employee Full Name : "
                          onChange={(e) => {
                            setFieldValue("employee_name", e.target.value);
                          }}
                          value={values?.employee_name}
                          error={touched?.employee_name && errors?.employee_name}
                          title="Employee Full Name"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      
                    </CFormGroup>
                    <CFormGroup row className="mt-2">
                      <CCol xs="12" lg="6">
                        <DatePicker
                          title="Entery Made On"
                          id="entry_made_on"
                          placeholder="date"
                          required
                          onChange={(e) => {
                            setFieldValue("entry_made_on", e.target.value);
                          }}
                          value={
                            values?.entry_made_on
                              ? moment(values?.entry_made_on)?.format("YYYY-MM-DD")
                              : ""
                          }
                          error={touched?.entry_made_on && errors?.entry_made_on}
                          maxDate={maxDate}
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="entry_added_by"
                          placeholder="Entry Made By..."
                          onChange={(e) => {
                            setFieldValue("entry_added_by", e.target.value);
                          }}
                          value={values?.entry_added_by}
                          error={touched?.entry_added_by && errors?.entry_added_by}
                          title="Entry Made By :"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      {/* <CCol xs="12" lg="6">
                        <Select
                          id="select"
                          title="Gender"
                          required
                          options={[
                            { key: "Please select", value: "" },
                            { key: "Female", value: "Female" },
                            { key: "Male", value: "Male" },
                            { key: "Other", value: "Other" },
                          ]}
                          onChange={(e) => {
                            setFieldValue("gender", e.target.value);
                          }}
                          value={values?.gender}
                          error={touched?.gender && errors?.gender}
                          disabled={isDisabled}
                        />
                      </CCol> */}
                    </CFormGroup>
                    <CFormGroup row>
                      {/* <CCol xs="12" lg="6">
                        <Select
                          custom
                          name="select"
                          id="select"
                          options={[
                            { key: "Please select", value: "" },
                            { key: "Active", value: "Active" },
                            { key: "Income", value: "Income" },
                            { key: "Part Time", value: "Part Time" },
                            { key: "Contractor", value: "Contractor" },
                            { key: "Inactive", value: "Inactive" },
                          ]}
                          onChange={(e) => {
                            setFieldValue("employement_status", e.target.value);
                          }}
                          value={values?.employement_status}
                          error={
                            touched?.employement_status &&
                            errors?.employement_status
                          }
                          title="Status"
                          required
                          disabled={isDisabled}
                        />
                      </CCol> */}

                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="employee-code"
                          placeholder="Enter Employee Code "
                          onChange={(e) => {
                            setFieldValue("employee_code", e.target.value);
                          }}
                          value={values?.employee_code}
                          error={
                            touched?.employee_code && errors?.employee_code
                          }
                          title="Employee Code"
                          required
                          disabled={isDisabled}
                          // onFocus={() => {
                          //   setValidateAfterSubmit(false);
                          // }}
                          // onBlur={() => {
                          //   setValidateAfterSubmit(true);
                          // }}
                        />
                      </CCol>
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="work-location"
                          placeholder="Enter Work Location "
                          onChange={(e) => {
                            setFieldValue("work_location", e.target.value);
                          }}
                          value={values?.work_location}
                          error={
                            touched?.work_location && errors?.work_location
                          }
                          title="Work Location"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    {/* <CFormGroup row>
                      <CCol>
                        <SimpleInput
                          id="street"
                          placeholder="Enter street name"
                          onChange={(e) => {
                            setFieldValue("street", e.target.value);
                          }}
                          value={values?.street}
                          error={touched?.street && errors?.street}
                          title="Street"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup> */}
                    {/* <CFormGroup row className="my-0 mt-2">
                      <CCol>
                        <SimpleInput
                          id="landmark"
                          placeholder="Enter landmark"
                          onChange={(e) => {
                            setFieldValue("landmark", e.target.value);
                          }}
                          value={values?.landmark}
                          error={touched?.landmark && errors?.landmark}
                          title="Landmark"
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup> */}
                    {/* <CFormGroup row className="my-0 mt-2">
                      <CCol xs="8">
                        <SimpleInput
                          id="city"
                          placeholder="Enter your city"
                          onChange={(e) => {
                            setFieldValue("city", e.target.value);
                          }}
                          value={values?.city}
                          error={touched?.city && errors?.city}
                          title="City"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                      <CCol xs="4">
                        <SimpleInput
                          id="postal-code"
                          placeholder="Postal Code"
                          onChange={(e) => {
                            setFieldValue("postal_code", e.target.value);

                            // if (e?.target.value?.length === 6) {
                            //   getCityStateFromPinCode(
                            //     e.target.value,
                            //     (data) => {
                            //       console.log(
                            //         data[0]?.PostOffice[0],
                            //         "datadata"
                            //       );
                            //       setFieldValue(
                            //         "city",
                            //         data[0]?.PostOffice[0]?.District
                            //       );
                            //       setFieldValue(
                            //         "state",
                            //         data[0]?.PostOffice[0]?.State
                            //       );
                            //       setFieldValue(
                            //         "country",
                            //         data[0]?.PostOffice[0]?.Country
                            //       );
                            //     }
                            //   );
                            // }
                          }}
                          value={values?.postal_code}
                          error={touched?.postal_code && errors?.postal_code}
                          title="Postal Code"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row className="my-0 mt-2">
                      <CCol xs="12" lg="6">
                        <SimpleInput
                          id="state"
                          placeholder="Enter your state"
                          onChange={(e) => {
                            setFieldValue("state", e.target.value);
                          }}
                          value={values?.state}
                          error={touched?.state && errors?.state}
                          title="State"
                          required
                          disabled={isDisabled}
                        />
                      </CCol>

                      <CCol xs="12" lg="6">
                        <Select
                          id="country"
                          title="Country"
                          options={countries}
                          valueAccessor="name"
                          keyAccessor="name"
                          placeholder="Enter country"
                          onChange={(e) => {
                            setFieldValue("country", e.target.value);
                          }}
                          value={values.country}
                          required
                          error={touched?.country && errors?.country}
                          required
                          disabled={isDisabled}
                        />
                      </CCol>
                    </CFormGroup> */}
                    <SimpleButton
                      onClick={() => {
                        setValidateAfterSubmit(true);
                        dispatch({ type: SET_LOADER, payload: true });
                        validateForm().then((e) => {
                          console.log(e, "asddchnoi");
                          dispatch({ type: SET_LOADER, payload: false });
                        });
                      }}
                      title="Save & Next"
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

export default BasicData;
