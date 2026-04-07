import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NewsItem from '../components/NewsItem'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`

const NewsLists = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await axios.get(API_URL)
        setArticles(response.data.articles)
      } catch (err) {
        setError('뉴스를 불러오는 데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleItemClick = (article, index) => {
    navigate(`/news/${index}`, { state: { article } })
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="news-list">
      <h1>오늘의 뉴스</h1>
      {articles.map((article, index) => (
        <NewsItem
          key={index}
          article={article}
          onClick={() => handleItemClick(article, index)}
        />
      ))}
    </div>
  )
}

export default NewsLists
