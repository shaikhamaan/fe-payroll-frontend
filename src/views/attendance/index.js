import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol } from "@coreui/react";
import DatePicker from "src/components/formFields/datePicker";
import moment from "moment";
import CustomTable from "src/components/tables";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOADER } from "src/redux/actions";
import { SelectColumnFilter } from "src/components/tables/filters";
import MainHeading from "src/components/heading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SimpleButton from "src/components/buttons/simpleButton";
import xlsx from "json-as-xlsx";
import ReactTooltip from "react-tooltip";

function Attendance(props) {
  const [monthYear, setMonthYear] = useState(
    moment(new Date()).format("MMMM-yyyy")
  );
  const [attendance, setAttendance] = useState([]);
  const dispatch = useDispatch();
  var { user_id, manager } = useParams();

  const [refresh, setRefresh] = useState(0);
  const [excelData, setExcelData] = useState([]);
  let settings = {
    fileName: `${monthYear}_attendance`,
    extraLength: 4,
    writeOptions: {},
  };

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

  return (
    <CCol xs="12" sm="12" lg="12">
      <CCard accentColor="primary">
        <MainHeading heading="Attendance" />
        <CCardHeader className="d-flex view-basic-card">
          <DatePicker
            type="month"
            value={moment(monthYear).format("yyyy-MM")}
            onChange={(e) => {
              console.log(e.target.value)
              setMonthYear(moment(e.target.value).format("MMMM-yyyy"));
            }}
            className="col-md-10 col-xs-10 col-lg-10"
          />
          {!user_id && !manager ? (
            <SimpleButton
              title="Download Excel Sheet"
              style={{ width: 230, marginLeft: 30 }}
              onClick={() => {
                //xlsx(excelData, settings);
              }}
              className="col-md-2 col-xs-2 col-lg-2"
            />
          ) : null}
        </CCardHeader>
        <CCardBody
          style={{
            padding: "6px",
          }}
        >
          <div className="p-3">
            <span className="font-weight-bold">Week: </span>
            <span>1st</span>
          </div>
          <CustomTable
            data={[...attendance]}
            columns={[
              {
                Header: "Sr. No.",
                accessor: "first_name",
              },
              {
                Header: "EmpCode",
                accessor: "monday",
              },
              {
                Header: "CardNo",
                accessor: "tuesday",
              },
              {
                Header: "Name",
                accessor: "wednesday",
              },
              {
                Header: "Shift",
                accessor: "thursday",
              },
              {
                Header: "Shift Time",
                accessor: "friday",
              },
              {
                Header: "Arr. Time",
                accessor: "arrival_time",
              },
              {
                Header: "Late Hrs",
                accessor: "late_hours",
              },
              {
                Header: "Dep. Time",
                accessor: "departure_time",
              },
              {
                Header: "Early Hrs",
                accessor: "early_hours",
              },
              {
                Header: "Work Hrs",
                accessor: "work_hours",
              },
              {
                Header: "O.Time",
                accessor: "on_time",
              },
              {
                Header: "Status",
                accessor: "status",
              },
              {
                Header: "Remarks",
                accessor: "remarks",
              },
            ]}
          />
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default Attendance;
