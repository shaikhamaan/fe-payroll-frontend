import React, { useEffect, useState, useRef } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { useParams } from "react-router";
import { addEmployee, uploadProfilePicture } from "./api";
import { SET_LOADER } from "src/redux/actions";
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import Images from "src/constants/images";
import FilePicker from "src/components/formFields/filePicker";
// import { getOrganizations } from "src/views/organization/add/apis";

const ProfileCard = ({ userDetails, setUserDetails, edit = true }) => {
  const dispatch = useDispatch();
  //const [organization, setOrganization] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const uploadImageRef = useRef(null);

  // useEffect(() => {
  //   getOrganizations(`?_id=${userDetails?.organization_id}`, (data) => {
  //     if (data?.status === "success") {
  //       setOrganization(data?.data[0]);
  //       dispatch({ type: SET_LOADER, payload: false });
  //     } else {
  //       dispatch({ type: SET_LOADER, payload: false });
  //     }
  //   });
  // }, [userDetails]);

  const { id } = useParams();
  const onClickRemove = () => {
    dispatch({ type: SET_LOADER, payload: true });
    addEmployee(
      { _id: id, profile_picture: "" },
      (data) => {
        if (data?.status === "success") {
          setUserDetails(data?.data);
          enqueueSnackbar("Profile picture has been removed", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
          });
          dispatch({ type: SET_LOADER, payload: false });
        } else {
          enqueueSnackbar(data?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
          });
          dispatch({ type: SET_LOADER, payload: false });
        }
      },
      () => {
        enqueueSnackbar("Error while remove profile picture", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        dispatch({ type: SET_LOADER, payload: false });
      }
    );
  };

  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{
          width: "100%",
          height: 110,
          backgroundImage: "linear-gradient(to right, #11A8FD, #005696)",
          marginBottom: 30,
          borderRadius: 12,
          padding: 15,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            width: 80,
            borderRadius: "50%",
            border: userDetails?.profile_picture ? "5px solid white" : null,
            marginInline: 10,
          }}
        >
          <img
            src={
              userDetails?.profile_picture
                ? userDetails?.profile_picture
                : Images?.nullProfileImage
            }
            style={{
              width: "72px",
              height: "73px",
              borderRadius: "100%",
            }}
          />
        </div>
        <div className="d-flex flex-column">
          <div
            style={{
              fontWeight: 500,
              fontSize: 22,
              color: "white",
            }}
          >
            {userDetails?.first_name} {userDetails?.last_name}
          </div>
          <div style={{ fontSize: 16, color: "rgba(255, 255, 255, 0.8)" }}>
            {userDetails?.role}
          </div>
          <div>
            <CDropdown>
              {edit ? (
                <CDropdownToggle
                  htmlFor="forInput"
                  style={{
                    color: "#11A8FD",
                    backgroundColor: "white",
                    height: 28,
                    paddingBottom: 24,
                    fontWeight: "bold",
                    letterSpacing: 0.3,
                    marginTop: 6,
                  }}
                >
                  Change Avatar
                </CDropdownToggle>
              ) : null}

              <CDropdownMenu placement="top">
                <CDropdownItem
                  onClick={() => {
                    uploadImageRef?.current?.click();
                  }}
                >
                  Change
                </CDropdownItem>
                {userDetails?.profile_picture ? (
                  <CDropdownItem onClick={onClickRemove}>Remove</CDropdownItem>
                ) : null}
              </CDropdownMenu>
            </CDropdown>
            <div className="d-none" id="forInput">
              <FilePicker
                uploadImageRef={uploadImageRef}
                accept="image/*"
                onFileSelect={(image) => {
                  dispatch({ type: SET_LOADER, payload: true });
                  uploadProfilePicture(
                    {
                      user_id: userDetails?._id,
                      image,
                    },
                    (data) => {
                      if (data?.status === "success") {
                        setUserDetails(data?.data);
                        enqueueSnackbar("Profile picture has been updated", {
                          variant: "success",
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                        });
                        dispatch({ type: SET_LOADER, payload: false });
                      } else {
                        enqueueSnackbar(data?.message, {
                          variant: "error",
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                        });
                        dispatch({ type: SET_LOADER, payload: false });
                      }
                    },
                    () => {
                      enqueueSnackbar("Error while updating profile picture", {
                        variant: "error",
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                      });
                      dispatch({ type: SET_LOADER, payload: false });
                    }
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column align-content-between"
          style={{
            fontSize: 16,
            color: "white",
            position: "absolute",
            right: 56,
            fontWeight: 500,
          }}
        >
          <div className="mb-1">Company Code: &nbsp;</div>
          <div className="mb-1">
            Employee Code: &nbsp; {userDetails?.employee_code}
          </div>
          <div>Email: &nbsp; {userDetails?.office_email}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
