"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SubContainer from "@/components/layout/SubContainer";
import SubVisual from "@/components/layout/SubVisual";
import NewsItem from "@/components/newsroom/NewsItem";
import Categories from "@/components/newsroom/Categories";

// Article을 base64로 인코딩하는 함수
const encodeArticle = (article: Article): string => {
    return btoa(encodeURIComponent(JSON.stringify(article)));
};

// Title을 URL-safe slug로 변환하는 함수
const titleToSlug = (title: string): string => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-").substring(0, 50));
};

interface NewsAPIArticle {
    title: string;
    description: string;
    urlToImage: string | null;
    url: string;
    source: {
        name: string;
    };
    publishedAt: string;
}

interface Article {
    title: string;
    description: string;
    image_url: string | null;
    url: string;
    source: {
        name: string;
    };
    publishedAt: string;
}

interface NewsAPIResponse {
    articles: NewsAPIArticle[];
    totalResults: number;
    status: string;
}


export default function NewsroomPage(): React.ReactNode {
    const router = useRouter();
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("general");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
                if (!apiKey || apiKey === "your_api_key_here") {
                    setError("API 키가 설정되지 않았습니다. .env.local 파일에서 설정해주세요.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get<NewsAPIResponse>(
                    "https://newsapi.org/v2/top-headlines",
                    {
                        params: {
                            category: activeCategory,
                            country: "us",
                            apiKey: apiKey,
                        },
                    }
                );

                const transformedArticles: Article[] = response.data.articles.map((article: NewsAPIArticle) => ({
                    title: article.title,
                    description: article.description,
                    image_url: article.urlToImage,
                    url: article.url,
                    source: {
                        name: article.source.name,
                    },
                    publishedAt: article.publishedAt,
                }));

                setNews(transformedArticles);
            } catch (err) {
                const errorMessage = axios.isAxiosError(err)
                    ? err.response?.data?.message || "뉴스 데이터를 가져올 수 없습니다."
                    : err instanceof Error
                    ? err.message
                    : "알 수 없는 오류 발생";
                setError(errorMessage);
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [activeCategory]);

    const handleNewsClick = (article: Article) => {
        // 기사 데이터를 base64로 인코딩하여 URL에 포함
        const slug = titleToSlug(article.title);
        const encodedData = encodeArticle(article);
        router.push(`/newsroom/${slug}?data=${encodedData}`);
    };

    return (
        <SubContainer>
            <h1>Newsroom</h1>
            <SubVisual
                type="image"
                src="/assets/images/calltoaction.jpg"
                title="Contact"
            />
            <div className="static">
                <Categories active={activeCategory} onChange={setActiveCategory} />

                {loading && <p style={{ marginTop: "2rem", textAlign: "center" }}>로딩 중...</p>}
                {error && <p style={{ marginTop: "2rem", color: "red", textAlign: "center" }}>{error}</p>}

                {!loading && !error && (
                    <section className="news-items" style={{ marginTop: "2rem" }}>
                        {news.length > 0 ? (
                            news.map((article: Article, index: number) => (
                                <NewsItem
                                    article={article}
                                    key={index}
                                    onClick={() => handleNewsClick(article)}
                                />
                            ))
                        ) : (
                            <p style={{ textAlign: "center" }}>뉴스가 없습니다.</p>
                        )}
                    </section>
                )}
            </div>
        </SubContainer>
    );
}   