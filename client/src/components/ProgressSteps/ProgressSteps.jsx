import "./ProgressSteps.css"

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    {
      number: "01",
      title: "GIỎ HÀNG",
      subtitle: "Quản lý danh sách sản phẩm",
      path: "/cart",
    },
    {
      number: "02",
      title: "CHI TIẾT THANH TOÁN",
      subtitle: "Thanh toán danh sách sản phẩm",
      path: "/checkout",
    },
    {
      number: "03",
      title: "HOÀN THÀNH ĐƠN HÀNG",
      subtitle: "Xem lại đơn hàng",
      path: "/order-success",
    },
  ]

  return (
    <div className="progress-steps">
      <div className="progress-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${currentStep === index + 1 ? "active" : ""} ${currentStep > index + 1 ? "completed" : ""}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-subtitle">{step.subtitle}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${currentStep > index + 1 ? "completed" : ""}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressSteps