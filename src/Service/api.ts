import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-mlevada.herokuapp.com/'
}); 

export default api;