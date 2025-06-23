import "./CartSteps.css"

const CartSteps = ({ currentStep }) => {
  const steps = [
    { 
      number: "01", 
      title: "GIỎ HÀNG", 
      subtitle: "Quản lý danh sách sản phẩm" 
    },
    { 
      number: "02", 
      title: "CHI TIẾT THANH TOÁN", 
      subtitle: "Thông tin giao hàng và thanh toán" 
    },
    { 
      number: "03", 
      title: "HOÀN THÀNH ĐƠN HÀNG", 
      subtitle: "Xem lại đơn hàng" 
    },
  ]

  return (
    <div className="cart-steps">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${
            currentStep === index + 1 ? "active" : ""
          } ${currentStep > index + 1 ? "completed" : ""}`}
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

export default CartSteps