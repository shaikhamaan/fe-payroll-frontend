const validations = {
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  aadhar_number: /^\d{4}\d{4}\d{4}$/,
  pan_number: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  gst_number:
    /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/,
  ifsc_code: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  //pf_number: ^([A-Z]{2}/\d{5}/\d{7})*$,
  vehicle_number: /[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}/,
  driving_license:
    /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
  number: /^[0-9]+$/,
  accountNumber: /^\d{9,18}$/,
  password:
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
  postal_code: /^[1-9][0-9]{5}$/,
  phone_number: /^\+[1-9]{1}[0-9]{3,14}$/,
  indian_phone_number:
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
  alpha_numeric: /^[a-zA-Z0-9 _-]*$/gm,
  alphabets: /^[a-zA-Z ]*$/,
  noSpace: /^\S$|^\S[\s\S]*\S$/,
};

export default validations;
