import axios from "axios";

const addReward = (data) => {
  return axios.post("http://localhost:5000/awards", data);
};

const getEmployees = () => {
  return axios.get("http://localhost:5000/employee");
};

export { addReward, getEmployees };
