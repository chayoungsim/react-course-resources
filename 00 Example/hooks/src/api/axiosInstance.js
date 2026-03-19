//axios 공통 설정
import axios from "axios";

const instance = axios.create({
    baseURL : 'https://jsonplaceholder.typicode.com',
    timeout : 5000,
    headers: {
        'Content-Type': 'application/json',
    }    
})

//모든 요청에 토큰 자동 첨부
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//응답
instance.interceptors.response.use(
    res => res,
    err => {
        if(err.response.status === 401) window.location.href = '/login'
        return Promise.reject(err)
    }
)

export default instance