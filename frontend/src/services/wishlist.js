const WISHLIST_KEY = 'ecowise_wishlist'


function getWishlist() {

  const savedWishlist =
    localStorage.getItem(WISHLIST_KEY)

  if (!savedWishlist) {
    return []
  }

  return JSON.parse(savedWishlist)
}


function saveWishlist(wishlist) {

  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist)
  )

  // Notify other EcoWise components
  window.dispatchEvent(
    new Event('wishlistUpdated')
  )
}


function addToWishlist(productId) {

  const wishlist = getWishlist()

  if (!wishlist.includes(productId)) {

    wishlist.push(productId)

    saveWishlist(wishlist)

  }
}


function removeFromWishlist(productId) {

  const wishlist = getWishlist()

  const updatedWishlist =
    wishlist.filter(
      (id) => id !== productId
    )

  saveWishlist(updatedWishlist)
}


function isInWishlist(productId) {

  const wishlist = getWishlist()

  return wishlist.includes(productId)
}


export {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist
}