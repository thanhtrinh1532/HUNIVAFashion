import { useCart } from "../context/CartContext"
import "./CartItem.css"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity)
    }
  }

  // Xử lý xóa sản phẩm
  const handleRemove = () => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      removeFromCart(item.id)
    }
  }

  // Xử lý input số lượng
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 0
    handleQuantityChange(value)
  }

  return (
    <div className="cart-item">
      {/* Thông tin sản phẩm */}
      <div className="product-info">
        <img 
          src={item.image || "/placeholder.svg?height=80&width=80"} 
          alt={item.name} 
          className="product-image" 
        />
        <div className="product-details">
          <h4>{item.name}</h4>
          <p className="product-color">Màu: {item.color || "Không xác định"}</p>
          <p className="product-size">Size: {item.size || "M"}</p>
        </div>
      </div>

      {/* Giá sản phẩm */}
      <div className="product-price">
        {item.price.toLocaleString("vi-VN")}₫
      </div>

      {/* Controls số lượng */}
      <div className="quantity-controls">
        <button 
          className="quantity-btn" 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={handleInputChange}
          className="quantity-input"
          min="1"
        />
        <button 
          className="quantity-btn" 
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Tổng tiền */}
      <div className="product-total">
        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
      </div>

      {/* Nút xóa */}
      <div className="product-actions">
        <button className="remove-btn" onClick={handleRemove} title="Xóa sản phẩm">
          ✕
        </button>
      </div>
    </div>
  )
}

export default CartItem