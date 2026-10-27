import { Link } from 'react-router-dom'

function Navbar() {
return (
<nav>
<h2>🌱 EcoWise</h2>

  <div>
    <Link to="/">Home</Link>
    <Link to="/">Products</Link>
    <Link to="/compare">Compare</Link>
    <Link to="/">Learn</Link>
    <Link to="/wishlist">❤️ Wishlist</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/profile">Profile</Link>
  </div>
</nav>

)
}

export default Navbar