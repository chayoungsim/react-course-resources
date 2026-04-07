
import axiosInstance from './axiosInstance'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const fetchTopHeadlines = async (country = 'us') => {
  try {
    const response = await axiosInstance.get('/top-headlines', {
      params: {
        country,
        apiKey: API_KEY
      }
    })
    return response.data.articles || []
  } catch (error) {
    console.error('Failed to fetch headlines:', error)
    throw error
  }
}

export const searchNews = async (q, language = 'en') => {
  try {
    const response = await axiosInstance.get('/everything', {
      params: {
        q,
        language,
        sortBy: 'publishedAt',
        apiKey: API_KEY
      }
    })
    return response.data.articles || []
  } catch (error) {
    console.error('Failed to search news:', error)
    throw error
  }
}
