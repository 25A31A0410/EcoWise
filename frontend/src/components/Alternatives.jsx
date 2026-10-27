import ProductCard from './ProductCard'

function Alternatives({ product, products }) {

  if (!product || !product.alternativeFor) {
    return null
  }

  const alternatives = products.filter((item) => {

    if (!item.alternativeFor) {
      return false
    }

    return item.alternativeFor.some((alternative) =>
      product.alternativeFor.includes(alternative)
    )
  })

  if (alternatives.length === 0) {
    return null
  }

  return (
    <section className="alternatives">

      <h2>🌱 Eco-Friendly Alternatives</h2>

      <p>
        These products belong to the same alternative category
        and may help you make a different everyday choice.
      </p>

      <div className="product-list">

        {alternatives
          .filter((item) => item.id !== product.id)
          .map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              emoji={item.emoji}
              ecoScore={item.ecoScore}
              price={item.price}
              plasticFree={item.plasticFree}
              reusable={item.reusable}
            />
          ))}

      </div>

    </section>
  )
}

export default Alternatives