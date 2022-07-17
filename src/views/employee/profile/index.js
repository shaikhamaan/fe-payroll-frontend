import React, { useEffect, useState } from "react";
import {
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
} from "@coreui/react";
import moment from "moment";
import SimpleButton from "src/components/buttons/simpleButton";
import DatePicker from "src/components/formFields/datePicker";
import { useParams } from "react-router";
import { SET_LOADER } from "src/redux/actions";
import { Link } from "react-router-dom";
import MainHeading from "src/components/heading";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { Doughnut, Pie } from "react-chartjs-2";
import "./style.css";
import axios from "axios";
import xlsx from "json-as-xlsx";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { getProfile } from "./apis";
function Profile(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [monthYear, setMonthYear] = useState(
    moment(new Date()).format("MMMM-yyyy")
  );
  const [employee, setEmployees] = useState({});
  const [excelData, setExcelData] = useState([]);

  const { start = "", end = "" } = {};

  useEffect(async () => {
    const e = await getProfile(id);
    setEmployees(e?.data?.data);
  }, []);

  console.log(employee);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/employees/edit/${employee?.employee_code}`}>
          <SimpleButton title="Edit" className="mr-3 mb-2" />
        </Link>
      </div>
      <CCard accentColor="primary">
        <MainHeading heading={employee?.employee_name} />
        <CCardBody className="px-5">
          <div className="row view-basic-card pl-2">
            <div
              className="col-12 col-md-6 col-lg-6 pl-2"
              style={{ borderLeft: "3px solid #321fdb" }}
            >
              <label
                className="font-weight-bold pl-0 m-0"
                style={{ fontSize: "20px" }}
              >
                Basic Information
              </label>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Employee Name</label>
              <p className="font-weight-bold">{employee?.employee_name}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Employee Code</label>
              <p className="font-weight-bold">{employee?.employee_code}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Work Location</label>
              <p className="font-weight-bold">{employee?.work_location}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Added By</label>
              <p className="font-weight-bold">{employee?.entry_added_by}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div
              className="col-12 col-md-6 col-lg-6 pl-2"
              style={{ borderLeft: "3px solid #321fdb" }}
            >
              <label
                className="font-weight-bold pl-0 m-0"
                style={{ fontSize: "20px" }}
              >
                Communication Details
              </label>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Mobile Number</label>
              <p className="font-weight-bold">{employee?.mobile_no}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">WhatsApp Status</label>
              <p className="font-weight-bold">{employee?.whatsapp_status}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Vehicle Group</label>
              <p className="font-weight-bold">{employee?.vehicle_group}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Mobile Number Relation</label>
              <p className="font-weight-bold">{employee?.mobile_relation}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div
              className="col-12 col-md-6 col-lg-6 pl-2"
              style={{ borderLeft: "3px solid #321fdb" }}
            >
              <label
                className="font-weight-bold pl-0 m-0"
                style={{ fontSize: "20px" }}
              >
                Bank Details
              </label>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Name</label>
              <p className="font-weight-bold">{employee?.bank_name}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank IFSC</label>
              <p className="font-weight-bold">{employee?.bank_ifsc_code}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Account Number</label>
              <p className="font-weight-bold">{employee?.bank_account_no}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Account Name</label>
              <p className="font-weight-bold">{employee?.bank_account_name}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Account Relation</label>
              <p className="font-weight-bold">{employee?.account_relation}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Branch Name</label>
              <p className="font-weight-bold">{employee?.bank_branch}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div
              className="col-12 col-md-6 col-lg-6 pl-2"
              style={{ borderLeft: "3px solid #321fdb" }}
            >
              <label
                className="font-weight-bold pl-0 m-0"
                style={{ fontSize: "20px" }}
              >
                Job Details
              </label>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Aadhar Number</label>
              <p className="font-weight-bold">{employee?.aadhar_no}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Experience Status</label>
              <p className="font-weight-bold">
                {employee?.experience_status === "inexperienced"
                  ? "No Experience"
                  : employee?.years_of_experience}
              </p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Education Level</label>
              <p className="font-weight-bold">{employee?.education}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Work Grade</label>
              <p className="font-weight-bold">{employee?.employee_grade}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Pay Scale</label>
              <p className="font-weight-bold">{employee?.pay_scale}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Pay Scale Type</label>
              <p className="font-weight-bold">{employee?.pay_scale_type}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Pay Scale Term</label>
              <p className="font-weight-bold">{employee?.pay_scale_term}</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div
              className="col-12 col-md-6 col-lg-6 pl-2"
              style={{ borderLeft: "3px solid #321fdb" }}
            >
              <label
                className="font-weight-bold pl-0 m-0"
                style={{ fontSize: "20px" }}
              >
                Emergency Contact Details
              </label>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Contact Name</label>
              <p className="font-weight-bold">{employee?.emergency_contact}</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Contact Relation</label>
              <p className="font-weight-bold">
                {employee?.emergency_person_relation}
              </p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Contact Number</label>
              <p className="font-weight-bold">
                {employee?.emergency_contact_no}
              </p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 mt-3">
            <div
              className="col-12 col-md-6 col-lg-6 pl-2"
              style={{ borderLeft: "3px solid #321fdb" }}
            >
              <label
                className="font-weight-bold pl-0 m-0"
                style={{ fontSize: "20px" }}
              >
                Download Payslip
              </label>
            </div>
          </div>
          <div className=" my-3">
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
              onSubmit={async (values) => {}}
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
                      <a
                        href={`https://freshexp-server.herokuapp.com/getsalary?employee_code=${employee?.employee_code}&start=${values?.start}&end=${values.end}`}
                        download
                      >
                        <SimpleButton
                          title="Download"
                          className="float-right"
                          type="button"
                          className="float-right mb-3"
                        />
                      </a>
                    </CCardBody>
                  </Form>
                );
              }}
            </Formik>
          </div>
          {/* <Pie
            className="chart"
            data={{
              labels: ["Present", "Absent"],
              datasets: [
                {
                  label: "My First Dataset",
                  data: [80, 20],
                  backgroundColor: ["#41B883", "#DD1B16"],
                  hoverOffset: 4,
                },
              ],
            }}
            redraw={false}
            options={{
              layout: {
                padding: 0,
              },
              plugins: {
                legend: {
                  title: {
                    display: false,
                    text: "majak",
                  },
                  position: "left",
                  labels: {
                    font: {
                      size: 16,
                    },
                    // padding: {
                    //   left: 300,
                    // },
                  },
                },
                subtitle: {
                  display: true,
                  text: "January 2021",
                },
              },
            }}
          /> */}
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Profile;
