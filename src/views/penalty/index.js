import { CCard, CCardBody, CCol, CFormGroup, CLabel } from "@coreui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import SimpleButton from "src/components/buttons/simpleButton";
import SimpleInput from "src/components/formFields/simpleInput";
import SimpleTextArea from "src/components/formFields/simpleTextArea";
import MainHeading from "src/components/heading";
import DatePicker from "src/components/formFields/datePicker";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [selectedOption, setSelectedOption] = useState({});
  const [options, setOptions] = useState([]);
  const { date = "", penalty_description = "", penalty_value = "" } = {};
  useEffect(async () => {
    const { data } = await axios.get("https://freshexp-server.herokuapp.com/");
    let temp = [];
    data.map((employee) =>
      temp.push({
        label: employee?.employee_code,
        value: employee?.employee_code,
      })
    );
    setOptions(temp);
  }, []);

  return (
    <div>
      <CCard>
        <MainHeading heading="Rewards" />
        <Formik
          //enableReinitialize
          initialValues={{
            penalty_description,
            penalty_value,
            date,
          }}
          onSubmit={async (values, { resetForm }) => {
            console.log({ ...values, employee_codes: selectedOption }, "new");
            const d = await axios.post(
              "https://freshexp-server.herokuapp.com/perks",
              { ...values, employee_codes: selectedOption }
            );
            if (d.data.status == "success") {
              toast.success(
                d.data.message + "" + `Employee Code : ${values.employee_code}`,
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                }
              );
            } else {
              toast.error(
                d.data.message + "" + `Employee Code : ${values.employee_code}`,
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                }
              );
            }
          }}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <CCardBody>
                  <CFormGroup row className="mt-3">
                    <CCol lg="6" md="6">
                      <CLabel htmlFor="#select">Select Employee</CLabel>
                      <Select
                        onChange={(e) => {
                          setSelectedOption(e);
                          console.log(e, "liu");
                        }}
                        options={options}
                        isMulti={true}
                        id="select"
                      />
                      {/* <SimpleInput
                        title="Employee Code"
                        placeholder="Enter Employee Code"
                        onChange={(e) => {
                          setFieldValue("employee_code", e.target.value);
                        }}
                        required
                        value={values?.employee_code}
                      /> */}
                    </CCol>{" "}
                    <CCol lg="6" md="6">
                      <SimpleInput
                        title="Reward Points"
                        placeholder="Enter Reward Points"
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
                            ? moment(values?.date)?.format("YYYY-MM-DD")
                            : ""
                        }
                        error={touched?.date && errors?.date}
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
