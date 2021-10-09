import React, { useEffect, useState } from "react";
import { CListGroup, CListGroupItem, CCard, CCardBody, CCol } from "@coreui/react";
import { SET_LOADER } from "src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "src/components/tables";
import { SelectColumnFilter } from "src/components/tables/filters";
import { useParams } from "react-router";
import tableTypes from "../../../components/tables/types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MainHeading from "src/components/heading";
import { SnackbarProvider } from "notistack";

import axios from "axios";


function ViewEmployeeData(props) {
    const { id } = useParams();

    const [employee, setEmployees] = useState({})

    useEffect(async () => {

        const e = await axios.get(`http://localhost:5000/getdata/${id}`)
        setEmployees(e.data.data)
    }, []);

    console.log(employee);

    return (
        <>
            
            <CListGroup>
                <section><h4>Basic Data</h4></section>
                <CListGroupItem><h5>Employee Name : {employee.employee_name}</h5> </CListGroupItem>
                <CListGroupItem><h5>Employee Code : {employee.employee_code}</h5> </CListGroupItem>
                <CListGroupItem><h5>Entery Made On : {employee.entry_made_on}</h5> </CListGroupItem>
                <CListGroupItem><h5>Entry Made By : {employee.entry_added_by}</h5> </CListGroupItem>
                
                <br />
                <section><h4>Communication</h4></section>
                <CListGroupItem><h5>Mobile Number : {employee.mobile_no}</h5> </CListGroupItem>
                <CListGroupItem><h5>WhatsApp Status : {employee.whatsapp_status}</h5> </CListGroupItem>
                <CListGroupItem><h5>Vehicle Group : {employee.vehicle_group}</h5> </CListGroupItem>
                <CListGroupItem><h5>Mobile Relation  : {employee.mobile_relation}</h5> </CListGroupItem>
                <br />
                <section><h4>Bank Details</h4></section>
                <CListGroupItem><h5>Bank Name : {employee.bank_name}</h5> </CListGroupItem>
                <CListGroupItem><h5>Bank IFSC Code : {employee.bank_ifsc_code}</h5> </CListGroupItem>
                <CListGroupItem><h5>Bank Account Number : {employee.bank_account_no}</h5> </CListGroupItem>
                <CListGroupItem><h5>Bank Account Name  : {employee.bank_account_name}</h5> </CListGroupItem>
                <CListGroupItem><h5>Account Relation : {employee.account_relation}</h5> </CListGroupItem>
                <CListGroupItem><h5>Bank Branch Name : {employee.bank_branch}</h5> </CListGroupItem>
                <CListGroupItem><h5>Passbook URL : {employee.passbook_photo}</h5> </CListGroupItem>
                <br />
                <section><h4>Job Details</h4></section>
                <CListGroupItem><h5>Aadhar Number : {employee.aadhar_no}</h5> </CListGroupItem>
                <CListGroupItem><h5>Employee Image : {employee.employee_photo}</h5> </CListGroupItem>
                <CListGroupItem><h5>Experience Status : {employee.experience_status}</h5> </CListGroupItem>
                <CListGroupItem><h5>Years of Experience  : {employee.years_of_experience}</h5> </CListGroupItem>
                <CListGroupItem><h5>Highest Education : {employee.education}</h5> </CListGroupItem>
                <CListGroupItem><h5>Employee Grade : {employee.employee_grade}</h5> </CListGroupItem>
                <br />
                <section><h4>Emergency Contact Details</h4></section>
                <CListGroupItem><h5>Emergency Contact Name : {employee.emergency_contact}</h5> </CListGroupItem>
                <CListGroupItem><h5>Emergency Contact Relation  : {employee.emergency_person_relation}</h5> </CListGroupItem>
                <CListGroupItem><h5>Emergency Contact Number : {employee.emergency_contact_no}</h5> </CListGroupItem>
                <CListGroupItem><h5>Pay Scale : {employee.pay_scale}</h5> </CListGroupItem>
                <CListGroupItem><h5>Pay Scale Type : {employee.pay_scale_type}</h5> </CListGroupItem>
                <CListGroupItem><h5>Pay Scale Hour : {employee.payscale_per_hour}</h5> </CListGroupItem>
                <CListGroupItem><h5>Pay Scale Term : {employee.pay_scale_term}</h5> </CListGroupItem>


            </CListGroup>
        </>

    );
}

export default ViewEmployeeData;
