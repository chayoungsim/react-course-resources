
import axiosInstance from './axiosInstance'

// 뉴스 API 연동을 위한 axios 인스턴스 생성
const newsApi = axiosInstance.create({
    baseURL: "https://newsapi.org/v2",
});

// API 키
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

/**
 * 카테고리에 맞는 최신 뉴스를 가져오는 함수
 * @param {string} category - 'business', 'entertainment', 'health', 'science', 'sports', 'technology' 등
 * @returns {Promise<Array>} 뉴스 기사 배열
 */
export const fetchNews = async (category = "general") => {
    try {
        const response = await newsApi.get("/top-headlines", {
            params: { country: "kr", category, apiKey: API_KEY },
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
