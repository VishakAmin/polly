import axios from "axios";

const create = payload => axios.post("/response", payload);

const responsesApi = {
  create,
};

export default responsesApi;
