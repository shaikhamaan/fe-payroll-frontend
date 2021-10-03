import * as yup from "yup";
const { default: validations } = require("src/utils/validations");

const identityValidation = yup.object().shape({
  Aadhar: yup.object().shape(
    {
      number: yup
        .string()
        .matches(
          validations?.aadhar_number,
          "Please enter a valid Aadhar Number"
        )
        .when(["image"], {
          is: (image) => (image ? true : false),
          then: yup.string().required("Please enter Aadhar Number"),
          otherwise: yup.string(),
        }),
      image: yup.mixed().when(["number", "filePath"], {
        is: (number, filename) => (number && !filename ? true : false),
        then: yup.mixed().required("Aadhar Image is required"),
        otherwise: yup.string(),
      }),
    },
    ["number", "image"]
  ),
  PAN: yup.object().shape({
    number: yup
      .string()
      .matches(validations?.pan_number, "Please enter a valid PAN Number").when(["image"], {
        is: (image) => (image ? true : false),
        then: yup.string().required("Please enter PAN Number"),
        otherwise: yup.string(),
      }),
    image: yup.mixed().when(["number", "filePath"], {
      is: (number, filename) => (number && !filename ? true : false),
      then: yup.mixed().required("PAN Image is required"),
    }),
  }, ["number", "image"]),
  "Driving License": yup.object().shape({
    number: yup
      .string()
      .matches(
        validations?.driving_license,
        "Please enter a valid Driving License Number"
      ).when(["image"], {
        is: (image) => (image ? true : false),
        then: yup.string().required("Please enter Driving License Number"),
        otherwise: yup.string(),
      }),
    image: yup.mixed().when(["number", "filePath"], {
      is: (number, filename) => (number && !filename ? true : false),
      then: yup.mixed().required("Driving License Image is required"),
    }),
  }, ["number", "image"]),
  PF: yup.object().shape({
    number: yup.string()
  }),
  "Vehicle Number": yup.object().shape({
    number: yup
      .string()
      .matches(
        validations?.vehicle_number,
        "Please enter a valid Vehicle Number"
      ),
  }),
});

export default identityValidation;
