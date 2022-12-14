import { useNavigate } from 'react-router'
import logo from '../images/logo-transparent-png.png'

const Home = () => {
  let navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }
  const register = () => {
    navigate('/register')
  }
  return (
    <div className="homepage">
      <img className="home-logo" src={logo} alt="dotify logo" />
      <div className="home">
        <h1 className="title">Welcome to Dotify</h1>
        <div className="hbutton-container">
          <button className="home-button" onClick={login}>
            Login
          </button>
          <button className="home-button" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
