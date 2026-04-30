import ArticleCard from '@/components/article/ArticleCard'
import { useArticles } from '@/hooks/useArticles'

const Home = () => {
    const { data, isLoading, isError } = useArticles({ limit: 20 })

    if (isLoading) return <p className="p-4 text-[#91918c]">Loading...</p>
    if (isError) return <p className="p-4 text-[#9e0a0a]">Failed to load articles.</p>

    return (
        <main className="p-4">
            <div className="divide-y divide-[#e5e5e0]">
                {data?.articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>
        </main>
    )
}

export default Home
