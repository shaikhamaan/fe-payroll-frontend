import axios from "axios";

const addReward = (data) => {
  return axios.post("https://freshexp-server.herokuapp.com/awards", data);
};

const getEmployees = () => {
  return axios.get("https://freshexp-server.herokuapp.com/employee");
};

export { addReward, getEmployees };
