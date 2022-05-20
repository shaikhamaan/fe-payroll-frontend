const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getDate = () => {
  const date = new Date();
  var formattedDate = "";
  formattedDate += date.getDate().toString();
  formattedDate += "-";
  formattedDate += monthNames[date.getMonth()];
  formattedDate += "-";
  formattedDate += date.getFullYear().toString();
  return formattedDate;
};
const columns = [
  { label: "type", value: (row) => "N" },
  { label: "amount", value: "total_salary" },
  { label: "date_of_transfer", value: (row) => getDate() },
  { label: "beneficiary_name", value: "employee_name" },
  { label: "beneficiary_account", value: "bank_account_no" },
  { label: "owner", value: (row) => "ranjeet@freshexpress.in" },
  { label: "owner_account", value: (row) => "167010200004367" },
  { label: "ifsc_code", value: "bank_ifsc_code" },
  { label: "value", value: (row) => "10" },
];
const columns2 = [
  { label: "", value: (row) => "N" },
  { label: "", value: "total_salary" },
  { label: "", value: (row) => getDate() },
  { label: "", value: "employee_name" },
  { label: "", value: "bank_account_no" },
  { label: "", value: (row) => "ranjeet@freshexpress.in" },
  { label: "", value: (row) => "167010200004367" },
  { label: "", value: "bank_ifsc_code" },
  { label: "", value: (row) => "10" },
];

export { columns };

// get -> organization_id
// add -> organization_id, resignation :{noticePeriodDays: }
