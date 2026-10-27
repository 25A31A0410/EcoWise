function IngredientInfo({ product }) {

  return (
    <section className="ingredient-info">

      <h2>🧪 Ingredients & Materials</h2>

      <div className="ingredient-card">

        <h3>Ingredients</h3>

        {Array.isArray(product.ingredients) &&
        product.ingredients.length > 0 ? (

          <ul>
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}
              </li>
            ))}
          </ul>

        ) : (

          <p>
            This product does not have an ingredient list
            because it is primarily a material-based product.
          </p>

        )}

        <h3>Material</h3>

        <p>
          {product.materialInfo || product.materials || 'Information not available'}
        </p>

        <div className="ingredient-note">

          <strong>ℹ️ Important:</strong>

          <p>
            Ingredient and material information can vary by
            product formulation or manufacturer. Always check
            the current product label or manufacturer's information
            before making a purchase.
          </p>

        </div>

      </div>

    </section>
  )
}

export default IngredientInfo