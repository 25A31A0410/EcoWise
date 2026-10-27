import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

import { getProducts } from '../services/api'
import calculateEcoScore from '../services/ecoScore'


function FeaturedProducts({
  searchTerm,
  selectedCategory,
  plasticFreeOnly,
  reusableOnly,
  maxPrice,
  minEcoScore
}) {

  const [products, setProducts] = useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {

    async function loadProducts() {

      try {

        setLoading(true)

        setError('')

        const data =
          await getProducts()

        setProducts(data)

      } catch (error) {

        console.error(error)

        setError(
          'Unable to load products from the EcoWise server.'
        )

      } finally {

        setLoading(false)

      }

    }

    loadProducts()

  }, [])


  const filteredProducts =
    products.filter((product) => {

      const search =
        searchTerm
          .toLowerCase()
          .trim()


      /*
        Search through multiple product fields:

        1. Product name
        2. Description
        3. Category
        4. Material information
      */

      const matchesSearch =
        search === '' ||

        product.name
          ?.toLowerCase()
          .includes(search) ||

        product.description
          ?.toLowerCase()
          .includes(search) ||

        product.category
          ?.toLowerCase()
          .includes(search) ||

        product.materialInfo
          ?.toLowerCase()
          .includes(search) ||

        product.materials
          ?.toLowerCase()
          .includes(search)


      const matchesCategory =
        selectedCategory === '' ||
        product.category === selectedCategory


      const matchesPlasticFree =
        !plasticFreeOnly ||
        product.plasticFree === true


      const matchesReusable =
        !reusableOnly ||
        product.reusable === true


      const matchesPrice =
        maxPrice === '' ||
        product.price <= Number(maxPrice)


      const ecoScore =
        calculateEcoScore(product)


      const matchesEcoScore =
        minEcoScore === '' ||
        ecoScore >= Number(minEcoScore)


      return (
        matchesSearch &&
        matchesCategory &&
        matchesPlasticFree &&
        matchesReusable &&
        matchesPrice &&
        matchesEcoScore
      )

    })


  if (loading) {

    return (

      <section className="featured-products">

        <h2>
          🌱 EcoWise Products
        </h2>

        <p>
          Loading products from the EcoWise server...
        </p>

      </section>

    )

  }


  if (error) {

    return (

      <section className="featured-products">

        <h2>
          🌱 EcoWise Products
        </h2>

        <p>
          {error}
        </p>

        <p>
          Please make sure the EcoWise backend is running.
        </p>

      </section>

    )

  }


  return (

    <section className="featured-products">

      <h2>
        🌱 EcoWise Products
      </h2>

      <p>
        Products loaded from the EcoWise backend.
      </p>


      {filteredProducts.length === 0 ? (

        <div className="no-products">

          <h3>
            No products found
          </h3>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="product-grid">

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

      )}

    </section>

  )

}


export default FeaturedProducts