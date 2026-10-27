import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ProductCard from '../components/ProductCard'

import {
  getWishlist
} from '../services/wishlist'

import {
  getProducts
} from '../services/api'


function Wishlist() {

  const [
    wishlistProducts,
    setWishlistProducts
  ] = useState([])


  const [
    loading,
    setLoading
  ] = useState(true)


  async function loadWishlist() {

    try {

      setLoading(true)

      const products =
        await getProducts()

      const savedIds =
        getWishlist()


      const savedProducts =
        products.filter(
          (product) =>
            savedIds.includes(product.id)
        )


      setWishlistProducts(
        savedProducts
      )

    } catch (error) {

      console.error(
        'Unable to load wishlist:',
        error
      )

    } finally {

      setLoading(false)

    }

  }


  useEffect(() => {

    loadWishlist()


    function handleWishlistUpdate() {

      loadWishlist()

    }


    window.addEventListener(
      'wishlistUpdated',
      handleWishlistUpdate
    )


    return () => {

      window.removeEventListener(
        'wishlistUpdated',
        handleWishlistUpdate
      )

    }

  }, [])


  if (loading) {

    return (

      <div className="wishlist-page">

        <h1>❤️ My Wishlist</h1>

        <p>
          Loading your wishlist...
        </p>

      </div>

    )

  }


  return (

    <div className="wishlist-page">

      <h1>❤️ My Wishlist</h1>


      {wishlistProducts.length === 0 ? (

        <div className="empty-wishlist">

          <h2>
            Your wishlist is empty
          </h2>

          <p>
            Add products from EcoWise
            to save them here.
          </p>

          <Link to="/">
            Browse Products
          </Link>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlistProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

      )}

    </div>

  )

}


export default Wishlist