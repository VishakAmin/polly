import axios from "axios";

const create = payload => axios.post("/responses", payload);

const responsesApi = {
  create,
};

export default responsesApi;
