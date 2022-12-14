import { Link } from 'react-router-dom'
import logo from '../images/logo-transparent-png.png'

const Home = () => {
  return (
    <div className="homepage">
      <div className="home">
        <h1>Welcome to Dotify</h1>
        <img className="home-logo" src={logo} alt="dotify logo" />
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Home
