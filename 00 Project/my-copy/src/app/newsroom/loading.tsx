import SubContainer from "@/components/layout/SubContainer";

export default function PostsLoading() {
    return (
        <SubContainer style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <div className="static">
                {/* 로딩 스피너 */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "2rem",
                    }}
                >
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            border: "4px solid #f0f0f0",
                            borderTop: "4px solid #007ac9",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                </div>

                <p style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
                    데이터를 열심히 가져오는 중입니다... 🚀
                </p>
                <p style={{ fontSize: "0.9rem", color: "#999", marginTop: "1rem" }}>
                    잠시만 기다려주세요
                </p>

                {/* CSS 애니메이션 정의 */}
                <style>{`
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </div>
        </SubContainer>
    );
}