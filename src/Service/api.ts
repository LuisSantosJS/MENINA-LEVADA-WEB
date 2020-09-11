import axios from 'axios';
const APIURL = 'https://api-mlevada.herokuapp.com';
const api = axios.create({
    baseURL: APIURL
});
export { APIURL };
export default api;

