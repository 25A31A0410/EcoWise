function PackagingInfo({ product }) {

  let packagingMessage = ''

  if (product.refillable) {
    packagingMessage =
      'This product uses a refillable approach, which can reduce the need to replace the main container repeatedly.'
  } else if (product.reusable) {
    packagingMessage =
      'This product is designed for repeated use, which can help reduce reliance on disposable products.'
  } else if (product.plasticFree) {
    packagingMessage =
      'The available product information indicates that the product is plastic-free.'
  } else {
    packagingMessage =
      'Packaging information is available, but the product may still contain plastic or other materials.'
  }

  return (
    <section className="packaging-info">

      <h2>📦 Packaging Analysis</h2>

      <div className="packaging-card">

        <div className="packaging-item">

          <strong>Packaging Type</strong>

          <p>
            {product.packaging || 'Information not available'}
          </p>

        </div>

        <div className="packaging-item">

          <strong>Plastic-free</strong>

          <p>
            {product.plasticFree ? 'Yes ♻️' : 'No'}
          </p>

        </div>

        <div className="packaging-item">

          <strong>Reusable</strong>

          <p>
            {product.reusable ? 'Yes 🔄' : 'No'}
          </p>

        </div>

        <div className="packaging-item">

          <strong>Refillable</strong>

          <p>
            {product.refillable ? 'Yes 🔁' : 'No'}
          </p>

        </div>

        <div className="packaging-assessment">

          <h3>🌱 EcoWise Packaging Insight</h3>

          <p>
            {packagingMessage}
          </p>

        </div>

        <div className="packaging-note">

          <strong>ℹ️ Important:</strong>

          <p>
            Packaging information can change between products,
            versions and manufacturers. Always check the current
            product packaging or manufacturer's information.
          </p>

        </div>

      </div>

    </section>
  )
}

export default PackagingInfo