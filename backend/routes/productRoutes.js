const express = require('express')

const {
  getAllProducts,
  searchProducts,
  getProductById
} = require('../controllers/productController')

const router = express.Router()

router.get('/', getAllProducts)

router.get('/search', searchProducts)

router.get('/:id', getProductById)

module.exports = router