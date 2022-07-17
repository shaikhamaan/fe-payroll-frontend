import axios from "axios";

const dayReport = (data) => {
  return axios.post("https://freshexp-server.herokuapp.com/reports/day", data);
};

const monthReprt = (data) => {
  return axios.post(
    "https://freshexp-server.herokuapp.com/reports/month",
    data
  );
};

export { dayReport, monthReprt };
