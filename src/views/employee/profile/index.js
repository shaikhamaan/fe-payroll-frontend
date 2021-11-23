import React, { useEffect, useState } from "react";
import {
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CCol,
} from "@coreui/react";
import moment from "moment";
import SimpleButton from "src/components/buttons/simpleButton";
import DatePicker from "src/components/formFields/datePicker";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import MainHeading from "src/components/heading";
import { SnackbarProvider } from "notistack";
import { Doughnut, Pie } from "react-chartjs-2";
import "./style.css";
import axios from "axios";
import xlsx from "json-as-xlsx";

function Profile(props) {
  const { id } = useParams();
  const [monthYear, setMonthYear] = useState(
    moment(new Date()).format("MMMM-yyyy")
  );
  const [employee, setEmployees] = useState({});
  const [excelData, setExcelData] = useState([]);
  let settings = {
    fileName: `${monthYear}_attendance`,
    extraLength: 4,
    writeOptions: {},
  };

  useEffect(async () => {
    const e = await axios.get(`http://localhost:5000/getdata/${id}`);
    setEmployees(e?.data?.data);
  }, []);

  //   useEffect(() => {
  //     dispatch({ type: SET_LOADER, payload: true });
  //     getAttendance(
  //       "",
  //       (data) => {
  //         dispatch({ type: SET_LOADER, payload: false });
  //         setAttendance(data?.data?.data || []);
  //         setExcelData([
  //           {
  //             sheet: `${monthYear} Attendance`,
  //             columns: [
  //               { label: "Employee Name", value: "employee_name" },
  //               { label: "Attendance Status", value: "attendance_status" },
  //             ],
  //             content: data?.data?.data,
  //           },
  //         ]);
  //       },
  //       () => {
  //         dispatch({ type: SET_LOADER, payload: false });
  //       }
  //     );
  //   }, [refresh, monthYear]);
  console.log(employee);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/employees/edit/${employee?.employee_code}`}>
          <SimpleButton title="Edit" className="mr-3 mb-2" />
        </Link>
      </div>
      <CCard accentColor="primary">
        <MainHeading heading="Amaan Shaikh" />
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
                Attendance Statistics
              </label>
            </div>
          </div>
          <div className=" d-flex col-12 col-md-12 col-lg-12 my-3">
            <DatePicker
              type="month"
              value={moment(monthYear).format("yyyy-MM")}
              onChange={(e) => {
                setMonthYear(moment(e.target.value).format("MMMM-yyyy"));
              }}
              className="col-md-10 col-xs-10 col-lg-10"
            />

            <SimpleButton
              title="Download Attendance"
              style={{ width: 230, marginLeft: 30 }}
              onClick={() => {
                xlsx(excelData, settings);
              }}
              className="col-md-2 col-xs-2 col-lg-2"
            />
          </div>
          <Pie
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
          />
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Profile;
