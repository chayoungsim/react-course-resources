import Image from "next/image";
import Link from "next/link";

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

interface NewsItemProps {
    article: Article;
    onClick: () => void;
}

export default function NewsItem({ article, onClick }: NewsItemProps): React.ReactNode {
    const { title, description, image_url, url, source, publishedAt } = article;

    return (
        <article className="new-item">
            <div className="photo" onClick={onClick}>
                {image_url && (
                    <Image
                        src={image_url}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                )}
            </div>
            <div className="desc">
                <h3>{title}</h3>
                <p>{description}</p>
                <small>
                    {source.name} • {new Date(publishedAt).toLocaleString()}
                </small>
                <div className="btn-center">
                    <Link href={url} target="_blank" className="btn--outline btn--md btn--hover">
                        원문 보기
                    </Link>
                </div>
            </div>
        </article>
    );
}