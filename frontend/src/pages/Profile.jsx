import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import {
getCurrentUser,
logoutUser
} from '../services/auth'

import getProtectedData from '../services/protectedApi'

function Profile() {
const navigate = useNavigate()

const [user, setUser] = useState(() => getCurrentUser())
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
async function checkAuthentication() {
try {
const savedUser = getCurrentUser()
setUser(savedUser)

    if (!savedUser) {
      setError('No saved user details were found. Please log in again.')
      return
    }

    const { response, data } = await getProtectedData()

    if (!response.ok) {
      setError(data.message || 'Your login session is invalid. Please log in again.')
      return
    }

    setMessage(data.message || 'Your EcoWise session is active.')
  } catch (err) {
    console.error('Profile authentication error:', err)
    setError('Could not verify your login with the backend. Check that the backend is running.')
  } finally {
    setLoading(false)
  }
}

checkAuthentication()

}, [])

const handleLogout = () => {
logoutUser()
navigate('/login')
}

if (loading) {
return <div className="auth-page"><h1>Checking your account...</h1></div>
}

if (!user) {
return (
<div className="auth-page">
<h1>EcoWise Profile 🌱</h1>
<p>{error || 'You are not logged in.'}</p>
<Link to="/login">Go to Login</Link>
</div>
)
}

return (
<div className="auth-page">
<h1>My EcoWise Profile 🌱</h1>

  <h2>Welcome, {user.name}</h2>
  <p>Email: {user.email}</p>

  {message && <p>{message}</p>}
  {error && <p role="alert">{error}</p>}

  <button onClick={handleLogout}>Logout</button>
  <p><Link to="/">Back to Home</Link></p>
</div>

)
}

export default Profile