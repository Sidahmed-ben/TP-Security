import axios from "axios";


export default  axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 10000,
  withCredentials: true,
  headers: {}
});





