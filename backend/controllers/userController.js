const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = require('../data/users')

function createToken(userId) {
  return jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    )

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    }

    users.push(newUser)

    const token = createToken(newUser.id)

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to register user'
    })
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const user = users.find(
      (user) => user.email === normalizedEmail
    )

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = createToken(user.id)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to login'
    })
  }
}

module.exports = {
  registerUser,
  loginUser
}