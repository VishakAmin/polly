import axios from "axios";

const signup = payload => axios.post("/users", payload);

const login = payload => axios.post("/sessions", payload);

const authApi = {
  login,
  signup,
};

export default authApi;
