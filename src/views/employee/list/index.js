import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol } from "@coreui/react";
import {
  getEmployees,
  getEmployeesPaginate,
  getUsersWithSelectedFields,
} from "./api";

import { useDispatch, useSelector } from "react-redux";
import CustomTable from "src/components/tables";

import MainHeading from "src/components/heading";
import { SnackbarProvider } from "notistack";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAirFreshener,
} from "@fortawesome/free-solid-svg-icons";

function ListEmployees(props) {
  const dispatch = useDispatch();
  // const [employeeData, setEmployeeData] = useState([]);
  // const organization_id = useSelector((state) =>
  //   id ? id : state.auth?.userDetails?.organization_id
  // );
  // const params = new URLSearchParams(props.location.search);
  // var page = params.get("page");
  const [employees, setEmployees] = useState([]);

  useEffect(async () => {
    const e = await getEmployees();
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
                          <Link to={`/employees/profile/${row?.employee_code}`}>
                            <h4 className="text-center">
                              <FontAwesomeIcon
                                icon={faAddressCard}
                                color="blue"
                              />
                            </h4>
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
