import calculateEcoScore from './ecoScore'

function getRecommendations(products, preferences) {

  const {
    category,
    plasticFree,
    reusable,
    maxPrice,
    minEcoScore
  } = preferences

  const matchingProducts = products.filter((product) => {

    const matchesCategory =
      category === '' ||
      product.category === category

    const matchesPlasticFree =
      !plasticFree ||
      product.plasticFree === true

    const matchesReusable =
      !reusable ||
      product.reusable === true

    const matchesPrice =
      maxPrice === '' ||
      product.price <= Number(maxPrice)

    const ecoScore = calculateEcoScore(product)

    const matchesEcoScore =
      minEcoScore === '' ||
      ecoScore >= Number(minEcoScore)

    return (
      matchesCategory &&
      matchesPlasticFree &&
      matchesReusable &&
      matchesPrice &&
      matchesEcoScore
    )
  })

  return matchingProducts
}

export default getRecommendations