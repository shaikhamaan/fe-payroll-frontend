// const identityInitailValues = [
//   { type: "AADHAAR", details: { number: "" }, image: "" },
//   { type: "PAN", details: { number: "" }, image: "" },

//   { type: "PF", details: { number: "" }, image: "" },
//   { type: "Driving License", details: { number: "" }, image: "" },
//   { type: "Vehicle Number", details: { number: "" } },
// ];

const identityInitialValues = {
  Aadhar: {
    type: "Aadhar",
    number: "",
    image: "",
  },
  PAN: {
    type: "PAN",
    number: "",
    image: "",
  },
  PF: {
    type: "PF",
    number: "",
    image: "",
  },
  "Driving License": {
    type: "Driving License",
    number: "",
    image: "",
  },
  "Vehicle Number": {
    type: "Vehicle Number",
    number: "",
    image: "",
  },
};

export default identityInitialValues;
