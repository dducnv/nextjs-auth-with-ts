import axios from 'axios';
import queryString from 'query-string';

const axiosConfig = axios.create({
    baseURL: "/api",
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosConfig.interceptors.request.use(async (config) => {
// Handle token here ...
    return config;
})
axiosConfig.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
// Handle errors
    throw error;
});
export default axiosConfig;
