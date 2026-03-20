import { useState } from "react";
import { useAxios } from "./hooks/useAxios.js";
import axios from "axios";

function App() {
    const [userId, setUserId] = useState(1);
    const { data, loading, error, refetch, setData } = useAxios(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );

    async function deletePost(id) {
        const originalData = [...data]; // 에러 발생 시 복원을 위해 원본 데이터 저장
        // 낙관적 업데이트: UI를 먼저 변경
        setData(data.filter((post) => post.id !== id));

        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        } catch (error) {
            setData(originalData); // 에러 발생 시 원래 데이터로 복원
            console.error("삭제 중 에러 발생:", error);
        }
    }

    return (
        <div>
            <button onClick={() => setUserId(1)}>유저 1</button>
            <button onClick={() => setUserId(2)}>유저 2</button>

            {/* ✅ 세 가지 상태를 조건부 렌더링으로 처리 */}
            {loading && <p>로딩 중...</p>}
            {error && <p>에러: {error}</p>}
            {data &&
                data.map((post) => (
                    <div key={post.id}>
                        {post.title}
                        <button onClick={() => deletePost(post.id)}>삭제</button>
                    </div>
                ))}

            <button onClick={refetch}>새로고침</button>
        </div>
    );
}

export default App;
