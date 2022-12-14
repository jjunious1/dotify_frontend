import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import Profile from './pages/Profile'
import Nav from './components/Nav'
import Browse from './pages/Browse'
import { CheckSession } from './services/Auth'
import { useNavigate } from 'react-router-dom'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  let navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
    navigate('/')
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/browse"
            element={
              <Browse
                user={user}
                authenticated={authenticated}
                handleLogOut={handleLogOut}
              />
            }
          />
          <Route
            path="/userpage/:id"
            element={
              <Playlist
                user={user}
                authenticated={authenticated}
                handleLogOut={handleLogOut}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                authenticated={authenticated}
                handleLogOut={handleLogOut}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
