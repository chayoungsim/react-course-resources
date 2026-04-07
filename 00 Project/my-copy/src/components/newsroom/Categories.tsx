interface CategoriesProps {
    active: string;
    onChange: (category: string) => void;
}

const categories: string[] = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
];

export default function Categories({ active, onChange }: CategoriesProps): React.ReactNode {
    return (
        <nav className="newsCategory">
            {categories.map((c) => (
                <button
                    key={c}
                    onClick={() => onChange(c)}
                    aria-pressed={c === active}
                    className={c === active ? 'active' : ''}
                >
                    {c}
                </button>
            ))}
        </nav>
    );
}