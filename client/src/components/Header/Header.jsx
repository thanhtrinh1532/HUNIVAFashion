import { useState } from "react";
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import "./Header.css"

const Header = ({ onSearchClick }) => {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`header `}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">HUNIVA Fashion</Link>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`nav`}>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/blog">Giới thiệu</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/blog">Tin tức</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </nav>
        <div className="user-actions">
          <Link to="/cart" className="icon-button">
            <span className="icon">🛒</span>
            <span className="count">({getTotalItems()})</span>
          </Link>
          <Link to="/wishlist" className="icon-button">
            <span className="icon">❤️</span>
            <span className="count">1</span>
          </Link>
          <button className="icon-button" onClick={onSearchClick}>
            <span className="icon">🔍</span>
          </button>
          <Link to="/login" className="account-link">Tài khoản</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;