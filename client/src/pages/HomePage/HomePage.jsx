
// client/src/pages/Home.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCart/ProductCard';

import Chatbox from '../../components/Chatbox/Chatbox';
import './HomePage.css';

/**
 * Home component displays the main page with product sections (female, male, popular, etc.).
 * Fetches products from API and renders them using ProductCard1 with badges.
 */
const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const searchBarRef = useRef(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/api/products', {
          headers: { 'Content-Type': 'application/json' },
        });
        const text = await response.text();
        if (!response.ok) {
          console.error('Response không OK:', { status: response.status, text: text.slice(0, 100) });
          throw new Error(`HTTP error! Status: ${response.status}, Body: ${text.slice(0, 100)}`);
        }
        const data = JSON.parse(text);
        // Ánh xạ dữ liệu và thêm badges
        const enhancedProducts = data.map(product => ({
          ...product,
          image: product.thumbnail || '/placeholder.svg',
          category: product.category_id === 1 ? 'nữ' : product.category_id === 2 ? 'nam' : null,
          badges: [
            product.quantity < 30 ? { type: 'limited', label: 'SỐ LƯỢNG HẠN CHẾ' } : null,
            product.view > 50 ? { type: 'popular', label: 'PHỔ BIẾN' } : null,
            product.price < 300000 ? { type: 'discount', label: '- GIÁ TỐT -' } : null,
          ].filter(Boolean),
          type: product.quantity < 10 ? 'bestseller' : // Quantity thấp
                 product.view > 50 ? 'popular' : // View cao
                 product.price < 300000 ? 'promotion' : // Giá thấp
                 new Date(product.created_at) > new Date(Date.now() - 30*24*60*60*1000) ? 'newest' : null, // Mới trong 30 ngày
        }));
        setProducts(enhancedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
        setError(`Không thể tải sản phẩm: ${err.message}`);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Memoized product filters
  const femaleProducts = useMemo(() => products.filter(p => p.category === 'nữ').slice(0, 6), [products]);
  const maleProducts = useMemo(() => products.filter(p => p.category === 'nam').slice(0, 6), [products]);
  const popularProducts = useMemo(() => products.filter(p => p.type === 'popular').slice(0, 4), [products]);
  // const bestsellerProducts = useMemo(() => products.filter(p => p.type === 'bestseller').slice(0, 2), [products]);
  const promotionProducts = useMemo(() => products.filter(p => p.type === 'promotion').slice(0, 4), [products]);
  // const newestProducts = useMemo(() => products.filter(p => p.type === 'newest').slice(0, 10), [products]);

  // Handle add to cart
  const handleAddToCart = useCallback((product) => {
    setIsAdding(product.id);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    }, 1000);
  }, [addToCart]);

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      return;
    }
    const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const results = products.filter(p =>
      p.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedQuery)
    );
    setSearchResults(results.length === 0 ? [{ id: 'not-found', name: 'Không tìm thấy sản phẩm', price: 0, image: '' }] : results);
  }, [searchQuery, products]);

  // Close search bar
  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  // Handle product selection from search
  const handleSelectProduct = useCallback((product) => {
    if (product.id !== 'not-found') {
      alert(`Chọn sản phẩm: ${product.name}`);
      handleCloseSearch();
    }
  }, [handleCloseSearch]);

  // Clear search input
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  // Handle scroll for header
  // useEffect(() => {
  //   const handleScroll = () => setScrollPosition(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // Handle click outside search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, handleCloseSearch]);

  // Format currency
  const formatCurrency = (value) => value.toLocaleString('vi-VN') + '₫';

  // Render product grid
  const renderProductGrid = useCallback((productList, columns = 1) => (
    <div className="products-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {productList.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isAdding={isAdding}
          handleAddToCart={handleAddToCart}
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  ), [isAdding, handleAddToCart, imageLoaded, setImageLoaded]);

  if (loading) return <div className="text-center mt-10 text-2xl">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 text-xl">{error}</div>;

  return (
    <div className="home">
      {isSearchOpen && (
        <div className="search-bar-container" ref={searchBarRef}>
          <div className="close-search" onClick={handleCloseSearch}>X</div>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && <span className="clear-search" onClick={clearSearch}>X</span>}
              </div>
              <button type="submit" className="search-icon">
                <span className="icon">🔍</span>
              </button>
            </form>
          </div>
          {searchResults.length > 0 && (
            <div className="search-results-container">
              <div className="search-results">
                {searchResults.map(result => (
                  result.id === 'not-found' ? (
                    <p key="not-found" style={{ textAlign: 'center', color: 'red' }}>{result.name}</p>
                  ) : (
                    <div key={result.id} className="search-result-item" onClick={() => handleSelectProduct(result)}>
                      <img src={result.image} alt={result.name} />
                      <div>
                        <h4>{result.name}</h4>
                        <p>{formatCurrency(result.price)}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="banner">
      </div>
      <div className="product-list">
        {/* Female Section */}
        <div className="gender-section">
          <div className="gender-image">
            <img src="https://coutura.monamedia.net/wp-content/uploads/2017/01/fashion-1-women.jpg" alt="Nữ" />
          </div>
          <div className="gender-products-female">
            <h3 className="left">Thời trang nữ</h3>
            <hr />
            {renderProductGrid(maleProducts, 3)}
          </div>
        </div>
        {/* Sale banner */}
        <div className="sale-banner-middle">
          <h2>GIẢM GIÁ 50% CHO TẤT CẢ SẢN PHẨM!</h2>
          <p>Nhanh tay đặt hàng ngay hôm nay!</p>
        </div>
        {/* Male Section */}
        <div className="gender-section">
          <div className="gender-products-male">
            <h3 className="right">Thời trang nam</h3>
            <hr />
            {renderProductGrid(femaleProducts, 3)}
          </div>
          <div className="gender-image">
            <img src="https://coutura.monamedia.net/wp-content/uploads/2017/01/fashion-1-men.jpg" alt="Nam" />
          </div>
        </div>
        {/* Discount banner */}
        <div className="sale-banner-middle">
          <h2>GIẢM GIÁ 20% CHO TÀI KHOẢN MỚI</h2>
          <p>Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt!</p>
        </div>
        {/* Popular, Bestseller, Promotion */}
        <div className="category-sections">
          <div className="category-column">
            <h3>Phổ biến</h3>
            {renderProductGrid(popularProducts, 1)}
          </div>
          <div className="category-column">
            <h3>Yêu thích</h3>
            {renderProductGrid(promotionProducts, 1)}
          </div>
          <div className="category-column">
            <h3>Khuyến mãi</h3>
            {renderProductGrid(promotionProducts, 1)}
          </div>
        </div>
        {/* Newest Products */}
      </div>
      <Chatbox onClose={() => {}} />
    </div>
  );
};

export default Home;
