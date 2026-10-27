import { getToken } from './auth'

async function getProtectedData() {

  const token = getToken()

  const response = await fetch(
    'http://localhost:5000/api/users/protected',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await response.json()

  return {
    response,
    data
  }
}

export default getProtectedData