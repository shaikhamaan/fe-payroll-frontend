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
import MainHeading from "src/components/heading";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Update(props) {
  var today = new Date();
  var maxDate = new Date();
  maxDate = moment(maxDate?.setFullYear(today?.getFullYear())).format(
    "YYYY-MM-DD"
  );
  const [selectedOption, setSelectedOption] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [options, setOptions] = useState([]);

  const handleSubmit = async () => {
    const d = await axios.post("http://localhost:5000/attendance/refill", {
      employee_codes: selectedOption,
      date,
      time,
    });

    if (d.data.status == "success") {
      toast.success(d.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(d.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:5000/employee");
    let temp = [];
    data.map((employee) =>
      temp.push({
        label: employee?.rfid_card_no + " - " + employee?.employee_name,
        value: employee?.rfid_card_no,
      })
    );
    setOptions(temp);
  }, []);

  return (
    <div>
      <CCard accentColor="primary">
        <MainHeading heading="Attendance Refill" />
        <CCardBody className="">
          <CFormGroup row>
            <CCol lg="6" sm="6">
              <CLabel htmlFor="#select">Select Employees</CLabel>
              <Select
                onChange={(e) => {
                  setSelectedOption(e);
                }}
                options={options}
                isMulti={true}
                id="select"
              />
            </CCol>
            <CCol lg="6" sm="6">
              <DatePicker
                title="Select Date"
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
          <CFormGroup row>
            <CCol lg="6" sm="6">
              <DatePicker
                title="Select Time"
                id="entry_made_on"
                placeholder="time"
                required
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={time ? time : ""}
                type="time"
                maxDate={maxDate}
              />
            </CCol>
          </CFormGroup>
          <SimpleButton
            title="Update Attendance"
            color="primary"
            className="float-right my-3"
            type="submit"
            onClick={handleSubmit}
          />
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Update;
