import { CCard, CCardBody, CCol, CFormGroup } from "@coreui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SimpleButton from "src/components/buttons/simpleButton";
import SimpleInput from "src/components/formFields/simpleInput";
import SimpleTextArea from "src/components/formFields/simpleTextArea";
import MainHeading from "src/components/heading";

const Penalty = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [batchData, setBatchData] = useState({});
  const { id } = useParams();

  const {
    employee_code = "",
    penalty_description = "",
    penalty_value = "",
  } = {};

  return (
    <div>
      <CCard>
        <MainHeading heading="Penalty" />
        <Formik
          //enableReinitialize
          initialValues={{ employee_code, penalty_description, penalty_value }}
          // onSubmit={(values) => {
          //   addPenulty(
          //     { ...values },
          //     (data) => {
          //       if (data?.status === "success") {
          //         dispatch({ type: SET_LOADER, payload: false });
          //         history.push("/dashboard");
          //       } else {
          //         dispatch({ type: SET_LOADER, payload: false });
          //         console.log(data);
          //       }
          //     },
          //     () => {
          //       dispatch({ type: SET_LOADER, payload: false });
          //     }
          //   );
          // }}
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
                        title="Enter Penalty"
                        placeholder="Enter Penalty in Rs."
                        onChange={(e) => {
                          setFieldValue("penalty_value", e.target.value);
                        }}
                        required
                        value={values?.penalty_value}
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
