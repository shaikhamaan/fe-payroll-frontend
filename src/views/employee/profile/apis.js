import axios from "axios";

const getProfile = (id) => {
  return axios.get(`http://localhost:5000/employee/getdata/${id}`);
};

export { getProfile };
