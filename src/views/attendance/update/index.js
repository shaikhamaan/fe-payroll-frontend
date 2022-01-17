import React, { useEffect, useState } from "react";
import {
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import moment from "moment";
import SimpleButton from "src/components/buttons/simpleButton";
import Select from "react-select";
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
import XLSX from "xlsx";

function Update(props) {
  var today = new Date();
  var maxDate = new Date();
  maxDate = moment(maxDate?.setFullYear(today?.getFullYear())).format(
    "YYYY-MM-DD"
  );
  const [selectedOption, setSelectedOption] = useState({});
  const [date, setDate] = useState("");
  const [options, setOptions] = useState([]);
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
      <CCard accentColor="primary">
        <MainHeading heading="Attendance Update" />
        <CCardBody className="">
          <CFormGroup row>
            <CCol lg="6" sm="6">
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
            </CCol>
            <CCol lg="6" sm="6">
              <DatePicker
                title="Select Date"
                id="entry_made_on"
                placeholder="date"
                required
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date ? moment(date)?.format("YYYY-MM-DD") : ""}
                maxDate={maxDate}
              />
            </CCol>
          </CFormGroup>
          <SimpleButton
            title="Update Attendance"
            color="primary"
            className="float-right my-3"
            type="submit"
          />
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Update;
