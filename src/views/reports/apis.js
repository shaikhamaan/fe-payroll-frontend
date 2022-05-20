import axios from "axios";

const dayReport = (data) => {
  return axios.post("http://localhost:5000/reports/day", data);
};

const monthReprt = (data) => {
  return axios.post("http://localhost:5000/reports/month", data);
};

export { dayReport, monthReprt };
