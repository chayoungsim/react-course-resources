
import Link from "next/link";
import SubContainer from "@/components/layout/SubContainer";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

async function getPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}

interface PostsPageProps {
    searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 10;

export default async function PostsPage({
    searchParams,
}: PostsPageProps): Promise<React.ReactNode> {
    const params = await searchParams;
    const currentPage = parseInt(params.page || '1', 10);
    const posts: Post[] = await getPosts();

    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return (
        <SubContainer>
            <div className="static">
                <h1>Posts List</h1>

                <div style={{ display: 'grid', gap: '1rem', marginTop: '4rem' }}>
                    {paginatedPosts.map((post: Post) => (
                        <article
                            key={post.id}
                            style={{
                                padding: '1rem',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                cursor: 'pointer',
                            }}
                        >
                            <Link href={`/posts/${post.id}`}>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: '500', color: '#007ac9' }}>
                                    {post.title}
                                </h2>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* 페이징 버튼 */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginTop: '4rem',
                        marginBottom: '2rem',
                    }}
                >
                    {currentPage > 1 && (
                        <Link href={`/posts?page=${currentPage - 1}`}>
                            <button
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                }}
                            >
                                ← Previous
                            </button>
                        </Link>
                    )}

                    <span style={{ alignSelf: 'center', color: '#666' }}>
                        Page {currentPage} / {totalPages}
                    </span>

                    {currentPage < totalPages && (
                        <Link href={`/posts?page=${currentPage + 1}`}>
                            <button
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                }}
                            >
                                Next →
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </SubContainer>
    );
}