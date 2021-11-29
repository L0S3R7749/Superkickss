//Custom JS code
const axios = require('axios');
const config = require('./axiosConfig');

exports.callApi = (endpoint,method = 'GET',body)=>{
    return axios({
        method: method,
        url: `${config}/${endpoint}`,
        data: body
    });
}