import * as yup from "yup";
import validations from "./validations";

const yupValidations = {
  alphabets: yup
    .string()
    .matches(
      validations.alphabets,
      "This field only accepts alphabets and spaces"
    ),
  alphaNumeric: yup
    .string()
    .matches(
      validations.alpha_numeric,
      "This field only accepts alpha-numeric values"
    ),
  alphabetsRequired: yup
    .string()
    .required("This field is required")
    .matches(
      validations.alphabets,
      "This field only accepts alphabets and spaces"
    ),
  alphaNumericRequired: yup
    .string()
    .required("This field is required")
    .matches(
      validations.alpha_numeric,
      "This field only accepts alpha-numeric values"
    ),
  emailRequired: yup
    .string()
    .required("Email is required")
    .matches(validations.email, "Please enter a valid email address."),
  email: yup
    .string()
    .matches(validations.email, "Please enter a valid email address."),
  phoneNumberRequired: yup
    .string()
    .required("Mobile is required")
    .test(
      "phoneNumberRequired-test",
      "Please enter a valid number",
      async (value = "") => {
        if (value?.slice(0, 3).toString() === "+91") {
          if (
            validations.indian_phone_number.test(value) &&
            value?.length === 13
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (validations.phone_number.test(value)) {
          return true;
        } else {
          return false;
        }
      }
    ),
  // .matches(validations.phone_number, "Please enter a valid phone number"),

  phoneNumber: yup
    .string()
    .test(
      "phoneNumberRequired-test",
      "Please enter a valid number",
      async (value = "") => {
        if (!value) {
          return true;
        }
        if (value?.slice(0, 3).toString() === "+91") {
          if (
            validations.indian_phone_number.test(value) &&
            value?.length === 13
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (validations.phone_number.test(value)) {
          return true;
        } else {
          return false;
        }
      }
    ),
  nameRequired: yup.string().required("Last name is required"),
  name: yup.string(),
  number: yup
    .string()
    .matches(validations.number, "This value must be a Number"),
  numberRequired: yup
    .string()
    .required("This field is required")
    .matches(validations.number, "This value must be a Number"),
  noSpace: yup
    .string()
    .required("This field is required")
    .matches(validations.noSpace, "Please enter a valid value"),
};
export default yupValidations;
