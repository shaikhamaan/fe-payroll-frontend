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
import { Link }  from 'react-router-dom'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAirFreshener } from '@fortawesome/free-solid-svg-icons'



function ListEmployees(props) {
  const { id } = useParams();

  // const dispatch = useDispatch();
  // const [employeeData, setEmployeeData] = useState([]);
  // const organization_id = useSelector((state) =>
  //   id ? id : state.auth?.userDetails?.organization_id
  // );
  // const params = new URLSearchParams(props.location.search);
  // var page = params.get("page");
  const [employees, setEmployees] = useState([]);

  useEffect(async () => {
    const e = await axios.get("http://localhost:5000");
    setEmployees(e.data);
  }, []);


  return (
    <SnackbarProvider>
      <div>
        <CCol xs="12" lg="12">
          <CCard accentColor="primary">
            <MainHeading heading="Employees" />
            <CCardBody>
              <CustomTable
                data={[...employees]}
                //actions
                //type={tableTypes?.employeesList}
                columns={[
                  {
                    Header: "Employee Name",
                    accessor: "employee_name",
                  },
                  {
                    Header: "Work Location",
                    accessor: "work_location",
                  },
                  {
                    Header: "Employee Code",
                    accessor: "employee_code",
                  },
                  {
                    Header: "Actions",
                    disableSortBy: true,
                    disableFilters: true,
                    accessor: (row) => {
                      return (
                        <>
              
                        <Link
                          to={`/employees/profile/${row?.employee_code}`}
                        >
                        <h4 className="text-center"><FontAwesomeIcon icon={faAddressCard} color="blue" /></h4>
                        
                        </Link>
                        </>
                      );
                    },
                  },
                ]}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    </SnackbarProvider>
  );
}

export default ListEmployees;
