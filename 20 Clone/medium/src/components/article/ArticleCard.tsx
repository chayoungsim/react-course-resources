import type { Article } from "@/types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ArticleMeta } from "./ArticleMeta";
import { FavoriteButton } from "./FavoriteButton";
import { TagList } from "./TagList";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const { slug, title, description, author, createdAt, favoritesCount, favorited, tagList } =
        article;

    return (
        <div className="border-b border-[#e5e5e0] py-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <ArticleMeta author={author} createdAt={createdAt} />
                <FavoriteButton slug={slug} count={favoritesCount} favorited={favorited} />
            </div>
            <Link to={`/article/${slug}`} className="flex flex-col items-start gap-1">
                <h2 className="text-xl font-semibold text-[#211922]" style={{ letterSpacing: 'normal' }}>
                    {title}
                </h2>
                <p className="text-[#62625b]">{description}</p>
            </Link>
            <div className="flex justify-between items-center">
                <span className="text-xs text-[#91918c]">
                    {format(new Date(createdAt), "MMM d, yyyy")}
                </span>
                <TagList tags={tagList} />
            </div>
        </div>
    );
};

export default ArticleCard;
