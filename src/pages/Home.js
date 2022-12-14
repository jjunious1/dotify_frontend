import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="homepage">
      <div className="home">
        <h1>Welcome</h1>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  )
}

export default Home
