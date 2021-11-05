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
import { SET_LOADER } from "src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "src/components/tables";
import { SelectColumnFilter } from "src/components/tables/filters";
import { useParams } from "react-router";
import tableTypes from "../../../components/tables/types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
              <p className="font-weight-bold">Shaikh Amaan</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Employee Code</label>
              <p className="font-weight-bold">2019BTECS00076</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Work Location</label>
              <p className="font-weight-bold">Nanded</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Added By</label>
              <p className="font-weight-bold">Dnyaneshwar on 28-01-2021</p>
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
              <p className="font-weight-bold">+91-97649-19739</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">WhatsApp Status</label>
              <p className="font-weight-bold">Active</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Vehicle Group</label>
              <p className="font-weight-bold">MRJ-2</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Mobile Number Relation</label>
              <p className="font-weight-bold">Self</p>
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
              <p className="font-weight-bold">State Bank of India</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank IFSC</label>
              <p className="font-weight-bold">SBIN0124586</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Account Number</label>
              <p className="font-weight-bold">XXXXXX77777</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Account Name</label>
              <p className="font-weight-bold">Shaikh Amaan Shaikh Farooque</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Account Relation</label>
              <p className="font-weight-bold">Self</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Bank Branch Name</label>
              <p className="font-weight-bold">Market Yard, Dharmabad</p>
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
              <p className="font-weight-bold">312468473546</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Experience Status</label>
              <p className="font-weight-bold">5-Years Experience</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Education Level</label>
              <p className="font-weight-bold">Under-graduate</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Work Grade</label>
              <p className="font-weight-bold">Canteen</p>
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
              <p className="font-weight-bold">Dnayneshwar Ware</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Contact Relation</label>
              <p className="font-weight-bold">Roommate</p>
            </div>
          </div>
          <div className="row view-basic-card pl-2 ">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Contact Number</label>
              <p className="font-weight-bold">+91-90220-34427</p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label className="">Pay Scale</label>
              <p className="font-weight-bold">20 RS</p>
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
