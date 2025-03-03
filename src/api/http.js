import axios from 'axios'

axios.defaults.withCredentials = true; // 요청 시 쿠키 포함

let shoppingApiUrl = 'http://192.168.0.17:9000';

const http = axios.create({
    baseURL: shoppingApiUrl,
    timeout: 5000,
    withCredentials: true,
})

export const getRequest = async (url, params = {}) => {
    let response = await http.get(url, { params });
    let data = response.data;
    return {
        status: data.status,
        message: data.message,
        data: data.data,
        errorDetails: data.errorDetails,
        timestamp: data.timestamp
    };
}

export const getAsyncRequest = async (url, params = {}) => {
    let response = await http.get(url, {params});
    return response.data;
}

export const postRequest = (url, data = {}) => {
    return http.post(url, data)
}

export const postAsyncRequest = async (url, data = {}) => {
    let response = await http.post(url, data);
    return response.data;
}

export default http
