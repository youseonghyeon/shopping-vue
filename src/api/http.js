import axios from 'axios'
import qs from 'qs';

axios.defaults.withCredentials = true; // 요청 시 쿠키 포함

let shoppingApiUrl = '/api';

const http = axios.create({
    baseURL: shoppingApiUrl,
    timeout: 20000,
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
        throw error
    }
}

export const getAsyncRequest = async (url, params = {}, useAuthorizationExceptionAlert = true) => {
    try {
        let response = await http.get(url, {params});
        return response.data;
    } catch (error) {
        if (useAuthorizationExceptionAlert && error.response.status === 401 || error.response.status === 403) {
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        }
        throw error;
    }
}

export const postRequest = async (url, data = {}, useAuthorizationExceptionAlert = true) => {
    return await http.post(url, data)

}

export default http
