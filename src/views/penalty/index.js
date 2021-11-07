import { CCard, CCardBody, CCol, CFormGroup } from "@coreui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SimpleButton from "src/components/buttons/simpleButton";
import SimpleInput from "src/components/formFields/simpleInput";
import SimpleTextArea from "src/components/formFields/simpleTextArea";
import MainHeading from "src/components/heading";
import DatePicker from "src/components/formFields/datePicker";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var today = new Date();
var maxDate = new Date();

maxDate = moment(maxDate?.setFullYear(today?.getFullYear())).format(
  "YYYY-MM-DD"
);
toast.configure();

const Penalty = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [batchData, setBatchData] = useState({});
  const { id } = useParams();

  const {
    employee_code = "",
    date = "",
    penalty_description = "",
    penalty_value = "",
  } = {};

  return (
    <div>
      <CCard>
        <MainHeading heading="Penalty" />
        <Formik
          //enableReinitialize
          initialValues={{ employee_code, penalty_description, penalty_value, date }}


          onSubmit={async (values, { resetForm }) => {
            const d = await axios.post("http://localhost:5000/perks", values);
            if (d.data.status == "success") {
              toast.success(d.data.message + "" + `Employee Code : ${values.employee_code}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }
            else {
              toast.error(d.data.message + "" + `Employee Code : ${values.employee_code}`, {
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
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <CCardBody>
                  <CFormGroup row className="mt-3">
                    <CCol lg="6" md="6">
                      <SimpleInput
                        title="Employee Code"
                        placeholder="Enter Employee Code"
                        onChange={(e) => {
                          setFieldValue("employee_code", e.target.value);
                        }}
                        required
                        value={values?.employee_code}
                      />
                    </CCol>{" "}
                    <CCol lg="6" md="6">
                      <SimpleInput
                        title="Enter Penalty Points"
                        placeholder="Enter Penalty Points"
                        onChange={(e) => {
                          setFieldValue("penalty_value", e.target.value);
                        }}
                        required
                        value={values?.penalty_value}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="mt-3">
                    <CCol xs="6" lg="6">
                      <DatePicker
                        title="Date"
                        id="date"
                        placeholder="date"
                        required
                        onChange={(e) => {
                          setFieldValue("date", e.target.value);
                        }}
                        value={
                          values?.date
                            ? moment(values?.date)?.format(
                              "YYYY-MM-DD"
                            )
                            : ""
                        }
                        error={
                          touched?.date && errors?.date
                        }
                        maxDate={maxDate}
                      // disabled={isDisabled}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="mt-3">
                    <CCol lg="12" md="6">
                      <SimpleTextArea
                        title="Description"
                        placeholder="Enter Description"
                        onChange={(e) => {
                          setFieldValue("penalty_description", e.target.value);
                        }}
                        value={values?.penalty_description}
                      />
                    </CCol>
                  </CFormGroup>
                  <SimpleButton
                    title="Submit"
                    className="float-right px-4 mb-4 mt-2"
                  />
                </CCardBody>
              </Form>
            );
          }}
        </Formik>
      </CCard>
    </div>
  );
};

export default Penalty;
