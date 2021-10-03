const initialValues = {
  basic_details: {
    first_name: "",
    middle_name: "",
    last_name: "",
    work_location: "",
    dob: "",
    gender: "",
    employee_code: "",
    address: {
      street: "",
      city: "",
      postal_code: "",
      country: "",
    },
  },
  communication: {
    mobile_no: "",
    whatsapp_status: "",
    vehicle_group: "",
    mobile_relation: "",
  },
  // identity: [
  //   { type: "AADHAAR", details: { number: "" }, image: "" },
  //   { type: "PAN", details: { number: "" }, image: "" },
  // ],
  job_details: {
    aadhar_no: "",
    employee_photo: "",
    experience_status: "",
    years_of_experience: "",
    education: "",
    employee_grade: "",
  },

  emergency_contact: {
    emergency_contact: "",
    emergency_contact_no: "",
    emergency_person_relation: "",
  },
  bank_details: {
    bank_name: "",
    bank_ifsc_code: "",
    bank_account_no: "",
    bank_account_name: "",
    account_relation: "",
    bank_branch: "",
    passbook_photo: "",
  },
  // assets: {
  //   asset_type: "",
  //   asset_number: "",
  //   date_issued: "",
  // },
};
export default initialValues;
