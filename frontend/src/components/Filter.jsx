function Filter({
  plasticFreeOnly,
  setPlasticFreeOnly,
  reusableOnly,
  setReusableOnly,
  maxPrice,
  setMaxPrice,
  minEcoScore,
  setMinEcoScore
}) {

  return (
    <section className="filters">

      <h2>Filter Products</h2>

      <div className="filter-list">

        <label>
          <input
            type="checkbox"
            checked={plasticFreeOnly}
            onChange={(event) =>
              setPlasticFreeOnly(event.target.checked)
            }
          />

          Plastic-free
        </label>

        <label>
          <input
            type="checkbox"
            checked={reusableOnly}
            onChange={(event) =>
              setReusableOnly(event.target.checked)
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

    </section>
  )
}

export default Filter