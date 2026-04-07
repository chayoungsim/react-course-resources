import Link from "next/link";
import SubContainer from "@/components/layout/SubContainer";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

async function getPost(id: string): Promise<Post> {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
    const { id } = await params;
    const post: Post = await getPost(id);

    return (
        <SubContainer>
            <div className="static">
                <Link href="/posts">
                    <p style={{ color: '#007ac9', marginBottom: '2rem', cursor: 'pointer' }}>
                        ← Back to Posts
                    </p>
                </Link>

                <article
                    style={{
                        padding: '2rem',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                    }}
                >
                    <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>
                        {post.title}
                    </h1>
                    <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1.1rem' }}>
                        {post.body}
                    </p>
                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                        <p style={{ color: '#999', fontSize: '0.9rem' }}>
                            Post ID: {post.id} | User ID: {post.userId}
                        </p>
                    </div>
                </article>
            </div>
        </SubContainer>
    );
}
