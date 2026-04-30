import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProfile, followUser, unfollowUser } from '@/api/profiles'
import { fetchArticles } from '@/api/articles'
import type { Profile, Article } from '@/types'
import { useAuthStore } from '@/store/authStore'
import ArticleCard from '@/components/article/ArticleCard'

type Tab = 'my' | 'favorited'

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>()
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const [profile, setProfile] = useState<Profile | null>(null)
    const [articles, setArticles] = useState<Article[]>([])
    const [tab, setTab] = useState<Tab>('my')
    const [profileLoading, setProfileLoading] = useState(true)
    const [articlesLoading, setArticlesLoading] = useState(true)
    const [articlesError, setArticlesError] = useState(false)
    const [followLoading, setFollowLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isOwnProfile = user?.userName === username

    useEffect(() => {
        if (!username) return

        let cancelled = false
        setProfileLoading(true)
        setError(null)
        setProfile(null)

        fetchProfile(username)
            .then((p) => { if (!cancelled) setProfile(p) })
            .catch((err) => {
                if (!cancelled) {
                    const status = (err as { response?: { status?: number } })?.response?.status
                    setError(status === 404
                        ? '존재하지 않는 사용자입니다.'
                        : '프로필을 불러오지 못했습니다.')
                }
            })
            .finally(() => { if (!cancelled) setProfileLoading(false) })

        return () => { cancelled = true }
    }, [username])

    useEffect(() => {
        if (!username) return

        let cancelled = false
        setArticlesLoading(true)
        setArticlesError(false)
        setArticles([])

        const params = tab === 'my' ? { author: username } : { favorited: username }
        fetchArticles(params)
            .then((res) => {
                if (!cancelled) setArticles(res.articles)
            })
            .catch(() => {
                if (!cancelled) setArticlesError(true)
            })
            .finally(() => {
                if (!cancelled) setArticlesLoading(false)
            })

        return () => { cancelled = true }
    }, [username, tab])

    const handleFollow = async () => {
        if (!user) { navigate('/login'); return }
        if (!profile) return
        setFollowLoading(true)
        try {
            const updated = profile.following
                ? await unfollowUser(profile.username)
                : await followUser(profile.username)
            setProfile(updated)
        } finally {
            setFollowLoading(false)
        }
    }

    if (profileLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="text-[#91918c]">불러오는 중...</span>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="flex justify-center py-20">
                <span className="text-[#9e0a0a]">{error ?? '프로필을 찾을 수 없습니다.'}</span>
            </div>
        )
    }

    return (
        <div>
            {/* 프로필 배너 */}
            <div className="bg-[#f6f6f3] border-b border-[#e5e5e0] py-12">
                <div className="max-w-2xl mx-auto px-4 flex flex-col items-center gap-4">
                    <img
                        src={profile.image ?? 'https://www.gravatar.com/avatar/?d=mp'}
                        alt={profile.username}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
                    />
                    <h2
                        className="text-[#211922] mb-0"
                        style={{ letterSpacing: '-0.5px' }}
                    >
                        {profile.username}
                    </h2>
                    {profile.bio && (
                        <p className="text-[#62625b] text-sm text-center max-w-sm">
                            {profile.bio}
                        </p>
                    )}
                    {!isOwnProfile && (
                        <button
                            onClick={handleFollow}
                            disabled={followLoading}
                            className={`${profile.following ? 'btn-primary' : 'btn-secondary'} disabled:opacity-50`}
                        >
                            {profile.following ? '✓ 팔로잉' : `+ ${profile.username} 팔로우`}
                        </button>
                    )}
                    {isOwnProfile && (
                        <button
                            onClick={() => navigate('/settings')}
                            className="btn-secondary"
                        >
                            ⚙ 프로필 편집
                        </button>
                    )}
                </div>
            </div>

            {/* 탭 + 아티클 목록 */}
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* 탭 */}
                <div className="flex border-b border-[#e5e5e0] mb-6">
                    <button
                        onClick={() => setTab('my')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                            tab === 'my'
                                ? 'border-[#e60023] text-[#e60023]'
                                : 'border-transparent text-[#62625b] hover:text-[#211922]'
                        }`}
                    >
                        My Articles
                    </button>
                    <button
                        onClick={() => setTab('favorited')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                            tab === 'favorited'
                                ? 'border-[#e60023] text-[#e60023]'
                                : 'border-transparent text-[#62625b] hover:text-[#211922]'
                        }`}
                    >
                        Favorited Articles
                    </button>
                </div>

                {/* 아티클 목록 */}
                {articlesLoading ? (
                    <p className="text-center text-[#91918c] py-8">불러오는 중...</p>
                ) : articlesError ? (
                    <p className="text-center text-[#9e0a0a] py-8">아티클을 불러오지 못했습니다.</p>
                ) : articles.length === 0 ? (
                    <p className="text-center text-[#91918c] py-8">
                        {tab === 'my' ? '작성한 아티클이 없습니다.' : '좋아요한 아티클이 없습니다.'}
                    </p>
                ) : (
                    <div className="divide-y divide-[#e5e5e0]">
                        {articles.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
