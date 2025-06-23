import { useState } from 'react'
import { useCart } from '../context/CartContext'
import EmptyCart from './EmptyCart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

const Cart = () => {
  const { cartItems } = useCart()
  const [couponCode, setCouponCode] = useState('')

  // Xử lý cập nhật giỏ hàng
  const handleUpdateCart = () => {
    alert('Giỏ hàng đã được cập nhật!')
  }

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (couponCode.trim()) {
      alert(`Mã giảm giá "${couponCode}" đã được áp dụng!`)
    }
  }

  // Hiển thị giỏ hàng trống nếu không có sản phẩm
  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="cart-container">
      <h1>Giỏ hàng</h1>

      <div className="cart-content">
        <div className="cart-items">
          {/* Bảng sản phẩm */}
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>

          {/* Các nút hành động */}
          <div className="cart-actions">
            <div className="coupon-form">
              <input 
                type="text"
                placeholder="Mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Áp dụng</button>
            </div>
            <button className="update-cart" onClick={handleUpdateCart}>
              Cập nhật giỏ hàng
            </button>
          </div>
        </div>

        {/* Tổng giỏ hàng */}
        <CartSummary />
      </div>

      <style jsx>{`
        .cart-container {
          margin-bottom: 60px;
        }

        .cart-container h1 {
          margin-bottom: 30px;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }

        .cart-table th {
          text-align: left;
          padding: 15px 10px;
          border-bottom: 1px solid #eee;
          font-weight: 600;
        }

        .cart-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }

        .coupon-form {
          display: flex;
        }

        .coupon-form input {
          width: 200px;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-right: none;
          border-radius: 4px 0 0 4px;
        }

        .coupon-form button {
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 0 4px 4px 0;
          transition: background-color 0.3s;
        }

        .coupon-form button:hover {
          background-color: #555;
        }

        .update-cart {
          background-color: #f0f0f0;
          color: #333;
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: 500;
          transition: background-color 0.3s;
        }

        .update-cart:hover {
          background-color: #e0e0e0;
        }

        @media (max-width: 768px) {
          .cart-content {
            grid-template-columns: 1fr;
          }

          .cart-table {
            font-size: 14px;
          }

          .cart-actions {
            flex-direction: column;
            gap: 15px;
          }

          .coupon-form {
            width: 100%;
          }

          .coupon-form input {
            flex-grow: 1;
          }

          .update-cart {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Cart