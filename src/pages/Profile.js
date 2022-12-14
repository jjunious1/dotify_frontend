import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UpdateUserPassword } from '../services/Auth'
import Client from '../services/api'
import { BASE_URL } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'

const Profile = ({ authenticated, user, handleLogOut }) => {
  const [formValues, setFormValues] = useState({
    dotifyId: user.dotifyId,
    password: '',
    confirmPassword: ''
  })
  const dotifyId = user.dotifyId
  let navigate = useNavigate()

  //used to reset the users password

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await UpdateUserPassword(formValues)
    setFormValues({ dotifyId: '', password: '' })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const deleteUser = await Client.delete(`${BASE_URL}auth/${user.id}`)
    navigate('/')
    console.log(deleteUser)
  }
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <div>
        <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
        <h1>Welcome to your profile {user.dotifyId}</h1>
        <h2>You can update the password or delete your account here</h2>
        <div className="col3">
          <form className="profile" onSubmit={handleSubmit}>
            <div className="input-wrapper2">
              <input
                className="pword"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="New Password"
                value={formValues.password}
                required
              />
            </div>
            <div className="input-wrapper2">
              <input
                className="confirmpword"
                onChange={handleChange}
                type="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formValues.confirmPassword}
                required
              />
            </div>
            <button
              className="upButton"
              disabled={
                !formValues.password &&
                formValues.confirmPassword === formValues.password
              }
            >
              Change
            </button>
          </form>
          <button className="delButton" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    )
  }
  const publicOptions = (
    <div>
      <h1>Please login or register to continue</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Signup</Link>
    </div>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Profile
