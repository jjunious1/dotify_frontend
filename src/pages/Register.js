import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    dotifyId: '',
    password: '',
    confirmPassword: ''
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      dotifyId: formValues.dotifyId,
      password: formValues.password
    })
    setFormValues({
      name: '',
      email: '',
      dotifyId: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }

  return (
    <div className="form">
      <div className="col">
        <form className="register" onSubmit={handleSubmit}>
          <h1 className="sign">Hello</h1>
          <p className="sign">Create your Dotify Account below</p>
          <div className="input-wrapper">
            <input
              className="name1"
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Name"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="email1"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="dotifyId1"
              onChange={handleChange}
              name="dotifyId"
              type="dotifyId"
              placeholder="dotifyId"
              value={formValues.dotifyId}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="password1"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper Password">
            <input
              className="confirmpassword1"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            className="regButton reg"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Create Account
          </button>
        </form>
      </div>
      <div className="extras">
        <p>
          Not a member?{'  '}
          <a href="/register">Sign up now</a>
        </p>
        <p>
          <Link to="/">Back</Link> to homepage
        </p>
      </div>
    </div>
  )
}

export default Register
