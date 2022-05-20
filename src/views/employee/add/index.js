import React, { useEffect, useState, useRef } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import BasicData from "./basicData";
import Communication from "./communication";
import Identity from "./identity/identity";
import BankDetails from "./bankDetails";
import JobDetails from "./jobDetails";
import EmergencyContact from "./emergencyContact";
import Assets from "./assets";
import { useParams } from "react-router";
import { getEmployees } from "./api";
import ReactTooltip from "react-tooltip";
// import Actions from "./actions";
import SimpleButton from "src/components/buttons/simpleButton";
import { Link } from "react-router-dom";
import { SET_LOADER } from "src/redux/actions";
import { useDispatch } from "react-redux";
import userTypes from "src/constants/userTypes";
import { useSelector } from "react-redux";
//import { checkPermission } from "src/permissions/utils";
import { SnackbarProvider, useSnackbar } from "notistack";
import ProfileCard from "./profileCard";
import MainHeading from "src/components/heading";
import axios from "axios";
const AddEmployees = () => {
  const [active, setActive] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState("");
  var isDisabled = false;
  //const { user_type, _id } = useSelector((state) => state?.auth?.userDetails);

  const { id } = useParams();
  // useEffect(async () => {
  //   const e = await axios.get(`http://localhost:5000/getdata/${id}`);
  //   setUserDetails(e?.data?.data);
  // }, []);
  //checkPermission(user_type, id, _id);
  useEffect(() => {
    if (id) {
      //dispatch({ type: SET_LOADER, payload: true });
      getEmployees(
        `${id}`,
        (data) => {
          setUserDetails(data);
          console.log(userDetails);
          //dispatch({ type: SET_LOADER, payload: false });
        },
        () => {
          //dispatch({ type: SET_LOADER, payload: false });
        }
      );
    }
  }, [refresh]);

  // if (
  //   id &&
  //   user_type != userTypes?.hr?.key &&
  //   user_type != userTypes?.superAdmin?.key
  // ) {
  //   isDisabled = true;
  // }

  const props = {
    setActive,
    userId,
    setUserId,
    userDetails,
    setUserDetails,
    isDisabled,
  };

  return (
    <SnackbarProvider>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={`/employees/upload`}>
            <SimpleButton title="Upload Employees" className="mr-3 mb-2" />
          </Link>
        </div>
        <CCol xs="12" md="12" className="mb-4">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <div className="d-flex">
            {id && user_type !== "employee" ? (
              <>
                <Link to={`/userDocuments/${userDetails?._id}`}>
                  <SimpleButton
                    title="Upload Documents"
                    className="mr-3 mb-2"
                  />
                </Link>
                {isDisabled ? null : (
                  <Actions
                    userDetails={userDetails}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )}
              </>
            ) : null}
          </div> */}

            {/* <ProfileCard
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          /> */}
          </div>
          <CCard accentColor="primary">
            <MainHeading heading="Add Employee" />
            <CCardBody>
              <CTabs
                activeTab={active}
                onActiveTabChange={(idx) => setActive(idx)}
              >
                <CNav variant="tabs">
                  <CNavItem data-tip="Basic Data">
                    <CNavLink disabled={!id}>
                      <CIcon name="cil-calculator" />
                      {active === 0 && " Basic Data"}
                    </CNavLink>
                  </CNavItem>

                  <CNavItem data-tip="Communication">
                    <CNavLink disabled={!id}>
                      <CIcon name="cil-phone" />
                      {active === 1 && " Communication"}
                    </CNavLink>
                  </CNavItem>
                  {/* <CNavItem data-tip="Identity">
                  <CNavLink disabled={!id}>
                    <CIcon name="cil-user" />
                    {active === 2 && " Identity"}
                  </CNavLink>
                </CNavItem> */}
                  <CNavItem data-tip="Bank Details">
                    <CNavLink disabled={!id}>
                      <CIcon name="cil-credit-card" />
                      {active === 2 && " Bank Details"}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem data-tip="Job Details">
                    <CNavLink disabled={!id}>
                      <CIcon name="cil-check" />
                      {active === 3 && " Job Details"}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem data-tip="Emergency Contact">
                    <CNavLink disabled={!id}>
                      <CIcon name="cil-envelope-closed" />
                      {active === 4 && " Emergency Contact"}
                    </CNavLink>
                  </CNavItem>
                  {/* <CNavItem data-tip="Assets">
                  <CNavLink disabled={!id}>
                    <CIcon name="cil-laptop" />
                    {active === 5 && " Assets"}
                  </CNavLink>
                </CNavItem> */}
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <BasicData {...props} />
                  </CTabPane>
                  <CTabPane>
                    <Communication {...props} />
                  </CTabPane>
                  {/* <CTabPane>
                  <Identity {...props} />
                </CTabPane> */}
                  <CTabPane>
                    <BankDetails {...props} />
                  </CTabPane>

                  <CTabPane>
                    <JobDetails {...props} />
                  </CTabPane>
                  <CTabPane>
                    <EmergencyContact {...props} />
                  </CTabPane>
                  {/* <CTabPane>
                  <Assets {...props} />
                </CTabPane> */}
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
          <ReactTooltip />
          <ReactTooltip />
        </CCol>
      </div>
    </SnackbarProvider>
  );
};

export default AddEmployees;
