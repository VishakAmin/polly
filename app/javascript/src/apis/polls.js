import axios from "axios";

const list = () => axios.get("/polls");
const create = payload => axios.post("/polls/", payload);
const show = id => axios.get(`/polls/${id}`);
const update = ({ id, payload }) => axios.put(`polls/${id}`, payload);
const destroy = id => axios.delete(`/polls/${id}`);

const pollsApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default pollsApi;
