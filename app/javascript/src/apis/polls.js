import axios from "axios";

const list = () => axios.get("/polls");
const create = payload => axios.post("/polls/", payload);
const show = id => axios.get(`/polls/${id}`);

const pollsApi = {
  list,
  create,
  show,
};

export default pollsApi;
