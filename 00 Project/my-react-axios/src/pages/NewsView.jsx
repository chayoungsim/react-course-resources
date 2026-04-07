import { useLocation, useNavigate } from 'react-router-dom'

const NewsView = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const article = location.state?.article

  if (!article) {
    return (
      <div>
        <p>뉴스 정보를 불러올 수 없습니다.</p>
        <button onClick={() => navigate('/')}>목록으로 돌아가기</button>
      </div>
    )
  }

  const { title, description, content, urlToImage, publishedAt, url, source } = article

  return (
    <div className="news-view">
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>

      <h1>{title}</h1>

      <div className="news-meta">
        <span>{source?.name}</span>
        <span>{publishedAt ? new Date(publishedAt).toLocaleDateString('ko-KR') : ''}</span>
      </div>

      {urlToImage && (
        <img src={urlToImage} alt={title} className="news-image" />
      )}

      <p className="news-description">{description}</p>
      <p className="news-content">{content}</p>

      <a href={url} target="_blank" rel="noopener noreferrer">
        원문 전체 읽기
      </a>
    </div>
  )
}

export default NewsView
