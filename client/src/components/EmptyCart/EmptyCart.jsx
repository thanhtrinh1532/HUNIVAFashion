import { Link } from "react-router-dom"
import "./EmptyCart.css"

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">🛒</div>
      <h2>Giỏ hàng của bạn đang trống</h2>
      <p>Trước khi tiến hành thanh toán, bạn cần thêm một số sản phẩm vào giỏ hàng.</p>
      <p>Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.</p>
      <Link to="/" className="return-to-shop-btn">
        QUAY LẠI CỬA HÀNG
      </Link>
    </div>
  )
}

export default EmptyCart