import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import calculateEcoScore from '../services/ecoScore'

import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist
} from '../services/wishlist'


function ProductCard(props) {

  const product = props.product || props

  const {
    id,
    name,
    description,
    emoji,
    price,
    plasticFree,
    reusable,
    refillable
  } = product


  const navigate = useNavigate()
  const location = useLocation()


  const [wishlisted, setWishlisted] =
    useState(
      id ? isInWishlist(id) : false
    )


  /*
    Check the real wishlist whenever
    the page/route changes.
  */
  useEffect(() => {

    setWishlisted(
      id ? isInWishlist(id) : false
    )

  }, [id, location.pathname])


  /*
    Listen for wishlist changes made
    by another component.
  */
  useEffect(() => {

    function updateWishlistStatus() {

      setWishlisted(
        id ? isInWishlist(id) : false
      )

    }


    window.addEventListener(
      'wishlistUpdated',
      updateWishlistStatus
    )


    return () => {

      window.removeEventListener(
        'wishlistUpdated',
        updateWishlistStatus
      )

    }

  }, [id])


  /*
    Check again when the browser window
    becomes active.
  */
  useEffect(() => {

    function checkWishlist() {

      setWishlisted(
        id ? isInWishlist(id) : false
      )

    }


    window.addEventListener(
      'focus',
      checkWishlist
    )


    return () => {

      window.removeEventListener(
        'focus',
        checkWishlist
      )

    }

  }, [id])


  const ecoScore =
    calculateEcoScore(product)


  function handleWishlist() {

    if (!id) {
      return
    }


    if (wishlisted) {

      removeFromWishlist(id)

    } else {

      addToWishlist(id)

    }

  }


  function handleViewDetails() {

    if (!id) {
      return
    }

    navigate(`/product/${id}`)

  }


  return (

    <div className="product-card">

      <div className="product-emoji">
        {emoji || '🌱'}
      </div>


      <h2>
        {name || 'Product name unavailable'}
      </h2>


      <p>
        {description ||
          'Product description unavailable.'}
      </p>


      <p>
        <strong>Price:</strong>{' '}
        ₹{price ?? 'N/A'}
      </p>


      <p>
        <strong>Eco Score:</strong>{' '}
        {ecoScore}/100
      </p>


      <p>
        <strong>Plastic-free:</strong>{' '}
        {plasticFree
          ? 'Yes ♻️'
          : 'No'}
      </p>


      <p>
        <strong>Reusable:</strong>{' '}
        {reusable
          ? 'Yes 🔄'
          : 'No'}
      </p>


      {refillable && (

        <p>
          <strong>Refillable:</strong>{' '}
          Yes 🔁
        </p>

      )}


      <button
        onClick={handleViewDetails}
      >
        View Details
      </button>


      <button
        className="wishlist-button"
        onClick={handleWishlist}
      >

        {wishlisted
          ? '❤️ Remove from Wishlist'
          : '🤍 Add to Wishlist'}

      </button>

    </div>

  )

}


export default ProductCard