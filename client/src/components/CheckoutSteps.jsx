import "./CheckoutSteps.css"

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: "01", title: "GIỎ HÀNG", subtitle: "Quản lý danh sách sản phẩm" },
    { number: "02", title: "CHI TIẾT THANH TOÁN", subtitle: "Thông tin thanh toán của bạn" },
    { number: "03", title: "HOÀN THÀNH ĐƠN HÀNG", subtitle: "Gửi đơn hàng" },
  ]

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${currentStep > index + 1 ? "completed" : ""} ${currentStep === index + 1 ? "active" : ""}`}
        >
          <div className="step-number">{step.number}</div>
          <div className="step-content">
            <h3>{step.title}</h3>
            <p>{step.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CheckoutSteps