import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3002', // 기본 주소 설정
  timeout: 5000, // 5초 이상 걸리면 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api;