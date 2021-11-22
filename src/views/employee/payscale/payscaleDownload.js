import React, { useEffect, useState } from "react";
import {
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
} from "@coreui/react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import moment from "moment";
import SimpleButton from "src/components/buttons/simpleButton";
import DatePicker from "src/components/formFields/datePicker";
import { SET_LOADER } from "src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import MainHeading from "src/components/heading";
import axios from "axios";
import xlsx from "json-as-xlsx";
import { columns } from "./columns";

function PayscaleDownload() {
  const [excelData, setExcelData] = useState([]);
  const dispatch = useDispatch();
  let settings = {
    fileName: "Salary",
    extraLength: 4,
    writeOptions: {},
  };

  const { from_date = "", to_date = "" } = {};
  return (
    <div>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard accentColor="primary">
          <MainHeading heading="Download Salary" />
          <Formik
            enableReinitialize
            initialValues={{
              from_date,
              to_date,
            }}
            validationSchema={yup.object().shape({
              from_date: yup.date().required("From Date is required"),
              to_date: yup
                .date()
                .test(
                  "to_date_test",
                  "To date cannot be lesser than from date",
                  (value, context) => {
                    if (value) {
                      var isValid;
                      var to_date = new Date(value)?.getTime();
                      var from_date = new Date(
                        context?.parent?.from_date
                      )?.getTime();
                      if (to_date >= from_date) {
                        isValid = true;
                      } else {
                        isValid = false;
                      }
                    } else {
                      isValid = true;
                    }
                    return isValid;
                  }
                ),
            })}
            onSubmit={async (values) => {
              dispatch({ type: SET_LOADER, payload: true });
              console.log(values, "paisa");
              dispatch({ type: SET_LOADER, payload: true });
              const getPayScale = async () => {
                const data = await axios.post(
                  "http://localhost:5000/payscale",
                  values
                );
                console.log(data.data);

                setExcelData([
                  {
                    sheet: `Pay Scale`,
                    columns: columns,
                    content: data.data,
                  },
                ]);
              };
              await getPayScale();

              const download = async () => {
                try {
                  xlsx(excelData, settings);
                } catch (error) {
                  console.log(error);
                }
              };
              await download();
            }}
          >
            {({ errors, touched, values, setFieldValue }) => {
              return (
                <Form>
                  <CCardBody>
                    <CFormGroup row className="mt-3">
                      <CCol lg="6" md="6" sm="12" xs="12">
                        <DatePicker
                          type="date"
                          placeholder="From Date"
                          id="from_date"
                          value={
                            values?.from_date
                              ? moment(values?.from_date).format("YYYY-MM-DD")
                              : ""
                          }
                          onChange={(e) => {
                            setFieldValue("from_date", e.target.value);
                          }}
                          error={touched?.from_date && errors?.from_date}
                          title="From Date"
                          required
                        />
                      </CCol>
                      <CCol lg="6" md="6" sm="12" xs="12">
                        <DatePicker
                          type="date"
                          placeholder="To Date"
                          id="to_date"
                          value={
                            values?.to_date
                              ? moment(values?.to_date).format("YYYY-MM-DD")
                              : ""
                          }
                          onChange={(e) => {
                            setFieldValue("to_date", e.target.value);
                          }}
                          error={touched?.to_date && errors?.to_date}
                          title="To Date"
                        />
                      </CCol>
                    </CFormGroup>

                    <SimpleButton
                      title="Download"
                      className="float-right"
                      type="submit"
                      className="float-right mb-3"
                    />
                  </CCardBody>
                </Form>
              );
            }}
          </Formik>
        </CCard>
      </CCol>
    </div>
  );
}

export default PayscaleDownload;
