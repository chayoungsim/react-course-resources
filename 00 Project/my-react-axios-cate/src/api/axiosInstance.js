import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

export default axiosInstance
