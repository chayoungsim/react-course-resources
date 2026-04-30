import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fetchArticle } from '@/api/articles'
import { fetchComments, addComment, deleteComment } from '@/api/comments'
import type { Article, Comment } from '@/types'
import { useAuthStore } from '@/store/authStore'
import { FavoriteButton } from '@/components/article/FavoriteButton'
import { TagList } from '@/components/article/TagList'

const Articles = () => {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const [article, setArticle] = useState<Article | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [commentBody, setCommentBody] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return
        Promise.all([fetchArticle(slug), fetchComments(slug)])
            .then(([art, cmts]) => {
                setArticle(art)
                setComments(cmts)
            })
            .catch(() => setError('아티클을 불러오지 못했습니다.'))
            .finally(() => setLoading(false))
    }, [slug])

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) { navigate('/login'); return }
        if (!slug || !commentBody.trim()) return
        setSubmitting(true)
        try {
            const newComment = await addComment(slug, commentBody.trim())
            setComments((prev) => [newComment, ...prev])
            setCommentBody('')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteComment = async (commentId: number) => {
        if (!slug) return
        await deleteComment(slug, commentId)
        setComments((prev) => prev.filter((c) => c.id !== commentId))
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="text-[#91918c]">불러오는 중...</span>
            </div>
        )
    }

    if (error || !article) {
        return (
            <div className="flex justify-center py-20">
                <span className="text-[#9e0a0a]">{error ?? '아티클을 찾을 수 없습니다.'}</span>
            </div>
        )
    }

    return (
        <div>
            {/* 배너 */}
            <div className="py-10 border-b border-[#e5e5e0]">
                <div className="max-w-3xl mx-auto px-4 text-left">
                    <h1
                        className="text-3xl font-bold mb-6 text-[#211922]"
                        style={{ letterSpacing: '-0.5px' }}
                    >
                        {article.title}
                    </h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={article.author.image ?? 'https://www.gravatar.com/avatar/?d=mp'}
                                alt={article.author.username}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <Link
                                    to={`/profile/${article.author.username}`}
                                    className="font-medium text-[#211922] hover:text-[#e60023] transition-colors"
                                >
                                    {article.author.username}
                                </Link>
                                <p className="text-xs text-[#91918c]">
                                    {format(new Date(article.createdAt), 'MMMM d, yyyy')}
                                </p>
                            </div>
                        </div>
                        <FavoriteButton
                            slug={article.slug}
                            count={article.favoritesCount}
                            favorited={article.favorited}
                        />
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div className="max-w-3xl mx-auto px-4 py-10 text-left">
                <p className="text-[#211922] leading-relaxed whitespace-pre-wrap">{article.body}</p>
                <div className="mt-8">
                    <TagList tags={article.tagList} />
                </div>
            </div>

            <hr className="border-[#e5e5e0]" />

            {/* 댓글 섹션 */}
            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* 댓글 작성 */}
                {user ? (
                    <form
                        onSubmit={handleAddComment}
                        className="border border-[#e5e5e0] rounded-[16px] mb-8"
                    >
                        <textarea
                            className="w-full p-4 text-sm resize-none outline-none rounded-t-[16px] text-[#211922]"
                            rows={3}
                            placeholder="댓글을 작성하세요..."
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                        />
                        <div className="flex items-center justify-between bg-[#f6f6f3] px-4 py-2 rounded-b-[16px] border-t border-t-[#e5e5e0]">
                            <img
                                src={user.image ?? 'https://www.gravatar.com/avatar/?d=mp'}
                                alt={user.userName}
                                className="w-7 h-7 rounded-full"
                            />
                            <button
                                type="submit"
                                disabled={submitting || !commentBody.trim()}
                                className="btn-primary disabled:opacity-50"
                            >
                                댓글 등록
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="text-center text-[#62625b] mb-8">
                        <Link to="/login" className="text-[#e60023] hover:underline">로그인</Link>
                        {' '}또는{' '}
                        <Link to="/register" className="text-[#e60023] hover:underline">회원가입</Link>
                        {' '}후 댓글을 작성할 수 있습니다.
                    </p>
                )}

                {/* 댓글 목록 */}
                <div className="flex flex-col gap-4">
                    {comments.length === 0 && (
                        <p className="text-center text-[#91918c] py-4">아직 댓글이 없습니다.</p>
                    )}
                    {comments.map((comment) => (
                        <div key={comment.id} className="border border-[#e5e5e0] rounded-[16px]">
                            <p className="p-4 text-sm text-[#211922] whitespace-pre-wrap text-left">
                                {comment.body}
                            </p>
                            <div className="flex items-center justify-between bg-[#f6f6f3] px-4 py-2 rounded-b-[16px] border-t border-t-[#e5e5e0]">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={comment.author.image ?? 'https://www.gravatar.com/avatar/?d=mp'}
                                        alt={comment.author.username}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <Link
                                        to={`/profile/${comment.author.username}`}
                                        className="text-xs text-[#e60023] hover:underline"
                                    >
                                        {comment.author.username}
                                    </Link>
                                    <span className="text-xs text-[#91918c]">
                                        {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                                    </span>
                                </div>
                                {user?.userName === comment.author.username && (
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="text-xs text-[#9e0a0a] hover:underline"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Articles
