import axios from "axios";

const list = () => axios.get("/polls");
const create = payload => axios.post("/polls/", payload);
const show = id => axios.get(`/polls/${id}`);
const update = ({ id, payload }) => axios.put(`polls/${id}`, payload);

const pollsApi = {
  list,
  create,
  show,
  update,
};

export default pollsApi;
