import axios from 'axios';
import {API_NOTIFICATION_MESSAGES, SERVICE_URLS} from "../Constants/Config";
import { getType } from '../Utils/commonutil';
// import { getAccessToken } from '../Utils/Commonutils';

//                                          |+
// ==========================================  +                     <<<  IMPORTANT  >>>
// ADD THE URL IN CREATEPOST ALSO                + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +>   
// ==========================================  +                     <<<  CHANGE IT  >>>
//                                          |+

const API_URL = 'https://api.laqshya2k23.tech';
// const API_URL = 'https://laqshyaserver.onrender.com';
// const API_URL = 'http://localhost:8001';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
    
    

})

axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }else if(config.TYPE.query){
            config.url=config.url+'/'+config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (res) {
        return processResponse(res);
    },
    function (error) {
        return processError(error);
    }
)

const processResponse = (res) => {
    // console.log("process response got", res);

    if (res?.status === 200) {
        return { isSuccess: true, data: res.data }
    } else {
        return {
            isFailure: true,
            status: res?.status,
            msg: res?.msg,
            code: res?.code
        }
    }
}

const processError = (err) => {
    if (err.response) {
        // console.log("Error in response", err.response);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: err.response.status,
            errormsg: err.response.data.msg,
            valerror:err.response.data.valerror && err.response.data.valerror.length > 0 ? err.response.data.valerror[0] : err.response.data.msg
        }

    } else if (err.request) {
        // console.log("Error in request", err);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }

    } else {
        // console.log("Error in network", err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: "",
            
        }

    }

}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => axiosInstance({
        method: value.method,
        url: value.url,
        data: body,
        responseType: value.responseType,
        headers: {
            // Authorization: getAccessToken()
        },
        TYPE:getType(value,body),
        onUploadProgress: function (progressEvent) {
            if (showUploadProgress) {
                let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                showUploadProgress(percentageCompleted);
            }
        },
        onDownloadProgress: function (progressEvent) {
            if (showDownloadProgress) {
                let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                showDownloadProgress(percentageCompleted);
            }
        },
    })

}

export { API };