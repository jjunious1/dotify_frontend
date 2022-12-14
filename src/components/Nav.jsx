import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo-png.png'


const Nav = ({ authenticated, user, handleLogout }) => {
  const navigate = useNavigate()
  let authenticatedOptions
if (user) {
  authenticatedOptions = (
    <nav className="navbar">
      <div className="dropdown">
        <a className="box-shadow-menu dropbtn">
          <div className="dropdown-content links">
            <Link to="/browse">Home</Link>
            <Link onClick={handleLogout} to="/">Sign Out</Link>
            <Link to='/profile'>Profile</Link>
            <Link to={`/userpage/${user.id}`}>Playlist</Link>
            <Link className="drop" onClick={() => navigate(-1)}>Back</Link>
          </div>
        </a>
      </div>
    </nav>
  )
}

const publicOptions = (
  <nav className="navbar">
    <div className="dropdown">
    <a className="box-shadow-menu dropbtn">
      <div className="dropdown-content links">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
        <Link className="drop" onClick={() => navigate(-1)}>Back</Link>
      </div>
    </a>
    </div> 
  </nav>
)

return (
  <header className="sticky-header">
    <div className="nav">
      <img className='logo' src={logo} alt="logo" />
      <div className="menu">
        {authenticated && user ? authenticatedOptions : publicOptions}
      </div>
    </div>
  </header>
)
}

export default Nav