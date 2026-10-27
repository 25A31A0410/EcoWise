import { useState } from 'react'
import products from '../data/products'
import getRecommendations from '../services/recommendation'
import calculateEcoScore from '../services/ecoScore'

function Recommendation() {

  const [category, setCategory] = useState('')
  const [plasticFree, setPlasticFree] = useState(false)
  const [reusable, setReusable] = useState(false)
  const [maxPrice, setMaxPrice] = useState('')
  const [minEcoScore, setMinEcoScore] = useState('')

  const recommendations = getRecommendations(
    products,
    {
      category,
      plasticFree,
      reusable,
      maxPrice,
      minEcoScore
    }
  )

  return (
    <section className="recommendation-section">

      <h2>🌱 Find Products for You</h2>

      <p>
        Tell EcoWise what you are looking for and
        we will find matching products.
      </p>

      <div className="recommendation-form">

        <label>
          Category

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="">All Categories</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Haircare">Haircare</option>
            <option value="Period Care">Period Care</option>
            <option value="Home">Home</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </label>

        <label className="recommendation-checkbox">

          <input
            type="checkbox"
            checked={plasticFree}
            onChange={(event) =>
              setPlasticFree(event.target.checked)
            }
          />

          Plastic-free
        </label>

        <label className="recommendation-checkbox">

          <input
            type="checkbox"
            checked={reusable}
            onChange={(event) =>
              setReusable(event.target.checked)
            }
          />

          Reusable
        </label>

        <label>
          Maximum Price

          <input
            type="number"
            placeholder="₹"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(event.target.value)
            }
          />
        </label>

        <label>
          Minimum Eco Score

          <input
            type="number"
            placeholder="0–100"
            value={minEcoScore}
            onChange={(event) =>
              setMinEcoScore(event.target.value)
            }
          />
        </label>

      </div>

      <div className="recommendation-results">

        <h3>
          Matching Products ({recommendations.length})
        </h3>

        {recommendations.length === 0 ? (

          <p>
            No products currently match your preferences.
            Try changing some filters.
          </p>

        ) : (

          <div className="recommendation-list">

            {recommendations.map((product) => (

              <div
                className="recommendation-card"
                key={product.id}
              >

                <div className="recommendation-emoji">
                  {product.emoji}
                </div>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>

                <p>
                  <strong>Eco Score:</strong>{' '}
                  {calculateEcoScore(product)}/100
                </p>

                <p>
                  <strong>Plastic-free:</strong>{' '}
                  {product.plasticFree ? 'Yes ♻️' : 'No'}
                </p>

                <p>
                  <strong>Reusable:</strong>{' '}
                  {product.reusable ? 'Yes 🔄' : 'No'}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  )
}

export default Recommendation