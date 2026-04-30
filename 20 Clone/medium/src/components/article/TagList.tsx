import { Link } from "react-router-dom";

interface TagListProps {
    tags: string[];
    clickable?: boolean;
}

export function TagList({ tags, clickable = false }: TagListProps) {
    if (tags.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
            {tags.map((tag) => (
                <li key={tag}>
                    {clickable ? (
                        <Link
                            to={`/tag/${tag}`}
                            className="text-[11px] border border-[#91918c] text-[#62625b] rounded-full px-2.5 py-0.5 hover:bg-[#e5e5e0] transition-colors"
                        >
                            {tag}
                        </Link>
                    ) : (
                        <span className="text-[11px] border border-[#91918c] text-[#62625b] rounded-full px-2.5 py-0.5">
                            {tag}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
