
import './App.css'
import PostAxios from './pages/PostAxios'
import PostFetch from './pages/PostFetch'
import PostApiFilterGroup from './pages/PostApiFilterGroup'

function App() {
  return (
    <>
      <h2>Fecth</h2>
      <PostFetch />      

      <h2>Axios</h2>
      <PostAxios />

      <h2>API Filter</h2>
      <PostApiFilterGroup />
    </>
  )
}

export default App
