import { Link } from "react-router-dom";
import { format } from "date-fns";
import type { Profile } from "@/types";

interface ArticleMetaProps {
    author: Profile;
    createdAt: string;
}

export function ArticleMeta({ author, createdAt }: ArticleMetaProps) {
    return (
        <div className="flex items-center gap-3">
            <img
                src={author.image ?? "https://www.gravatar.com/avatar/?d=mp"}
                alt={author.username}
                className="w-10 h-10 rounded-full"
            />
            <div>
                <Link
                    to={`/profile/${author.username}`}
                    className="block font-medium text-[#211922] hover:text-[#e60023] transition-colors"
                >
                    {author.username}
                </Link>
                <p className="text-xs text-[#91918c]">
                    {format(new Date(createdAt), "MMMM d, yyyy")}
                </p>
            </div>
        </div>
    );
}
