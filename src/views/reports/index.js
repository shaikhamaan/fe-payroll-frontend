import React, { useEffect, useState } from "react";
import {
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
} from "@coreui/react";
import { options } from "./utils/options";
import moment from "moment";
import SimpleButton from "src/components/buttons/simpleButton";
import Select from "src/components/formFields/select";
import DatePicker from "src/components/formFields/datePicker";
import { SET_LOADER } from "src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "src/components/tables";
import { SelectColumnFilter } from "src/components/tables/filters";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MainHeading from "src/components/heading";
import { SnackbarProvider } from "notistack";
import { Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";
import xlsx from "json-as-xlsx";
import { daily, monthly } from "./utils/columns";

function Reports(props) {
  const { id } = useParams();
  const [monthYear, setMonthYear] = useState(
    moment(new Date()).format("MMMM-yyyy")
  );
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [department, setDepartment] = useState("");
  let settings = {
    fileName:
      type === "monthly" ? `${monthYear}_attendance` : `${date}_attendance`,
    extraLength: 4,
    writeOptions: {},
  };

  //   handleClick(() => {
  //     dispatch({ type: SET_LOADER, payload: true });
  //     getReport(
  //       type === "monthly" ? {date : monthYear} : {date : date}},
  //       (data) => {
  //         dispatch({ type: SET_LOADER, payload: false });
  //         setExcelData([
  //           {
  //             sheet:  type === "monthly" ? `${monthYear}_attendance` : `${date}_attendance`,
  //             columns: type === "monthly" ? monthly : daily,
  //             content: data?.data?.data,
  //           },
  //         ]);
  //       },
  //       () => {
  //         dispatch({ type: SET_LOADER, payload: false });
  //       }
  //     );
  //    xlsx(excelData, settings);
  //   }, [refresh, monthYear]);

  return (
    <div>
      <CCard accentColor="primary">
        <MainHeading heading="Reports" />
        <CCardBody className="">
          <CFormGroup row>
            <CCol className="mx-2">
              <Select
                title="Report Type"
                value={type}
                options={[
                  { key: "Please Select", value: "" },
                  { key: "Monthly", value: "monthly" },
                  { key: "Daily", value: "daily" },
                ]}
                onChange={(e) => setType(e.target.value)}
              />
            </CCol>
          </CFormGroup>
          {type === "monthly" ? (
            <div className="mt-2 mx-2 p-2">
              <CCol className="pl-0 mb-2">
                <h3>Monthly Reports</h3>
              </CCol>
              <CFormGroup row>
                <CCol xs="12" lg="6">
                  <Select
                    custom
                    name="select"
                    options={options}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    value={department}
                    title="Department"
                    required
                  />
                </CCol>
                <CCol lg="6" md="6">
                  <DatePicker
                    type="month"
                    value={moment(monthYear).format("yyyy-MM")}
                    onChange={(e) => {
                      setMonthYear(moment(e.target.value).format("MMMM-yyyy"));
                    }}
                    className="col-md-10 col-xs-10 col-lg-10"
                    title="Month"
                    required
                  />
                </CCol>
                <CCol>
                  <SimpleButton
                    title="Download Report"
                    style={{ width: 400 }}
                    onClick={() => {
                      //handleClick();
                    }}
                    className="col-md-2 col-xs-2 col-lg-2 mt-4 float-right"
                  />
                </CCol>
              </CFormGroup>
            </div>
          ) : null}
          {type === "daily" ? (
            <div className="mt-2 mx-2 p-2">
              <CCol className="pl-0 mb-2">
                <h3>Daily Reports</h3>
              </CCol>
              <CFormGroup row>
                <CCol xs="12" lg="6">
                  <Select
                    custom
                    name="select"
                    options={options}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    value={department}
                    title="Department"
                    required
                  />
                </CCol>
                <CCol lg="6" md="6">
                  <DatePicker
                    title="Date"
                    required
                    type="date"
                    value={moment(date).format("DD-MMM-YYYY")}
                    className="col-md-10 col-xs-10 col-lg-10"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    value={date ? moment(date)?.format("YYYY-MM-DD") : ""}
                  />
                </CCol>
                <CCol>
                  <SimpleButton
                    title="Download Report"
                    style={{ width: 230, marginLeft: 30 }}
                    onClick={() => {
                      //handleClick();
                    }}
                    className="col-md-2 col-xs-2 col-lg-2 mt-4 float-right"
                  />
                </CCol>
              </CFormGroup>
            </div>
          ) : null}
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Reports;
