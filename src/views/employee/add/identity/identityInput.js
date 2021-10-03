import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CRow,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CInput,
  CInputGroup,
  CLabel,
} from "@coreui/react";
import CustomModal from "src/components/modal";
import Select from "src/components/formFields/select";
import FilePicker from "src/components/formFields/filePicker";
import { deleteUserDocument, getPresignedUrl } from "../api";
import { useParams } from "react-router";
import Colors from "src/constants/colors";
import SimpleReactLightbox from "simple-react-lightbox";

const IdentityInput = ({
  item,
  index,
  errors,
  touched,
  values,
  setFieldValue,
  title = "asd",
  required,
  disabled
}) => {
  const { id } = useParams();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (item?.filePath) {
      getPresignedUrl(item?.filePath, (data) => {
        if (data?.status === "success") {
          setImageUrl(data?.url);
        }
      });
    }
  }, []);

  return (
    <CCol className="mt-2">
      {title ? (
        <CLabel>
          {item?.type} {required ? "*" : null}
        </CLabel>
      ) : null}
      <CFormGroup row className="my-0">
        <CCol xs="12" lg="6">
          <CInput
            value={values?.docs[index]?.number}
            onChange={(e) => {
              setFieldValue(`docs[${index}].number`, e.target.value);
            }}
            id="input3-group3"
            name="input3-group3"
            placeholder="Enter number..."
            disabled={disabled}
          />
          {errors && errors[item?.type]?.number ? (
            <CLabel style={{ color: "red" }}>
              {errors[item?.type]?.number}
            </CLabel>
          ) : null}
        </CCol>
        {true ? (
          <CCol xs="12" lg="6">
            <SimpleReactLightbox>
              <FilePicker
                imageName={values?.docs[index]?.filePath}
                url={imageUrl}
                onFileSelect={(e) => {
                  setFieldValue(`docs[${index}].image`, e);
                }}
                disabled={disabled}
              />
            </SimpleReactLightbox>
            {errors[item?.type]?.image ? (
              <CLabel style={{ color: "red" }}>
                {errors[item?.type]?.image}
              </CLabel>
            ) : null}
          </CCol>
        ) : null}

        <CustomModal
          setIsModalVisible={setDeleteModalVisible}
          secondaryCtaFunction={() => {
            setDeleteModalVisible(false);
          }}
          title={"Delete"}
          isModalVisible={deleteModalVisible}
          primaryCtaFunction={() => {
            setModalLoader(true);
            if (item?._id) {
              deleteUserDocument(item?._id, () => {
                let newValues = values?.docs;
                newValues.splice(index, 1);
                setFieldValue("docs", newValues);
                setDeleteModalVisible(false);
                setModalLoader(true);
              });
            } else {
              let newValues = values?.docs;
              newValues.splice(index, 1);
              setFieldValue("docs", newValues);
              setDeleteModalVisible(false);
            }
          }}
          primaryText={"Delete"}
          secondaryText="Cancel"
          innerText={`Do you want to delete this`}
          loader={modalLoader}
        />
      </CFormGroup>
    </CCol>
  );
};

export default IdentityInput;
