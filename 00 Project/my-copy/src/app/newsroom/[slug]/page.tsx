"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SubContainer from "@/components/layout/SubContainer";

interface Article {
    title: string;
    description: string;
    image_url: string | null;
    url: string;
    source: {
        name: string;
    };
    publishedAt: string;
    content?: string;
}

interface NewsDetailPageProps {
    params: {
        slug: string;
    };
}

// base64로 인코딩된 Article을 디코딩하는 함수
const decodeArticle = (encodedData: string): Article | null => {
    try {
        const decodedStr = decodeURIComponent(atob(encodedData));
        return JSON.parse(decodedStr);
    } catch {
        return null;
    }
};

// Title을 URL-safe slug로 변환하는 함수
const titleToSlug = (title: string): string => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-").substring(0, 50));
};

export default function NewsDetailPage({ params }: NewsDetailPageProps): React.ReactNode {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            // URL query parameter에서 기사 데이터 가져오기
            const encodedData = searchParams.get("data");

            if (encodedData) {
                const decodedArticle = decodeArticle(encodedData);
                if (decodedArticle) {
                    setArticle(decodedArticle);
                } else {
                    setError("기사 데이터를 파싱할 수 없습니다. 목록에서 다시 선택해주세요.");
                }
            } else {
                setError("기사 데이터를 찾을 수 없습니다. 목록에서 다시 선택해주세요.");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류 발생";
            setError(errorMessage);
            console.error("Error loading article:", err);
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    if (loading) {
        return (
            <SubContainer style={{ padding: "4rem 2rem", textAlign: "center" }}>
                <div className="static">
                    <p>로딩 중...</p>
                </div>
            </SubContainer>
        );
    }

    if (error || !article) {
        return (
            <SubContainer>
                <div className="static">
                    <p style={{ color: "red", marginBottom: "2rem" }}>{error || "기사를 찾을 수 없습니다."}</p>
                    <Link href="/newsroom">
                        <button
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#007ac9",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            뉴스 목록으로 돌아가기
                        </button>
                    </Link>
                </div>
            </SubContainer>
        );
    }

    return (
        <SubContainer>
            <div className="static">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => router.back()}
                    style={{
                        padding: "0.5rem 1rem",
                        marginBottom: "2rem",
                        backgroundColor: "transparent",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        color: "#007ac9",
                    }}
                >
                    ← 뒤로가기
                </button>

                {/* 기사 제목 */}
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                    {article.title}
                </h1>

                {/* 기사 정보 */}
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "2rem",
                        color: "#666",
                        fontSize: "0.9rem",
                    }}
                >
                    <span>{article.source.name}</span>
                    <span>•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString("ko-KR")}</span>
                </div>

                {/* 기사 이미지 */}
                {article.image_url && (
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "400px",
                            marginBottom: "2rem",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* 기사 본문 */}
                <div style={{ lineHeight: "1.8", fontSize: "1.1rem", marginBottom: "2rem" }}>
                    <p style={{ marginBottom: "1rem" }}>{article.description}</p>
                    {article.content && <p>{article.content}</p>}
                </div>

                {/* 원문 보기 버튼 */}
                <div style={{ marginBottom: "2rem" }}>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "#007ac9",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                        }}
                    >
                        원문 보기 →
                    </a>
                </div>

                {/* 목록으로 돌아가기 */}
                <Link href="/newsroom">
                    <button
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "transparent",
                            color: "#007ac9",
                            border: "1px solid #007ac9",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        뉴스 목록으로 돌아가기
                    </button>
                </Link>
            </div>
        </SubContainer>
    );
}
