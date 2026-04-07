import React from 'react'

const NewsItem = ({ article, onClick }) => {
  const { title, description, publishedAt, urlToImage, url } = article

  return (
    <div className="news-item">
        <div className="photo" onClick={onClick}>
            <img src={urlToImage || 'https://via.placeholder.com/150'} alt={title} />
        </div>
        <div className="desc">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{publishedAt ? new Date(publishedAt).toLocaleDateString('ko-KR') : ''}</p>
        </div>
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer">원문보기</a>
        </div>
    </div>
  )
}

export default NewsItem
