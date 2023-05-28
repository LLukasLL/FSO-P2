import axios from "axios";
const baseUrl = './api/persons'

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(response => response.data);
}

const create = newObj => {
    const req = axios.post(baseUrl, newObj);
    return req.then(response => response.data);
}

const update = (id, newObj) => {
    const req = axios.put(`${baseUrl}/${id}`, newObj);
    return req.then(response => response.data);
}

const delInDB = id => {
  if (window.confirm('do you really want to delete this person?')) {
    axios.delete(`${baseUrl}/${id}`)
    return 'deleted';
  }
  return 'not deleted';
}

export default { getAll, create, update, delInDB }