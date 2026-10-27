import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/auth'

function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)

const navigate = useNavigate()

const handleLogin = async (event) => {
event.preventDefault()
setLoading(true)

try {
  const { response, data } = await loginUser(email, password)

  if (!response.ok) {
    alert(data.message || 'Login failed')
    return
  }

  localStorage.setItem('ecowise_token', data.token)
  localStorage.setItem(
    'ecowise_user',
    JSON.stringify(data.user)
  )

  alert('Login successful!')

  // Open the Profile page after successful login
  navigate('/profile')
} catch (error) {
  console.error(error)
  alert('Unable to connect to EcoWise server')
} finally {
  setLoading(false)
}

}

return (
<div className="auth-page">
<h1>Welcome Back to EcoWise 🌱</h1>

  <form onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      required
    />

    <button type="submit" disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  </form>

  <p>
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</div>

)
}

export default Login