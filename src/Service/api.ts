import axios from 'axios';

//https://api-mlevada.herokuapp.com
const APIURL = 'https://api-mlevada.herokuapp.com';
const api = axios.create({
    baseURL: APIURL,
    validateStatus: (status) => {
        return true;
      }
});
export { APIURL };
export default api;

