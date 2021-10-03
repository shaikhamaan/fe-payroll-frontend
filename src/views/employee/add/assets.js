import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CButton,
  CCollapse,
} from "@coreui/react";
import JobDetails from "./jobDetails";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
  addAssets,
  getAssets,
  getEmployees,
} from "./api";
import { SET_LOADER } from "src/redux/actions";
import { useHistory, useParams } from "react-router";
import { Formik, Form } from "formik";
import SimpleButton from "src/components/buttons/simpleButton";
import { assetsValidation } from "./validations";
import { useSnackbar } from "notistack";
import AssetsForm from "src/components/formFields/assetsForm";
import SimpleInput from "src/components/formFields/simpleInput";
import DatePicker from "src/components/formFields/datePicker";
import { array } from "prop-types";
// import { SET_USER_DATA } from "src/views/auth/actions";
import mapSeries from "async/mapSeries";

function Assets({
  userId,
  setActive,
  userDetails,
  setUserDetails,
  isDisabled,
}) {
  console.log(userDetails?._id, "idffdsaghh");
  const [assetsList, setAssetsList] = useState([
    { asset_type: "", asset_number: "", date_issued: "", date_returned: "" },
  ]);
  const [assetId, setAssetId] = useState("");
  const [accordion, setAccordion] = useState(0);
  const dispatch = useDispatch();
  const organization_id = useSelector(
    (state) => state.auth?.userDetails?.organization_id
  );
  const { id } = useParams();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(async () => {
    if (id) {
      getEmployees(
        `?_id=${id}`,
        (data) => {
          setUserDetails(data?.data[0]);
          getAssets(
            `?user_id=${data?.data[0]?._id}&organization_id=${data?.data[0]?.organization_id}`,
            (data) => {
              console.log(userDetails, "detailsss");
              console.log(data, "dataaaa");
              if (data?.data?.length > 0) {
                setAssetsList(data?.data);
              }
            },
            () => {
              window.alert("not found");
            }
          );
        },
        () => {}
      );
    }
  }, []);

  return (
    <>
      <CCol xs="12" sm="12" className="mt-4">
        <CCard>
          <Formik
            enableReinitialize
            initialValues={{
              assets: assetsList,
            }}
            validationSchema={assetsValidation}
            onSubmit={async (values) => {
              // setActive(1);
              dispatch({ type: SET_LOADER, payload: true });
              console.log(values, "values");
              mapSeries(
                values?.assets,
                (item, async_callback) => {
                  console.log(item);
                  if (item?.asset_number) {
                    console.log(item, "item");
                    addAssets(
                      {
                        user_id: userDetails?._id,
                        organization_id: userDetails?.organization_id,
                        asset: item,
                      },
                      async_callback
                    );
                  }
                },
                (err, result) => {
                  console.log(err, result, "async_callback");
                  dispatch({ type: SET_LOADER, payload: false });
                  if (!err) {
                    history.push("/dashboard");
                    dispatch({ type: SET_LOADER, payload: false });
                    enqueueSnackbar("Saved.", {
                      variant: "success",
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                    });
                  }
                }
              );
            }}
          >
            {({ errors, touched, values, setFieldValue, resetForm }) => {
              const setAccordionFunction = (index) => {
                setAccordion(
                  accordion === parseInt(index) ? null : parseInt(index)
                );
              };

              return (
                <Form>
                  <CCardBody>
                    {assetsList.map((data, index) => {
                      return (
                        <AssetsForm
                          setFieldValue={setFieldValue}
                          setAccordianFunction={setAccordionFunction}
                          values={values}
                          assetsList={assetsList}
                          setAssetsList={setAssetsList}
                          index={index}
                          errors={errors}
                          touched={touched}
                          accordion={accordion}
                          disabled={isDisabled}
                        />
                      );
                    })}

                    <CButton
                      onClick={() => {
                        resetForm();
                        setActive(5);
                      }}
                      color="primary"
                      className="mr-2 mb-3"
                      color="primary"
                      style={{ bottom: 2, position: "absolute" }}
                    >
                      Previous
                    </CButton>
                    <div className="d-flex flex-column float-right">
                      {isDisabled ? null : (
                        <CButton
                          onClick={() => {
                            setAssetsList([
                              ...values?.assets,
                              {
                                asset_type: "",
                                asset_number: "",
                                date_issued: "",
                                date_returned: "",
                              },
                            ]);
                          }}
                          color="primary"
                          className="align-self-end my-3"
                        >
                          +
                        </CButton>
                      )}

                      <SimpleButton
                        title="Save"
                        color="primary"
                        className="mb-3"
                        type="submit"
                      />
                    </div>
                  </CCardBody>
                </Form>
              );
            }}
          </Formik>
        </CCard>
      </CCol>
    </>
  );
}

export default Assets;
