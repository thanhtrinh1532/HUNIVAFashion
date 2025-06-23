import { useCart } from "../context/CartContext"
import "./OrderSummary.css"

const OrderSummary = () => {
  const { cart, getSubtotal, getShippingFee, getFinalTotal } = useCart()

  return (
    <div className="order-summary">
      <div className="summary-header">
        <h3>Tóm tắt đơn hàng</h3>
        <span className="item-count">{cart.items.length} sản phẩm</span>
      </div>

      <div className="order-items">
        {cart.items.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image-wrapper">
              <img src={item.image || "/placeholder.svg?height=60&width=60"} alt={item.name} className="item-image" />
              <span className="item-quantity">{item.quantity}</span>
            </div>
            <div className="item-details">
              <h4 className="item-name">{item.name}</h4>
              <p className="item-sku">Mã: {item.sku || `SP${item.id.toString().padStart(3, "0")}`}</p>
              <div className="item-attributes">
                <span>Màu: Đen</span>
                <span>Size: M</span>
              </div>
            </div>
            <div className="item-price">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</div>
          </div>
        ))}
      </div>

      <div className="summary-calculations">
        <div className="calculation-row">
          <span>Tạm tính:</span>
          <span className="amount">{getSubtotal().toLocaleString("vi-VN")}₫</span>
        </div>

        <div className="calculation-row">
          <span>Phí vận chuyển:</span>
          <span className="amount">
            {getShippingFee() === 0 ? (
              <span className="free-shipping">Miễn phí</span>
            ) : (
              `${getShippingFee().toLocaleString("vi-VN")}₫`
            )}
          </span>
        </div>

        {getShippingFee() === 0 && (
          <div className="shipping-promotion">
            <div className="promotion-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Miễn phí vận chuyển cho đơn hàng trên 500.000₫
            </div>
          </div>
        )}

        <div className="calculation-divider"></div>

        <div className="calculation-row total-row">
          <span>Tổng cộng:</span>
          <span className="total-amount">{getFinalTotal().toLocaleString("vi-VN")}₫</span>
        </div>
      </div>

      <div className="order-policies">
        <div className="policy-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Đổi trả miễn phí trong 30 ngày</span>
        </div>
        <div className="policy-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Bảo hành chính hãng</span>
        </div>
        <div className="policy-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Hỗ trợ 24/7</span>
        </div>
      </div>

      <div className="order-note">
        <p>* Giá đã bao gồm VAT</p>
        <p>* Thời gian giao hàng: 2-3 ngày làm việc</p>
      </div>
    </div>
  )
}

export default OrderSummary