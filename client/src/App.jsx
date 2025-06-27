import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import CartPage from "./pages/CartPage/CartPage"
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage"
import OrderPage from "./pages/OrderPage/OrderPage"
import ProductListPage from "./pages/ProductListPage/ProductListPage"
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import ContactPage from "./pages/ContactPage/ContactPage"
import BlogPage from "./pages/BlogPage/BlogPage"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import AdminPage from "./pages/AdminPage/AdminPage"
import "./App.css"

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
             <Route path="/products/:productId" element={<ProductDetail />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App