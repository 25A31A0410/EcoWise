import { useState } from 'react'
import products from '../data/products'
import calculateEcoScore from '../services/ecoScore'

function Compare() {

  const [product1Id, setProduct1Id] = useState('')
  const [product2Id, setProduct2Id] = useState('')

  const product1 = products.find(
    (product) => product.id === Number(product1Id)
  )

  const product2 = products.find(
    (product) => product.id === Number(product2Id)
  )

  return (
    <section className="compare-page">

      <h1>Compare Products</h1>

      <p>
        Compare products based on price, packaging,
        sustainability and Eco Score.
      </p>

      <div className="compare-selectors">

        <div>
          <h3>Product 1</h3>

          <select
            value={product1Id}
            onChange={(event) => setProduct1Id(event.target.value)}
          >
            <option value="">Select a product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <h3>Product 2</h3>

          <select
            value={product2Id}
            onChange={(event) => setProduct2Id(event.target.value)}
          >
            <option value="">Select a product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}

          </select>
        </div>

      </div>

      {product1 && product2 && (

        <div className="comparison-table">

          <div className="comparison-row comparison-header">
            <div>Feature</div>
            <div>{product1.name}</div>
            <div>{product2.name}</div>
          </div>

          <div className="comparison-row">
            <div>Price</div>
            <div>₹{product1.price}</div>
            <div>₹{product2.price}</div>
          </div>

          <div className="comparison-row">
            <div>Category</div>
            <div>{product1.category}</div>
            <div>{product2.category}</div>
          </div>

          <div className="comparison-row">
            <div>Packaging</div>
            <div>{product1.packaging}</div>
            <div>{product2.packaging}</div>
          </div>

          <div className="comparison-row">
            <div>Plastic-free</div>
            <div>
              {product1.plasticFree ? 'Yes ♻️' : 'No'}
            </div>
            <div>
              {product2.plasticFree ? 'Yes ♻️' : 'No'}
            </div>
          </div>

          <div className="comparison-row">
            <div>Reusable</div>
            <div>
              {product1.reusable ? 'Yes 🔄' : 'No'}
            </div>
            <div>
              {product2.reusable ? 'Yes 🔄' : 'No'}
            </div>
          </div>

          <div className="comparison-row">
            <div>Eco Score</div>

            <div>
              {calculateEcoScore(product1)}/100
            </div>

            <div>
              {calculateEcoScore(product2)}/100
            </div>
          </div>

        </div>

      )}

    </section>
  )
}

export default Compare