import { Routes, Route } from 'react-router-dom'
import NewsLists from './pages/NewsLists'
import NewsView from './pages/NewsView'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsLists />} />
      <Route path="/news/:index" element={<NewsView />} />
    </Routes>
  )
}

export default App
