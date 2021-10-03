// import React, { useState } from "react";
// import CustomModal from "src/components/modal";
// import PasswordModal from "src/components/modal/passwordModal";
// import ReactTooltip from "react-tooltip";
// // import { getUserPassword } from "src/views/employee/add/api";
// import {
//   CCard,
//   CCollapse,
//   CCardHeader,
//   CDropdown,
//   CDropdownDivider,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
// } from "@coreui/react";
// import { useParams, useHistory } from "react-router";
// import { changeStatus } from "./api";
// import { useSnackbar } from "notistack";
// // import { resetPassword } from "src/views/organization/add/apis";

// const Actions = ({ userDetails, refresh, setRefresh }) => {
//   console.log(userDetails, "useraDedjs");
//   const { id } = useParams();
//   const history = useHistory();
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [disableModalVisible, setDisableModalVisible] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [resetPasswordModalVisible, setResetPasswordModalVisible] =
//     useState(false);

//   const onClickStatusCta = (status) => {
//     setLoader(true);
//     changeStatus(
//       userDetails?._id,
//       status,
//       (data) => {
//         setLoader(false);
//         window.location.reload();
//         enqueueSnackbar("Saved.", {
//           variant: "success",
//           anchorOrigin: {
//             vertical: "bottom",
//             horizontal: "left",
//           },
//         });
//       },
//       () => {
//         setLoader(false);
//         window.alert("not deleted");
//       }
//     );
//   };

//   return (
//     <CDropdown className="mb-3 btn-group">
//       <CDropdownToggle color="primary">Actions</CDropdownToggle>
//       <CDropdownMenu>
//         <CDropdownItem
//           onClick={() => {
//             if (userDetails?.is_password_reset) {
//               setResetPasswordModalVisible(true);
//             } else {
//               setPasswordModalVisible(true);
//             }
//           }}
//         >
//           <div>
//             {userDetails?.is_password_reset
//               ? "Reset Password"
//               : "Show Password"}
//           </div>
//         </CDropdownItem>
//         <CDropdownItem
//           onClick={() => {
//             setDeleteModalVisible(true);
//           }}
//         >
//           <div>{userDetails?.status === "Deleted" ? "Recover" : "Delete"}</div>
//         </CDropdownItem>

//         <CDropdownItem
//           onClick={() => {
//             setDisableModalVisible(true);
//           }}
//         >
//           <div>
//             {userDetails?.status === "Disabled" ? "Make Active" : "Disable"}
//           </div>
//         </CDropdownItem>
//       </CDropdownMenu>
//       <CustomModal
//         setIsModalVisible={setResetPasswordModalVisible}
//         secondaryCtaFunction={() => {
//           setResetPasswordModalVisible(false);
//         }}
//         title={"Reset Password"}
//         isModalVisible={resetPasswordModalVisible}
//         primaryCtaFunction={() => {
//           setLoader(true);
//           resetPassword(userDetails?._id, () => {
//             window.location.reload();
//             enqueueSnackbar("Password reset success", {
//               variant: "success",
//               anchorOrigin: {
//                 vertical: "bottom",
//                 horizontal: "left",
//               },
//             });
//             setResetPasswordModalVisible(false);
//             setLoader(false);
//           });
//         }}
//         primaryText={"Reset"}
//         secondaryText="Cancel"
//         innerText={`Do you want to reset the password of ${userDetails?.company_name}`}
//         loader={loader}
//       />
//       <CustomModal
//         setIsModalVisible={setDeleteModalVisible}
//         secondaryCtaFunction={() => {
//           setDeleteModalVisible(false);
//         }}
//         title={userDetails?.status === "Deleted" ? "Recover" : "Delete"}
//         isModalVisible={deleteModalVisible}
//         primaryCtaFunction={() => {
//           userDetails?.status == "Deleted"
//             ? onClickStatusCta("Active")
//             : onClickStatusCta("Deleted");
//         }}
//         primaryText={userDetails?.status === "Deleted" ? "Recover" : "Delete"}
//         secondaryText="Cancel"
//         innerText={`Do you want to ${
//           userDetails?.status === "Deleted" ? "recover" : "delete"
//         } ${userDetails?.first_name}`}
//         loader={loader}
//       />
//       <CustomModal
//         setIsModalVisible={setDisableModalVisible}
//         secondaryCtaFunction={() => {
//           setDisableModalVisible(false);
//         }}
//         title={userDetails?.status === "Disabled" ? "Make Active" : "Disable"}
//         isModalVisible={disableModalVisible}
//         primaryCtaFunction={() => {
//           userDetails?.status == "Disabled"
//             ? onClickStatusCta("Active")
//             : onClickStatusCta("Disabled");
//         }}
//         primaryText={
//           userDetails?.status === "Disabled" ? "Make Active" : "Disable"
//         }
//         secondaryText="Cancel"
//         innerText={`Do you want to ${
//           userDetails?.status === "Disabled" ? "Active" : "disable"
//         } ${userDetails?.first_name}`}
//         loader={loader}
//       />
//       <CustomModal
//         setIsModalVisible={setResetPasswordModalVisible}
//         secondaryCtaFunction={() => {
//           setResetPasswordModalVisible(false);
//         }}
//         title={"Resst Password"}
//         isModalVisible={resetPasswordModalVisible}
//         primaryCtaFunction={() => {
//           setLoader(true);
//           resetPassword(userDetails?._id, () => {
//             setRefresh(refresh + 1);
//             enqueueSnackbar("Password reset success", {
//               variant: "success",
//               anchorOrigin: {
//                 vertical: "bottom",
//                 horizontal: "left",
//               },
//             });
//             setLoader(false);
//             setResetPasswordModalVisible(false);
//           });
//         }}
//         primaryText={"Reset"}
//         secondaryText="Cancel"
//         innerText={`Do you want to reset the password of ${userDetails?.first_name}`}
//         loader={loader}
//       />
//       <PasswordModal
//         passwordModalVisible={passwordModalVisible}
//         secondaryCtaFunction={() => {
//           setPasswordModalVisible(false);
//         }}
//         organizationId={id}
//       />
//     </CDropdown>
//   );
// };

// export default Actions;
