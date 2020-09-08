import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apimlevada-com-br.umbler.net'
}); 

export default api;