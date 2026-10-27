const API_URL = 'http://localhost:5000/api'

async function getProducts() {

  const response = await fetch(
    `${API_URL}/products`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()

  return data.products
}

async function getProductById(id) {

  const response = await fetch(
    `${API_URL}/products/${id}`
  )

  if (!response.ok) {
    throw new Error('Product not found')
  }

  return await response.json()
}

async function searchProducts(query) {

  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error('Failed to search products')
  }

  const data = await response.json()

  return data.products
}

export {
  getProducts,
  getProductById,
  searchProducts
}