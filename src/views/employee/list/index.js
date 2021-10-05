import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol } from "@coreui/react";
import { getEmployeesPaginate, getUsersWithSelectedFields } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "src/components/tables";
import { SelectColumnFilter } from "src/components/tables/filters";
import { useParams } from "react-router";
import tableTypes from "../../../components/tables/types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MainHeading from "src/components/heading";
import { SnackbarProvider } from "notistack";
import './style.css'
import axios from "axios";


function tableMaker(val){
  return(
    <>
      <tr>
        <td>{val.employee_name}</td>
        <td>{val.employee_code}</td>
        <td>{val.work_location}</td>
      </tr>
    </>
  )
}



function ListEmployees(props) {
  const { id } = useParams();

  // const dispatch = useDispatch();
  // const [employeeData, setEmployeeData] = useState([]);
  // const organization_id = useSelector((state) =>
  //   id ? id : state.auth?.userDetails?.organization_id
  // );
  // const params = new URLSearchParams(props.location.search);
  // var page = params.get("page");
  const [employees,setEmployees] = useState([])
   useEffect( async () => {
    
    const e = await axios.get('http://localhost:5000')
    setEmployees(e.data)
   }, []);
  

   console.log(employees);
  
  return (
    // <SnackbarProvider>
    //   <div>
    //     <CCol xs="12" lg="12">
    //       <CCard accentColor="primary">
    //         <MainHeading heading="Employees" />
    //         <CCardBody>
    //           <CustomTable
    //             data={[...employeeData]}
    //             actions
    //             type={tableTypes?.employeesList}
    //             columns={[
    //               {
    //                 Header: "Employee Name",
    //                 accessor: "employee_name",
    //               },
    //               {
    //                 Header: "Gender",
    //                 accessor: "gender",
    //               },
    //               {
    //                 Header: "Email",
    //                 accessor: "office_email",
    //               },
    //               {
    //                 Header: "Status",
    //                 accessor: "status",
    //               },
    //               {
    //                 Header: "Code",
    //                 accessor: "employee_code",
    //               },
    //               {
    //                 Header: "ID",
    //                 accessor: "_id",
    //                 show: false,
    //               },
    //             ]}
    //           />
    //         </CCardBody>
    //       </CCard>
    //     </CCol>
    //   </div>
    // </SnackbarProvider>
    <>
    <table>
      <tbody>
        <tr>
          <th>Employee Name</th>
          <th>Employee Code</th>
          <th>Work Location</th>
        </tr>

        {
          
          employees.map(tableMaker)
         
        }
      </tbody>
    </table>

   

    </>

  );
}

export default ListEmployees;
