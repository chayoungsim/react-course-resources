import axios from 'axios'
import { useAuthStore } from '@/store/authStore'


/* 1. 인스턴스 생성성 */
export const apiClient = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

/* 2. 요청 : JWT자동첨부*/
apiClient.interceptors.request.use(
    (config) => {
      // 스토어에서 현재 토큰 읽기 (.getState() = 훅 없이 접근)
      const token = useAuthStore.getState().user?.token
  
      if (token) {
        config.headers.Authorization = `Token ${token}`
      }
      //  토큰 없으면 헤더 추가 안 함 → 비로그인 요청으로 처리됨
  
      return config  // ← 반드시 return 해야 요청이 진행됨
    },
    (error) => Promise.reject(error)
  )

/* 3. 응답 : 공통 에러 처리 */
  apiClient.interceptors.response.use(
    // 성공 (2xx): 그대로 통과
    (response) => response,
  
    // 실패 (4xx, 5xx)
    (error) => {
      const status = error.response?.status
  
      if (status === 401) {
        // 토큰 만료 or 인증 실패 → 자동 로그아웃
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
  
      if (status === 403) {
        // 권한 없음 (다른 사람 글 삭제 시도 등)
        console.warn('접근 권한이 없습니다.')
      }
  
      if (status === 404) {
        // 존재하지 않는 리소스
        console.warn('리소스를 찾을 수 없습니다.')
      }
  
      // 에러를 그대로 던져야 각 API 호출부에서 catch 가능
      return Promise.reject(error)
    }
  )