const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/protected', protect, (req, res) => {
  res.json({
    message: 'You accessed a protected EcoWise route 🌱',
    userId: req.userId
  })
})

module.exports = router