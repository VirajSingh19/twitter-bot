const axios = require("axios");
const {twitterApi} = require("../Constants");

// twitter API version 1.1
const twitterV1 = axios.create({
    baseURL: twitterApi.v1
});

// twitter API version 2
const twitterV2 = axios.create({
    baseURL: twitterApi.v2
});



// setting bearer header in the request interceptor
twitterV1.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + process.env.Bearer;
    return config;
});



// setting bearer header in the request interceptor
twitterV2.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + process.env.Bearer;
    return config;
});


module.exports = {
    twitterV1,
    twitterV2
};