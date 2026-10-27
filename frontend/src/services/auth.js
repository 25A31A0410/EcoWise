const API_URL = 'http://localhost:5000/api'

async function registerUser(name, email, password) {

  const response = await fetch(
    `${API_URL}/users/register`,
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

  return {
    response,
    data
  }
}


async function loginUser(email, password) {

  const response = await fetch(
    `${API_URL}/users/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email,
        password
      })
    }
  )

  const data = await response.json()

  return {
    response,
    data
  }
}


function getToken() {
  return localStorage.getItem('ecowise_token')
}


function getCurrentUser() {

  const savedUser = localStorage.getItem('ecowise_user')

  if (!savedUser) {
    return null
  }

  return JSON.parse(savedUser)
}


function logoutUser() {

  localStorage.removeItem('ecowise_token')
  localStorage.removeItem('ecowise_user')
}


export {
  registerUser,
  loginUser,
  getToken,
  getCurrentUser,
  logoutUser
}