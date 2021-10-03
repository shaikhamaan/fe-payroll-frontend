import validations from "src/utils/validations";
import yupValidations from "src/utils/yup-validations";
import * as yup from "yup";
import { getEmployees, isEmployeeExist } from "./api";
import { useState } from "react";

const basicDetailsValidation = yup.object().shape({
  employee_code: yup
    .string()
    .required("Employee code is required")
    .test(
      "unique-test-code",
      "Employee code already exist",
      async (value = "", context) => {
        // let isValid;
        // if (context) {
        //   const data = await isEmployeeExist("employee_code", value, context);
        //   isValid = data;
        // }
        // return isValid;
        console.log(value, "uff");
        var isValid;
        var data = await getEmployees(
          _id
            ? `?_id=${_id}&employee_code=${value}&organization_id=${context?.parent?.organization_id}`
            : `?employee_code=${value}&organization_id=${context?.parent?.organization_id}`
        );
        var _id = context?.parent?._id;
        if (data?.data?.length > 0) {
          console.log("I am here");
          if (data?.data[0]?._id === _id) {
            isValid = true;
          } else {
            isValid = false;
          }
        } else {
          isValid = true;
        }
        console.log(isValid, "valid");
        return isValid;
      }
    ),
  first_name: yupValidations?.alphabetsRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  middle_name: yupValidations?.alphabets,
  last_name: yupValidations?.alphabetsRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  dob: yup.date().required("Date of birth is required"),
  employement_status: yup.string().required("Status is required"),
  gender: yup.string().required("Gender is required"),
  street: yup
    .string()
    .required("Street is required")
    .matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
  city: yupValidations.alphabetsRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  state: yupValidations.alphabetsRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  postal_code: yup.string().when(["country"], {
    is: (country) => {
      if (country === "India") {
        return true;
      } else {
        return false;
      }
    },
    then: yup
      .string()
      .required("Postal code is required")
      .matches(validations.postal_code, "Please enter a valid postal code"),
    otherwise: yup.string().required("Postal code is required"),
    state: yupValidations.alphabetsRequired.matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
    country: yupValidations.alphabetsRequired.matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
  }),
});

const bankDetailsValidation = yup.object().shape({
  bank_name: yup
    .string()
    .required("Bank name is required")
    .matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
  ifsc_code: yup
    .string()
    .required("IFSC Code is required")
    .matches(validations.ifsc_code, "Please enter a valid IFSC Code"),
  account_number: yup
    .string()
    .required("account number is required")
    .matches(validations?.accountNumber, "Account number must be a number"),
});

const emergencyContactValidation = yup.object().shape({
  emergency_contact: yup.object().shape({
    first_name: yupValidations?.alphabetsRequired.matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
    middle_name: yupValidations?.alphabets,
    last_name: yupValidations?.alphabetsRequired.matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
    email: yup
      .string()
      // .required("Email is required")
      .matches(validations.email, "Please enter a valid email address."),
    mobile: yupValidations?.phoneNumberRequired,
    relationship: yup.string().required("Relationship is required"),
  }),
});

const jobDetailsValidation = yup.object().shape({
  level: yupValidations?.alphaNumericRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  designation: yupValidations?.alphaNumericRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  department: yupValidations?.alphaNumericRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  team: yupValidations?.alphaNumeric.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  role: yupValidations?.alphaNumericRequired.matches(
    validations?.noSpace,
    "Spaces are not allowed at the beginning and Last"
  ),
  // manager_id: yupValidations?.alphaNumericRequired,
  date_of_joining: yup?.date()?.required("Date of joining is required"),
});

const communicationValidation = yup.object().shape({
  phone_number: yupValidations.phoneNumberRequired,
  other_phone_number: yupValidations.phoneNumber,
  personal_email: yup
    .string()
    .matches(validations.email, "Please enter a valid email address.")
    .matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    ),
  office_email: yup
    .string()
    .required("Office email is required")
    .matches(validations.email, "Please enter a valid email address.")
    .matches(
      validations?.noSpace,
      "Spaces are not allowed at the beginning and Last"
    )
    .test(
      "unique-email-test",
      "Email already exists",
      async (value = "", context) => {
        var isValid;
        var data = await getEmployees(`?office_email=${value}`);
        var _id = context?.parent?._id;
        if (data?.data?.length > 0) {
          if (data?.data[0]?._id === _id) {
            isValid = true;
          } else {
            isValid = false;
          }
        } else {
          isValid = true;
        }

        return isValid;
      }
    ),
});

const assetsValidation = yup.object().shape({
  assets: yup.array().of(
    yup.object().shape({
      asset_type: yup
        .string()
        .required("Asset type is required")
        .matches(
          validations?.noSpace,
          "Spaces are not allowed at the beginning and Last"
        ),
      asset_number: yup
        .string()
        .required("Asset number is required")
        .matches(
          validations?.noSpace,
          "Spaces are not allowed at the beginning and Last"
        ),
      date_issued: yup.date().required("Date is required"),
      // date_returned: yup.date().required("Return Date is required"),
    })
  ),
});

const identityValidation = yup.object().shape({
  docs: yup.array().of(
    yup.object().shape({
      details: yup.object().shape({
        number: yup
          .string()
          .required("Number is required")
          .test(
            "unique-testttt",
            "Please enter a valid number",
            async (value = "", { parent }) => {
              console.log(parent, "assxjksahcd");
            }
          ),
      }),
      image: yup.string().when("filename", {
        is: "",
        then: yup.object().required("Image is required"),
      }),
    })
  ),
});

// const identityValidation = yup.object().shape({
//   docs: yup.array().of(
//     yup.object().test("asd", "asd", (value, {createError}) => {
//       let isValid;
//       if (
//         value?.type === "AADHAAR" &&
//         !validations.aadhar_number.test(value?.details?.number)
//       ) {
//         isValid = false;
//         createError({docs: {}})
//       } else {
//         isValid = true;
//       }

//       console.log(value);
//       // return false;
//     })
//   ),
// });

export {
  basicDetailsValidation,
  bankDetailsValidation,
  emergencyContactValidation,
  jobDetailsValidation,
  communicationValidation,
  identityValidation,
  assetsValidation,
};
