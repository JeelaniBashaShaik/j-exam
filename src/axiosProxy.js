const axios = require('axios');
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['x-access-token'] = localStorage.getItem('incExamAccessToken');
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default axios;