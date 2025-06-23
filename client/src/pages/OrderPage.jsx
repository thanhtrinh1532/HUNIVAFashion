import { useLocation, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProgressSteps from "../components/ProgressSteps"
import "./OrderPage.css"

const OrderPage = () => {
  const location = useLocation()
  const [orderData, setOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get order details
    const timer = setTimeout(() => {
      if (location.state?.orderData) {
        setOrderData(location.state.orderData)
      } else {
        // Fallback order data for direct access
        setOrderData({
          orderId: `ORD${Date.now()}`,
          orderDate: new Date().toISOString(),
          fullName: "Nguyễn Văn A",
          email: "example@email.com",
          phone: "0123456789",
          address: "123 Đường ABC, Phường XYZ",
          city: "Hà Nội",
          paymentMethod: "cod",
          items: [],
          total: 0,
        })
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [location.state])

  if (isLoading) {
    return (
      <div className="order-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h2>Đang tải thông tin đơn hàng...</h2>
          </div>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="order-page">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h2>Không tìm thấy đơn hàng</h2>
            <p>Đơn hàng không tồn tại hoặc đã bị xóa</p>
            <Link to="/" className="return-home-btn">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentMethodText = (method) => {
    const methods = {
      cod: "Thanh toán khi nhận hàng (COD)",
      bank: "Chuyển khoản ngân hàng",
      momo: "Ví MoMo",
    }
    return methods[method] || method
  }

  const getOrderStatus = () => {
    return {
      status: "confirmed",
      text: "Đã xác nhận",
      color: "#10b981",
      description: "Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị",
    }
  }

  const orderStatus = getOrderStatus()

  return (
    <div className="order-page">
      <div className="order-header">
        <div className="container">
          <h1>Chi tiết đơn hàng</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className="separator">›</span>
            <Link to="/cart">Giỏ hàng</Link>
            <span className="separator">›</span>
            <Link to="/checkout">Thanh toán</Link>
            <span className="separator">›</span>
            <span>Đơn hàng</span>
          </div>
        </div>
      </div>

      <div className="container">
        <ProgressSteps currentStep={3} />

        <div className="order-success-banner">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <div className="success-text">
              <h2>Đặt hàng thành công!</h2>
              <p>Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
            </div>
          </div>
        </div>

        <div className="order-content">
          <div className="order-main">
            <div className="order-info-section">
              <div className="section-header">
                <h3>Thông tin đơn hàng</h3>
                <div className="order-status" style={{ color: orderStatus.color }}>
                  <span className="status-dot" style={{ backgroundColor: orderStatus.color }}></span>
                  {orderStatus.text}
                </div>
              </div>

              <div className="order-details-grid">
                <div className="detail-item">
                  <label>Mã đơn hàng:</label>
                  <span className="order-id">{orderData.orderId}</span>
                </div>
                <div className="detail-item">
                  <label>Ngày đặt hàng:</label>
                  <span>{formatDate(orderData.orderDate)}</span>
                </div>
                <div className="detail-item">
                  <label>Phương thức thanh toán:</label>
                  <span>{getPaymentMethodText(orderData.paymentMethod)}</span>
                </div>
                <div className="detail-item">
                  <label>Trạng thái:</label>
                  <span style={{ color: orderStatus.color, fontWeight: 600 }}>{orderStatus.description}</span>
                </div>
              </div>
            </div>

            <div className="shipping-info-section">
              <div className="section-header">
                <h3>Thông tin giao hàng</h3>
              </div>

              <div className="shipping-details">
                <div className="shipping-address">
                  <div className="address-header">
                    <h4>Địa chỉ nhận hàng</h4>
                  </div>
                  <div className="address-content">
                    <p className="recipient-name">{orderData.fullName}</p>
                    <p className="recipient-phone">{orderData.phone}</p>
                    <p className="recipient-address">
                      {orderData.address}, {orderData.city}
                    </p>
                  </div>
                </div>

                <div className="delivery-timeline">
                  <h4>Tiến trình giao hàng</h4>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5>Đơn hàng đã được xác nhận</h5>
                        <p>{formatDate(orderData.orderDate)}</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5>Đang chuẩn bị hàng</h5>
                        <p>Dự kiến: Trong 24h</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5>Đang giao hàng</h5>
                        <p>Dự kiến: 2-3 ngày làm việc</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5>Đã giao hàng</h5>
                        <p>Chờ xác nhận</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {orderData.items && orderData.items.length > 0 && (
              <div className="order-items-section">
                <div className="section-header">
                  <h3>Sản phẩm đã đặt</h3>
                  <span className="items-count">{orderData.items.length} sản phẩm</span>
                </div>

                <div className="items-list">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image-wrapper">
                        <img
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          className="item-image"
                        />
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-sku">Mã: {item.sku || `SP${item.id.toString().padStart(3, "0")}`}</p>
                        <div className="item-attributes">
                          <span>Màu: Đen</span>
                          <span>Size: M</span>
                        </div>
                      </div>
                      <div className="item-quantity">
                        <span>Số lượng: {item.quantity}</span>
                      </div>
                      <div className="item-price">
                        <span className="unit-price">{item.price.toLocaleString("vi-VN")}₫</span>
                        <span className="total-price">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="order-sidebar">
            <div className="order-summary-card">
              <h3>Tóm tắt thanh toán</h3>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>{(orderData.total || 0).toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span className="free-shipping">Miễn phí</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Tổng cộng:</span>
                  <span className="total-amount">{(orderData.total || 0).toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
            </div>

            <div className="order-actions">
              <Link to="/" className="continue-shopping-btn">
                Tiếp tục mua sắm
              </Link>
              <button className="track-order-btn">Theo dõi đơn hàng</button>
            </div>

            <div className="support-info">
              <h4>Cần hỗ trợ?</h4>
              <div className="support-item">
                <span className="support-icon">📞</span>
                <div>
                  <p>Hotline: 1900 1234</p>
                  <small>8:00 - 22:00 (Tất cả các ngày)</small>
                </div>
              </div>
              <div className="support-item">
                <span className="support-icon">✉️</span>
                <div>
                  <p>Email: support@coutura.com</p>
                  <small>Phản hồi trong 24h</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage