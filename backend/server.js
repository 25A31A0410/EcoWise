require('dotenv').config()

const express = require('express')
const cors = require('cors')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const {
  notFound,
  errorHandler
} = require('./middleware/errorMiddleware')

const app = express()

const PORT = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the EcoWise API 🌱'
  })
})

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(
    `EcoWise backend running on http://localhost:${PORT}`
  )
})