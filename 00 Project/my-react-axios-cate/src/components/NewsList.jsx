import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import { fetchNews } from "../api/news";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const newsArticles = await fetchNews(category);
                setArticles(newsArticles);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        };
        loadNews();
    }, [category]);

    // 로딩 중일 때
    if (loading) {
        return <NewsListBlock>로딩 중...</NewsListBlock>;
    }

    // 아직 articles 값이 설정되지 않았거나, 빈 배열일 경우
    if (articles.length === 0) {
        return <NewsListBlock>표시할 뉴스가 없습니다.</NewsListBlock>;
    }

    return (
        <NewsListBlock>
            {articles.map((article) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;
