// client/src/pages/ProductDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fetch product and related products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch single product
        const productResponse = await fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const productText = await productResponse.text();
        if (!productResponse.ok) {
          console.error('Product API error:', { status: productResponse.status, text: productText.slice(0, 100) });
          throw new Error(`HTTP error! Status: ${productResponse.status}`);
        }
        const productData = JSON.parse(productText);
        console.log('Product data received:', productData);

        // Map API fields
        const enhancedProduct = {
          ...productData,
          images: [productData.thumbnail || '/placeholder.svg'], // API only provides one image; use array for consistency
          image: productData.thumbnail || '/placeholder.svg',
          status: productData.quantity > 0 ? 'có sẵn' : 'hết hàng',
          sizes: ['S', 'M', 'L', 'XL'], // Fallback sizes
          category: productData.category_id === 1 ? 'nữ' : 'nam', // Simplified category
          gender: productData.category_id === 1 ? 'nữ' : 'nam',
          description: productData.description || 'Không có mô tả',
          isHot: productData.view > 50,
          isNew: new Date(productData.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          discount: productData.price < 300000 ? 10 : 0,
          limitedStock: productData.quantity < 30,
        };
        setProduct(enhancedProduct);
        setMainImage(enhancedProduct.images[0]);

        // Fetch related products
        const productsResponse = await fetch('http://127.0.0.1:5000/api/products', {
          headers: { 'Content-Type': 'application/json' },
        });
        const productsText = await productsResponse.text();
        if (!productsResponse.ok) {
          console.error('Products API error:', { status: productsResponse.status, text: productsText.slice(0, 100) });
          throw new Error(`HTTP error! Status: ${productsResponse.status}`);
        }
        const productsData = JSON.parse(productsText);
        console.log('Related products data received:', productsData);

        // Filter related products (same category_id, exclude current product)
        const related = productsData
          .filter(p => p.category_id === productData.category_id && p.id !== parseInt(productId))
          .slice(0, 5)
          .map(p => ({
            ...p,
            image: p.thumbnail || '/placeholder.svg',
            isHot: p.view > 50,
            isNew: new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            discount: p.price < 300000 ? 10 : 0,
            limitedStock: p.quantity < 30,
          }));
        setRelatedProducts(related);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Không thể tải sản phẩm: ${err.message}`);
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setQuantity(1);
      setImageLoaded(false);
    }
  }, [product]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!selectedSize) {
      alert('Vui lòng chọn kích cỡ sản phẩm.');
      return;
    }
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    addToCart({ ...product, selectedSize, quantity });
    setIsAdding(false);
    alert(`${quantity} sản phẩm "${product.name}" size ${selectedSize} đã được thêm vào giỏ hàng!`);
  }, [product, selectedSize, quantity, addToCart]);

  const handleBuyNow = useCallback(async () => {
    if (!selectedSize) {
      alert('Vui lòng chọn kích cỡ sản phẩm.');
      return;
    }
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    addToCart({ ...product, selectedSize, quantity });
    setIsAdding(false);
    navigate('/checkout');
  }, [product, selectedSize, quantity, addToCart, navigate]);

  const formatPrice = (price) => price.toLocaleString('vi-VN') + '₫';

  // Render HTML description safely
  const renderDescription = () => {
    return { __html: product?.description || 'Không có mô tả' };
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <Header scrollPosition={scrollPosition} onSearchClick={() => {}} />
        <div className="product-detail-container">
          <p className="text-center mt-10 text-2xl">Đang tải sản phẩm...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <Header scrollPosition={scrollPosition} onSearchClick={() => {}} />
        <div className="product-detail-container">
          <p className="text-center mt-10 text-red-500 text-xl">
            {error || 'Sản phẩm không tồn tại'}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Trang chủ</Link> / <Link to="/products">Sản phẩm</Link> / <span>{product.name}</span>
        </div>

        {/* Product Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            {!imageLoaded && <div className="spinner-large"></div>}
            <img
              src={mainImage}
              alt={product.name}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          </div>
          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} - ${index + 1}`}
                className={mainImage === img ? 'active' : ''}
                onClick={() => {
                  setMainImage(img);
                  setImageLoaded(false);
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>

          <div className="product-status-badges">
            {product.status === 'có sẵn' && <span className="status-badge available">Còn hàng</span>}
            {product.status === 'hết hàng' && <span className="status-badge out-of-stock">Hết hàng</span>}
            {product.isHot && <span className="status-badge popular">Phổ biến</span>}
            {product.discount > 0 && <span className="status-badge sale">Sale</span>}
            {product.limitedStock && <span className="status-badge limited">Số lượng ít</span>}
          </div>

          <div className="product-options">
            <h3>Chọn kích cỡ:</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''} ${product.status === 'hết hàng' ? 'disabled' : ''}`}
                  onClick={() => product.status !== 'hết hàng' && setSelectedSize(size)}
                  disabled={product.status === 'hết hàng'}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <button
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1 || product.status === 'hết hàng'}
            >
              -
            </button>
            <input type="text" value={quantity} readOnly disabled={product.status === 'hết hàng'} />
            <button
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              disabled={product.status === 'hết hàng'}
            >
              +
            </button>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={isAdding || !selectedSize || product.status === 'hết hàng'}
            >
              {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>
            <button
              type="button"
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={isAdding || !selectedSize || product.status === 'hết hàng'}
            >
              Mua ngay
            </button>
          </div>

          <div className="info-line shipping-info">
            <span>🚚 Dự kiến giao hàng: Thứ Sáu, 13/6 – Thứ Ba, 17/6</span>
            <span className="tooltip" data-tooltip="Thời gian giao hàng có thể thay đổi tùy khu vực">?</span>
          </div>
          <div className="info-line view-count">
            <span>👀 {product.view} người đã xem sản phẩm này</span>
          </div>
          {product.discount > 0 && (
            <div className="info-line promo-info">
              <span>🎁 Giảm giá đặc biệt: Áp dụng mã "SALE20" để được giảm thêm!</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="product-full-description">
        <h2>Mô tả sản phẩm</h2>
        <div className="description-content" dangerouslySetInnerHTML={renderDescription()} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>Sản phẩm liên quan</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;