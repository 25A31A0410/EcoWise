const products = require('../data/products')

function getAllProducts(req, res) {
  res.json({
    products: products
  })
}

function searchProducts(req, res) {
  const query = (req.query.q || '').toLowerCase().trim()

  if (!query) {
    return res.json({
      products: products
    })
  }

  const results = products.filter((product) => {
    const name = (product.name || '').toLowerCase()
    const category = (product.category || '').toLowerCase()
    const description = (product.description || '').toLowerCase()

    return (
      name.includes(query) ||
      category.includes(query) ||
      description.includes(query)
    )
  })

  res.json({
    products: results
  })
}

function getProductById(req, res) {
  const id = Number(req.params.id)

  const product = products.find(
    (product) => product.id === id
  )

  if (!product) {
    return res.status(404).json({
      message: 'Product not found'
    })
  }

  res.json(product)
}

module.exports = {
  getAllProducts,
  searchProducts,
  getProductById
}