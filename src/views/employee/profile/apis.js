import axios from "axios";

const getProfile = (id) => {
  return axios.get(
    `https://freshexp-server.herokuapp.com/employee/getdata/${id}`
  );
};

export { getProfile };
