import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import localStorageConstants from "src/constants/localstorageConstants";
import { SET_LOADER, SET_LOGIN_STATUS } from "src/redux/actions";
import PasswordInput from "src/components/formFields/passwordInput";
import backgroundImage from "src/constants/images/Background.png";
import BrandLogo from "src/assets/images/logo-brand.png";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [userId, setUserId] = useState(
    localStorage.getItem(localStorageConstants.userId)
  );

  const onLoginPress = async () => {
    dispatch({ type: SET_LOADER, payload: true });
    const response = await axios.post(
      "https://freshexp-server.herokuapp.com/users/authuser",
      {
        username: id,
        password: password,
      }
    );
    if (response?.data?.status === "success") {
      localStorage.setItem(localStorageConstants.userId, id);
      localStorage.setItem("role", response?.data?.role);
      dispatch({ type: SET_LOGIN_STATUS, payload: true });
      history.push("/dashboard");
    } else {
      setErrors({ message: "Login Failed" });
    }
    console.log(response, "haaa");
    dispatch({ type: SET_LOADER, payload: false });
  };
  return (
    <div
      className="c-app c-default-layout flex-row align-items-center hide-text-selection"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <div className="mb-4">
                      <PasswordInput value={password} setValue={setPassword} />
                    </div>

                    {errors?.message ? (
                      <CRow className="mb-4">
                        <CCol xs="12">
                          <span style={{ color: "red", fontWeight: 500 }}>
                            {errors?.message}
                          </span>
                        </CCol>
                      </CRow>
                    ) : null}
                    <CRow>
                      <CCol xs="4">
                        <CButton
                          onClick={onLoginPress}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <div>
                      <img
                        src={BrandLogo}
                        alt="sd"
                        style={{
                          height: 100,
                          width: "auto",

                          marginBottom: 16,
                        }}
                      />
                    </div>
                    <h2>FreshExpress </h2>
                    <p>
                      FreshExpress Payroll and attendance management system!
                    </p>
                    {/* <Link to="/">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Visit Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
