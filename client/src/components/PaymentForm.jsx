import { useState } from "react"
import { useCart } from "../context/CartContext"
import "./PaymentForm.css"

const PaymentForm = ({ onOrderComplete }) => {
  const { cart, clearCart, getFinalTotal } = useCart()
  const [formData, setFormData] = useState({
    // Thông tin giao hàng
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    // Phương thức thanh toán
    paymentMethod: "cod",
    // Ghi chú
    notes: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cities = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hcm", label: "TP. Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "haiphong", label: "Hải Phòng" },
    { value: "cantho", label: "Cần Thơ" },
  ]

  const districts = {
    hanoi: [
      { value: "ba-dinh", label: "Ba Đình" },
      { value: "hoan-kiem", label: "Hoàn Kiếm" },
      { value: "dong-da", label: "Đống Đa" },
    ],
    hcm: [
      { value: "quan-1", label: "Quận 1" },
      { value: "quan-2", label: "Quận 2" },
      { value: "quan-3", label: "Quận 3" },
    ],
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ"
    }

    if (!formData.city) {
      newErrors.city = "Vui lòng chọn tỉnh/thành phố"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderData = {
        ...formData,
        items: cart.items,
        total: getFinalTotal(),
        orderDate: new Date().toISOString(),
        orderId: `ORD${Date.now()}`,
      }

      clearCart()
      onOrderComplete(orderData)
    } catch (error) {
      console.error("Order submission failed:", error)
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section-header">
            <h3>Thông tin giao hàng</h3>
            <span className="required-note">* Thông tin bắt buộc</span>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="fullName">Họ và tên *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? "error" : ""}
                placeholder="Nhập họ và tên đầy đủ"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                placeholder="example@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
                placeholder="0123456789"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Địa chỉ *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "error" : ""}
                placeholder="Số nhà, tên đường, phường/xã"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">Tỉnh/Thành phố *</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={errors.city ? "error" : ""}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="district">Quận/Huyện</label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                disabled={!formData.city}
              >
                <option value="">Chọn quận/huyện</option>
                {formData.city &&
                  districts[formData.city]?.map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h3>Phương thức thanh toán</h3>
          </div>

          <div className="payment-methods">
            <label className={`payment-method ${formData.paymentMethod === "cod" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleInputChange}
              />
              <div className="payment-content">
                <div className="payment-icon">💵</div>
                <div className="payment-info">
                  <span className="payment-title">Thanh toán khi nhận hàng (COD)</span>
                  <span className="payment-desc">Thanh toán bằng tiền mặt khi nhận hàng</span>
                </div>
              </div>
            </label>

            <label className={`payment-method ${formData.paymentMethod === "bank" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={formData.paymentMethod === "bank"}
                onChange={handleInputChange}
              />
              <div className="payment-content">
                <div className="payment-icon">🏦</div>
                <div className="payment-info">
                  <span className="payment-title">Chuyển khoản ngân hàng</span>
                  <span className="payment-desc">Chuyển khoản trực tiếp vào tài khoản</span>
                </div>
              </div>
            </label>

            <label className={`payment-method ${formData.paymentMethod === "momo" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="momo"
                checked={formData.paymentMethod === "momo"}
                onChange={handleInputChange}
              />
              <div className="payment-content">
                <div className="payment-icon">📱</div>
                <div className="payment-info">
                  <span className="payment-title">Ví MoMo</span>
                  <span className="payment-desc">Thanh toán qua ví điện tử MoMo</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h3>Ghi chú đơn hàng</h3>
          </div>

          <div className="form-group">
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn..."
              rows="4"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="btn-spinner"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              Đặt hàng ngay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default PaymentForm