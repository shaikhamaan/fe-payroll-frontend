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
  const dispatch = useDispatch();
  let settings = {
    fileName: "Salary Payment Report",
    extraLength: 4,
    writeOptions: {},
  };

  const { start = "", end = "" } = {};
  return (
    <div>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard accentColor="primary">
          <MainHeading heading="Download Salary" />
          <Formik
            enableReinitialize
            initialValues={{
              start,
              end,
            }}
            validationSchema={yup.object().shape({
              start: yup.date().required("From Date is required"),
              end: yup
                .date()
                .test(
                  "end_test",
                  "To date cannot be lesser than from date",
                  (value, context) => {
                    if (value) {
                      var isValid;
                      var end = new Date(value)?.getTime();
                      var start = new Date(context?.parent?.start)?.getTime();
                      if (end >= start) {
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
              let excelData;
              const getPayScale = async () => {
                const data = await axios.post(
                  "https://freshexp-server.herokuapp.com/reports/masssalary",
                  values
                );

                excelData = [
                  {
                    sheet: `Payment Report`,
                    columns: columns,
                    content: data.data,
                  },
                ];
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
                          id="start"
                          value={
                            values?.start
                              ? moment(values?.start).format("YYYY-MM-DD")
                              : ""
                          }
                          onChange={(e) => {
                            setFieldValue("start", e.target.value);
                          }}
                          error={touched?.start && errors?.start}
                          title="From Date"
                          required
                        />
                      </CCol>
                      <CCol lg="6" md="6" sm="12" xs="12">
                        <DatePicker
                          type="date"
                          placeholder="To Date"
                          id="end"
                          value={
                            values?.end
                              ? moment(values?.end).format("YYYY-MM-DD")
                              : ""
                          }
                          onChange={(e) => {
                            setFieldValue("end", e.target.value);
                          }}
                          error={touched?.end && errors?.end}
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
