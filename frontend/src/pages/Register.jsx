import { useState } from 'react'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()

    try {

      const response = await fetch(
        'http://localhost:5000/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      console.log(data)

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert('Registration successful!')

    } catch (error) {

      console.error(error)
      alert('Unable to connect to EcoWise server')

    }
  }

  return (
    <div className="auth-page">

      <h1>Create EcoWise Account 🌱</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  )
}

export default Register