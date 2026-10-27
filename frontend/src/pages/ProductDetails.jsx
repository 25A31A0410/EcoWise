import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import IngredientInfo from '../components/IngredientInfo'
import PackagingInfo from '../components/PackagingInfo'

import calculateEcoScore from '../services/ecoScore'

function ProductDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

    async function fetchProduct() {

      try {

        setLoading(true)
        setError('')

        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        )

        if (!response.ok) {
          throw new Error('Product not found')
        }

        const data = await response.json()

        setProduct(data)

      } catch (error) {

        console.error(error)

        setError('Product not found')

      } finally {

        setLoading(false)

      }
    }

    fetchProduct()

  }, [id])


  if (loading) {

    return (
      <div className="product-details-page">

        <h1>🌱 EcoWise</h1>

        <p>Loading product...</p>

      </div>
    )

  }


  if (error || !product) {

    return (
      <div className="product-details-page">

        <h1>🌱 EcoWise</h1>

        <h2>Product not found</h2>

        <p>
          We could not find the requested product.
        </p>

        <button onClick={() => navigate('/')}>
          ← Back to Products
        </button>

      </div>
    )

  }


  const ecoScore = calculateEcoScore(product)


  return (
    <div className="product-details-page">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>


      <div className="product-details-card">

        <div className="product-details-emoji">
          {product.emoji || '🌱'}
        </div>


        <h1>
          {product.name}
        </h1>


        <p className="product-details-description">
          {product.description}
        </p>


        <div className="product-details-price">

          <strong>Price:</strong>

          ₹{product.price ?? 'N/A'}

        </div>


        <div className="product-details-score">

          🌱 <strong>Eco Score:</strong>

          {' '}

          {ecoScore}/100

        </div>


        <div className="product-details-features">

          <p>
            <strong>Plastic-free:</strong>{' '}

            {product.plasticFree
              ? 'Yes ♻️'
              : 'No'}
          </p>


          <p>
            <strong>Reusable:</strong>{' '}

            {product.reusable
              ? 'Yes 🔄'
              : 'No'}
          </p>


          <p>
            <strong>Refillable:</strong>{' '}

            {product.refillable
              ? 'Yes 🔁'
              : 'No'}
          </p>


          <p>
            <strong>Packaging:</strong>{' '}

            {product.packaging ||
              'Information not available'}
          </p>

        </div>


        <div className="product-details-reason">

          <h2>🌱 Why EcoWise includes this product</h2>

          <p>
            {product.whyBetter ||
              'This product is included based on its available sustainability and product information.'}
          </p>

        </div>

      </div>


      <IngredientInfo
        product={product}
      />


      <PackagingInfo
        product={product}
      />


      <div className="product-details-note">

        <strong>ℹ️ Important:</strong>

        <p>
          Product information can change depending on
          the manufacturer, formulation, packaging or
          product version. Always check the current
          product information before making a purchase.
        </p>

      </div>

    </div>
  )
}

export default ProductDetails