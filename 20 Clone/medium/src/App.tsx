
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Articles from '@/pages/Articles'
import Editor from '@/pages/Editor'
import Setting from '@/pages/Setting'
import Profile from '@/pages/Profile'

function App() {
  return (
    <>
      <Header />
      <div id="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/settings' element={<Setting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:slug" element={<Articles />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
