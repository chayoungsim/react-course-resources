import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { favoriteArticle, unfavoriteArticle } from "@/api/articles";

interface FavoriteButtonProps {
    slug: string;
    count: number;
    favorited: boolean;
}

export function FavoriteButton({ slug, count, favorited }: FavoriteButtonProps) {
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const [liked, setLiked] = useState(favorited)
    const [likeCount, setLikeCount] = useState(count)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        if (!user) {
            navigate('/login')
            return
        }
        if (loading) return

        // 낙관적 업데이트
        const prevLiked = liked
        const prevCount = likeCount
        setLiked(!liked)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)

        setLoading(true)
        try {
            const updated = liked
                ? await unfavoriteArticle(slug)
                : await favoriteArticle(slug)
            // 서버 응답값으로 정확하게 동기화
            setLiked(updated.favorited)
            setLikeCount(updated.favoritesCount)
        } catch {
            // API 실패 시 원래 상태로 복원
            setLiked(prevLiked)
            setLikeCount(prevCount)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`${liked ? 'btn-primary' : 'btn-secondary'} disabled:opacity-50`}
        >
            ♥ {likeCount}
        </button>
    )
}
