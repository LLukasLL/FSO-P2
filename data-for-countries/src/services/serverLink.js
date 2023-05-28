import axios from "axios";
const baseUrl = 'https://restcountries.com/v3.1/all'

const getty = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
}

export default { getty }