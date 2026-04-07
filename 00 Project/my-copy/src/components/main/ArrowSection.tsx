export default function ArrowSection() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="icon-circled-arrow"
                name="circled-arrow"
            >
                <path
                    fill="#202124"
                    d="M43.671 30.146 33.167 19.642l2.12-2.122 14.127 14.126L35.61 45.45l-2.122-2.122 10.182-10.182h-27.67v-3z"
                    className="arrow"
                />
                <path
                    fill="#202124"
                    d="M60 32c0 15.464-12.536 28-28 28S4 47.464 4 32 16.536 4 32 4s28 12.536 28 28M6.904 32C6.904 45.86 18.14 57.096 32 57.096S57.096 45.86 57.096 32 45.86 6.904 32 6.904 6.904 18.14 6.904 32"
                    className="circle-start"
                />
                <path
                    fill="#202124"
                    d="M51.799 12.201a28 28 0 1 0 0 39.598l-2.053-2.053a25.096 25.096 0 1 1 0-35.492z"
                    className="circle-end"
                />
            </svg>
        </div>
    );
}
