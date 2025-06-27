import { useCart } from "../../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps"
import EmptyCart from "../../components/EmptyCart/EmptyCart"
import ProductRecommendations from "../../components/ProductRecommendations/ProductRecommendations"
import Chatbox from '../../components/Chatbox/Chatbox';
import "./CartPage.css"

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getSubtotal, getShippingFee, getFinalTotal } = useCart()
  const navigate = useNavigate()

  const handleProceedToCheckout = () => {
    navigate("/checkout")
  }

  const handleUpdateCart = () => {
    // Simulate cart update
    alert("Giỏ hàng đã được cập nhật!")
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="container">
          <h1>Giỏ hàng của bạn</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className="separator">›</span>
            <span>Giỏ hàng</span>
          </div>
        </div>
      </div>

      <div className="container">
        <ProgressSteps currentStep={1} />

        {cart.items.length === 0 ? (
          <>
            <EmptyCart />
            <ProductRecommendations />
          </>
        ) : (
          <div className="cart-content">
            <div className="cart-main">
              <div className="cart-table-section">
                <div className="section-header">
                  <h2>Sản phẩm trong giỏ hàng</h2>
                  <span className="item-count">{cart.items.length} sản phẩm</span>
                </div>

                <div className="cart-table-container">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items.map((item) => (
                        <tr key={item.id} className="cart-item-row">
                          <td className="product-cell">
                            <div className="product-info">
                              <div className="product-image-wrapper-cart">
                                <img
                                  src={item.image || "/placeholder.svg?height=100&width=100"}
                                  alt={item.name}
                                  className="product-image-cart"
                                />
                              </div>
                              <div className="product-details">
                                <h3 className="product-name">{item.name}</h3>
                                <p className="product-sku">
                                  Mã: {item.sku || `SP${item.id.toString().padStart(3, "0")}`}
                                </p>
                                <div className="product-attributes">
                                  <span className="attribute">Màu: Đen</span>
                                  <span className="attribute">Size: M</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="price-cell">
                            <span className="price">{item.price.toLocaleString("vi-VN")}₫</span>
                          </td>
                          <td className="quantity-cell">
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn minus"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, Math.max(1, Number.parseInt(e.target.value) || 1))
                                }
                                className="quantity-input"
                                min="1"
                              />
                              <button
                                className="quantity-btn plus"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="total-cell">
                            <span className="total-price">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
                          </td>
                          <td className="action-cell">
                            <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Xóa sản phẩm">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="cart-actions">
                  <Link to="/" className="continue-shopping">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 12H5M12 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Tiếp tục mua sắm
                  </Link>
                  <button className="update-cart-btn" onClick={handleUpdateCart}>
                    Cập nhật giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            <div className="cart-sidebar">
              <div className="order-summary">
                <h3>Tóm tắt đơn hàng</h3>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Tạm tính ({cart.items.length} sản phẩm):</span>
                    <span className="amount">{getSubtotal().toLocaleString("vi-VN")}₫</span>
                  </div>

                  <div className="summary-row">
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Bạn được miễn phí vận chuyển!
                      </div>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-row total-row">
                    <span>Tổng cộng:</span>
                    <span className="total-amount">{getFinalTotal().toLocaleString("vi-VN")}₫</span>
                  </div>
                </div>

                <button className="checkout-btn" onClick={handleProceedToCheckout}>
                  Tiến hành thanh toán
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14m-7-7l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="payment-security">
                  <div className="security-badges">
                    <div className="security-item">
                      <span className="security-icon">🔒</span>
                      <span>Thanh toán bảo mật</span>
                    </div>
                    <div className="security-item">
                      <span className="security-icon">🚚</span>
                      <span>Giao hàng nhanh chóng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
            <Chatbox onClose={() => {}} />

    </div>
  )
}

export default CartPage