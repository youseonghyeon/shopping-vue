import axios from 'axios'
import VueCookies from "vue-cookies";

axios.defaults.withCredentials = true; // 요청 시 쿠키 포함


const http = axios.create({
    baseURL: 'http://192.168.0.17:9000',
    timeout: 5000,
    withCredentials: true,
})

export const getRequest = (url, params = {}) => {
    return http.get(url, { params })
}

export const postRequest = (url, data = {}) => {
    return http.post(url, data)
}

export default http
