import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8877'
}); 

export default api;