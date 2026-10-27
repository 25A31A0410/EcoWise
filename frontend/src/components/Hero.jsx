function Hero({ searchTerm, setSearchTerm }) {
  return (
    <section className="hero">
      <h1>🌱 EcoWise</h1>

      <h2>Make Better Choices for a Better Planet</h2>

      <p>
        Discover sustainable, reusable, refillable and
        ingredient-conscious products for everyday life.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button>Search</button>
      </div>
    </section>
  )
}

export default Hero