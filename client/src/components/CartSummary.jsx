import { useState } from "react"
import { useCart } from "../context/CartContext"
import "./CartSummary.css"

const CartSummary = () => {
  const { getCartTotal, items } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  
  const subtotal = getCartTotal()
  const shipping = subtotal > 500000 ? 0 : 30000 // Miễn phí ship nếu > 500k
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal + shipping - discountAmount

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = () => {
    const validCoupons = {
      "SAVE10": 10,
      "SAVE20": 20,
      "FREESHIP": 0
    }
    
    if (validCoupons[couponCode.toUpperCase()]) {
      setDiscount(validCoupons[couponCode.toUpperCase()])
      alert(`Áp dụng mã giảm giá thành công! Giảm ${validCoupons[couponCode.toUpperCase()]}%`)
    } else {
      alert("Mã giảm giá không hợp lệ!")
    }
  }

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Giỏ hàng trống!")
      return
    }
    
    // Logic thanh toán
    alert("Chuyển đến trang thanh toán...")
  }

  return (
    <div className="cart-summary">
      <h3>Tổng đơn hàng</h3>

      {/* Tạm tính */}
      <div className="summary-row">
        <span>Tạm tính ({items.length} sản phẩm):</span>
        <span>{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      {/* Phí vận chuyển */}
      <div className="summary-row">
        <span>Phí vận chuyển:</span>
        <span>
          {shipping === 0 ? (
            <span className="free-shipping">Miễn phí</span>
          ) : (
            `${shipping.toLocaleString("vi-VN")}₫`
          )}
        </span>
      </div>

      {/* Giảm giá */}
      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Giảm giá ({discount}%):</span>
          <span>-{discountAmount.toLocaleString("vi-VN")}₫</span>
        </div>
      )}

      <div className="summary-divider"></div>

      {/* Tổng cộng */}
      <div className="summary-row total">
        <span>Tổng cộng:</span>
        <span>{total.toLocaleString("vi-VN")}₫</span>
      </div>

      {/* Mã giảm giá */}
      <div className="coupon-section">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          className="coupon-input"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="apply-coupon" onClick={handleApplyCoupon}>
          Áp dụng
        </button>
      </div>

      {/* Ghi chú miễn phí ship */}
      {subtotal < 500000 && (
        <div className="shipping-note">
          <p>💡 Mua thêm {(500000 - subtotal).toLocaleString("vi-VN")}₫ để được miễn phí vận chuyển!</p>
        </div>
      )}

      {/* Nút thanh toán */}
      <button className="checkout-btn" onClick={handleCheckout}>
        TIẾN HÀNH THANH TOÁN
      </button>
    </div>
  )
}

export default CartSummary