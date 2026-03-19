import { useState } from 'react'
import { useAxios } from './hooks/useAxios.js'


function App() {
   const [userId, setUserId] = useState(1)
   const {data, loading, error, refetch} = useAxios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

  return (
    <div>
      <button onClick={() => setUserId(1)}>유저 1</button>
      <button onClick={() => setUserId(2)}>유저 2</button>

      {/* ✅ 세 가지 상태를 조건부 렌더링으로 처리 */}
      {loading && <p>로딩 중...</p>}
      {error   && <p>에러: {error}</p>}
      {data    && data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}

      <button onClick={refetch}>새로고침</button>
    </div>
  )
}

export default App
