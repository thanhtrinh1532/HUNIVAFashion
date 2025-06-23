// client/src/components/ProductCard.jsx
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart() || {};

  // Log product for debugging
  console.log('ProductCard: Rendering product:', product);

  if (!product || !product.id) {
    console.error('ProductCard: Invalid product data:', product);
    return null;
  }

  const handleAddToCart = () => {
    if (addToCart) addToCart(product);
    else console.warn('addToCart function not found!');
  };

  const formatCurrency = (value) => {
    if (typeof value !== 'number') {
      console.warn('Invalid price value:', value);
      return '0₫';
    }
    return value.toLocaleString('vi-VN') + '₫';
  };

  const enhancedProduct = {
    ...product,
    image: product.thumbnail || '/placeholder.svg',
    isHot: product.view > 50,
    isNew: new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    discount: product.price < 300000 ? 10 : 0,
    limitedStock: product.quantity < 30,
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={enhancedProduct.image} alt={enhancedProduct.name || 'Sản phẩm'} />
        <div className="product-badges">
          {enhancedProduct.isHot && <span className="badge hot">HOT</span>}
          {enhancedProduct.isNew && <span className="badge new">PHỔ BIẾN</span>}
          {enhancedProduct.discount > 0 && <span className="badge discount">-{enhancedProduct.discount}%</span>}
          {enhancedProduct.limitedStock && <span className="badge limited">SỐ LƯỢNG ÍT</span>}
        </div>
        <div className="product-actions">
          <button type="button" className="add-to-cart" onClick={handleAddToCart}>
            Thêm vào giỏ
          </button>
          <button type="button" className="add-to-wishlist" aria-label="Thêm vào danh sách yêu thích">
            <Heart size={18} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/products/${enhancedProduct.id}`}>
          <h3 className="product-name">{enhancedProduct.name || 'Unnamed Product'}</h3>
        </Link>
        <div className="product-price">
          {enhancedProduct.discount > 0 ? (
            <>
              <span className="original-price">{formatCurrency(enhancedProduct.price)}</span>
              <span className="discounted-price">
                {formatCurrency(enhancedProduct.price * (1 - enhancedProduct.discount / 100))}
              </span>
            </>
          ) : (
            <span>{formatCurrency(enhancedProduct.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;