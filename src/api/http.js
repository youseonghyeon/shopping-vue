import axios from 'axios'
import qs from 'qs';

axios.defaults.withCredentials = true; // 요청 시 쿠키 포함

let shoppingApiUrl = '/api';

const http = axios.create({
    baseURL: shoppingApiUrl,
    timeout: 5000,
    withCredentials: true,
})

export const getRequest = async (url, params = {}, useAuthorizationExceptionAlert = true) => {
    try {
        let response = await http.get(url, {
            params,
            paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
        });
        let data = response.data;
        return {
            status: data.status,
            message: data.message,
            data: data.data,
            errorDetails: data.errorDetails,
            timestamp: data.timestamp
        };
    } catch (error) {
        if (useAuthorizationExceptionAlert && error.response.status === 401) {
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        }
        console.error("GET 요청 오류:", error);
    }
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
