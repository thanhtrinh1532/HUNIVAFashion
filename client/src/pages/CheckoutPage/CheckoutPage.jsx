import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps"
import PaymentForm from "../../components/PaymentForm/PaymentForm"
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import Chatbox from '../../components/Chatbox/Chatbox';
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const { cart } = useCart()
  const navigate = useNavigate()
  const [orderCompleted, setOrderCompleted] = useState(false)

  const handleOrderComplete = (orderData) => {
    // Simulate API call
    console.log("Processing order:", orderData)
    setOrderCompleted(true)
    // Navigate to order success page after a delay
    setTimeout(() => {
      navigate("/order-success", { state: { orderData } })
    }, 2000)
  }

  if (orderCompleted) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-processing">
            <div className="processing-animation">
              <div className="spinner"></div>
            </div>
            <h2>Đang xử lý đơn hàng...</h2>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="container">
          <h1>Thanh toán</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className="separator">›</span>
            <Link to="/cart">Giỏ hàng</Link>
            <span className="separator">›</span>
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      <div className="container">
        <ProgressSteps currentStep={2} />

        {cart.items.length === 0 ? (
          <div className="empty-checkout">
            <div className="empty-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <Link to="/" className="return-shopping-btn">
              Quay lại mua sắm
            </Link>
          </div>
        ) : (
          <div className="checkout-content">
            <PaymentForm onOrderComplete={handleOrderComplete} />
            <OrderSummary />
          </div>
        )}
      </div>
            <Chatbox onClose={() => {}} />
    </div>
  )
}

export default CheckoutPage