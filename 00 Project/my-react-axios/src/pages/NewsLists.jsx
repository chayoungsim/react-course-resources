import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTopHeadlines } from '../api/newsApi'
import NewsItem from '../components/NewsItem'

const NewsLists = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchTopHeadlines('us')
        setArticles(data)
      } catch (err) {
        setError('뉴스를 불러오는 데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  const handleItemClick = (article, index) => {
    navigate(`/news/${index}`, { state: { article } })
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="news-list">
      <h1>오늘의 뉴스</h1>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <NewsItem
            key={index}
            article={article}
            onClick={() => handleItemClick(article, index)}
          />
        ))
      ) : (
        <div>뉴스가 없습니다.</div>
      )}
    </div>
  )
}

export default NewsLists
