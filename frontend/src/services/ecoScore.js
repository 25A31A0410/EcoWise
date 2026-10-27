function calculateEcoScoreBreakdown(product) {

  let packagingScore = 0
  let reusableScore = 0
  let refillableScore = 0
  let materialScore = 0
  let durabilityScore = 0

  // Packaging — 30 points
  if (product.plasticFree) {
    packagingScore = 30
  } else if (product.refillable) {
    packagingScore = 24
  } else {
    packagingScore = 12
  }

  // Reusable — 25 points
  if (product.reusable) {
    reusableScore = 25
  }

  // Refillable — 20 points
  if (product.refillable) {
    refillableScore = 20
  }

  // Material — 15 points
  const material = (
    product.materialInfo ||
    product.materials ||
    ''
  ).toLowerCase()

  if (
    material.includes('bamboo') ||
    material.includes('cotton') ||
    material.includes('glass') ||
    material.includes('stainless steel') ||
    material.includes('natural fiber')
  ) {
    materialScore = 15
  } else {
    materialScore = 8
  }

  // Durability — 10 points
  if (product.reusable || product.refillable) {
    durabilityScore = 10
  } else {
    durabilityScore = 5
  }

  const totalScore =
    packagingScore +
    reusableScore +
    refillableScore +
    materialScore +
    durabilityScore

  return {
    packaging: packagingScore,
    reusable: reusableScore,
    refillable: refillableScore,
    material: materialScore,
    durability: durabilityScore,
    total: totalScore
  }
}

function calculateEcoScore(product) {
  return calculateEcoScoreBreakdown(product).total
}

export { calculateEcoScoreBreakdown }

export default calculateEcoScore