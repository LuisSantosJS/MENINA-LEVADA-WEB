import axios from 'axios';

//https://api-mlevada.herokuapp.com
const APIURL = 'https://api-mlevada.herokuapp.com';
const api = axios.create({
    baseURL: APIURL,
    validateStatus: (status) => {
        return true;
      },
      headers: { 
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
});
export { APIURL };
export default api;

