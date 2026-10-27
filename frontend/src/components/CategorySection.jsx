function CategorySection({ setSelectedCategory }) {
  return (
    <section className="categories">
      <h2>Explore Categories</h2>

      <div className="category-list">
        <button onClick={() => setSelectedCategory('Personal Care')}>
          Personal Care
        </button>

        <button onClick={() => setSelectedCategory('Haircare')}>
          Haircare
        </button>

        <button onClick={() => setSelectedCategory('Period Care')}>
          Period Care
        </button>

        <button onClick={() => setSelectedCategory('Home')}>
          Home
        </button>

        <button onClick={() => setSelectedCategory('Kitchen')}>
          Kitchen
        </button>

        <button onClick={() => setSelectedCategory('Lifestyle')}>
          Lifestyle
        </button>
      </div>
    </section>
  )
}

export default CategorySection