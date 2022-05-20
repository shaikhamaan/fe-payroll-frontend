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
import { dayReport, monthReprt } from "./apis";
import xlsx from "json-as-xlsx";
import { daily, monthly } from "./utils/columns";
import XLSX from "xlsx";

function Reports(props) {
  const { id } = useParams();
  const [monthYear, setMonthYear] = useState(
    moment(new Date()).format("YYYY-MM")
  );
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("");
  //const [excelData, setExcelData] = useState([]);
  const [department, setDepartment] = useState("");
  const dispatch = useDispatch();
  let settings = {
    fileName:
      type === "monthly" ? `${monthYear}_attendance` : `${date}_attendance`,
    extraLength: 4,
    writeOptions: {},
  };

  const handleClick = async () => {
    const getReport = async () => {
      if (type === "daily") {
        const data = await dayReport({
          date: date,
        });

        const excelData = [
          {
            sheet: `attendance`,
            columns: daily,
            content: data.data,
          },
        ];

        const download = async () => {
          try {
            xlsx(excelData, settings);
          } catch (error) {
            console.log(error);
          }
        };

        await download();
      } else {
        const data = await monthReprt({
          month: monthYear,
          department: department,
        });
        const report = data.data;
        const wb = XLSX.utils.book_new();
        if (!wb.Props) wb.Props = {};
        wb.Props.Title = "Attendance Report";
        for (let i = 0; i < report.length; i++) {
          wb.SheetNames.push(String(i + 1));
          var ws = XLSX.utils.json_to_sheet(report[i]);

          wb.Sheets[String(i + 1)] = ws;
        }
        var wbout = XLSX.writeFile(wb, `${department} ${monthYear}.xlsx`, {
          bookType: "xlsx",
          type: "binary",
        });
      }
    };
    await getReport();
  };

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
                      handleClick();
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
                <SimpleButton
                  title="Download Report"
                  style={{ width: 230, marginLeft: 30 }}
                  onClick={() => {
                    handleClick();
                  }}
                  className="col-md-2 col-xs-2 col-lg-2 mt-4 float-right"
                />
              </CFormGroup>
            </div>
          ) : null}
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Reports;
