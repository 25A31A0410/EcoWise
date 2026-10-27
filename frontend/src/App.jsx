import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import FeaturedProducts from './components/FeaturedProducts'
import Filter from './components/Filter'
import Recommendation from './components/Recommendation'

import ProductDetails from './pages/ProductDetails'
import Compare from './pages/Compare'
import Wishlist from './pages/Wishlist'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'


function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const [plasticFreeOnly, setPlasticFreeOnly] = useState(false)
  const [reusableOnly, setReusableOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState('')
  const [minEcoScore, setMinEcoScore] = useState('')

  return (
    <div>

      <Navbar />

      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategorySection
        setSelectedCategory={setSelectedCategory}
      />

      <Filter
        plasticFreeOnly={plasticFreeOnly}
        setPlasticFreeOnly={setPlasticFreeOnly}
        reusableOnly={reusableOnly}
        setReusableOnly={setReusableOnly}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minEcoScore={minEcoScore}
        setMinEcoScore={setMinEcoScore}
      />

      <Recommendation />

      <FeaturedProducts
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        plasticFreeOnly={plasticFreeOnly}
        reusableOnly={reusableOnly}
        maxPrice={maxPrice}
        minEcoScore={minEcoScore}
      />

    </div>
  )
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Product Details Page */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Compare Page */}
        <Route
          path="/compare"
          element={<Compare />}
        />

        {/* Wishlist Page */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>
  )
}


export default App