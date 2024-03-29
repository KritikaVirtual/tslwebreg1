import axios from 'axios';
import { API_URL } from '../../Config/config';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios.create({
    baseURL : API_URL,
    responseType: "json"
});