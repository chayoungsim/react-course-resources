import ProfileCard from './components/ProfileCard'

import './App.css'

function App() {
 const profiles = [
    { name: '김민준', role: 'React 개발자', emoji: '👨‍💻', initialLikes: 42 },
    { name: '이서연', role: 'UI 디자이너',  emoji: '👩‍🎨', initialLikes: 87 },
    { name: '박지호', role: '풀스택 엔지니어', emoji: '🧑‍🚀', initialLikes: 31 },
  ]

  return (
    <div className="p-8 grid grid-cols-3 gap-4">
      {/* ✅ map으로 배열 → 컴포넌트 리스트 렌더링 */}
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
        //                        ↑ 스프레드 연산자로 Props 한 번에 전달
      ))}
    </div>
  )
}

export default App
