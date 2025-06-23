import React, { useState, useEffect } from 'react';
import './ContactPage.css';
// import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [setMap] = useState(null);
  const [mapCenter] = useState({ lat: 10.7769, lng: 106.7009 }); // Tọa độ TP.HCM
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(true);

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 12,
      });
      new window.google.maps.Marker({
        position: mapCenter,
        map: mapInstance,
        title: "Văn phòng HUNIVA"
      });
      setMap(mapInstance);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [mapCenter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setResponse('Vui lòng đăng nhập để gửi liên hệ!');
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      setResponse(data.message || 'Gửi liên hệ thành công');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setResponse('Gửi liên hệ thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ff6b6b to-gray-200 flex flex-col">
     

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="contact-wrapper">
          <div className="contact-left">
            <div className="contact-section">
              <h2 className="contact-title">Liên Hệ Với Chúng Tôi</h2>
              <p className="contact-desc">Bạn có câu hỏi, cần hỗ trợ, hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi? Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>
            </div>
            <div className="contact-map">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.496094120155!2d106.6980253153343!3d10.773955592323917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee9311f5977%3A0x837f54d2271d3b90!2zMTA3LzIzIEPGsOG7nWNoIE3hu5FuZyBUaMOgbmggOCwgUGjGsOG7nW5nIDcsIFTDom4gQsOsbmgsIFRow6BuaCBwaOG7kSBI4buNYyBN4bqhbmc!5e0!3m2!1svi!2s!4v1718075270297!5m2!1svi!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="contact-demo">
              <h3 className="demo-title">Yêu Cầu Thử Dùng</h3>
              <form className="demo-form">
                <input type="text" placeholder="Họ và tên" className="demo-input" />
                <input type="email" placeholder="Email" className="demo-input" />
                <button className="demo-btn">Yêu cầu</button>
              </form>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-info">
              <h3 className="info-title">Thông Tin Liên Hệ</h3>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <p> 107/23 Điên Biên Phủ, Quận Thuận Hóa, TP.Huế</p>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <p>(+84) 0313-728-397</p>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <p>suport@hunivafashion.com</p>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <h3 className="form-title">Liên Hệ Ngay</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Họ và tên (*)"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Email (*)"
                  required
                />
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-input"
                  placeholder="Chủ đề (*)"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  placeholder="Nội dung (*)"
                  required
                />
                <button
                  type="submit"
                  className="form-btn"
                >
                  Gửi
                </button>
                {response && <p className="form-response">{response}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h1 className="logo text-2xl font-extrabold text-ff6b6b">HUNIVA FASHION.</h1>
          </div>
          <div className="footer-info">
            <p className="text-gray-600">Địa chỉ: 107/23 Điên Biên Phủ, Quận Thuận Hóa, TP.Huế</p>
            <p className="text-gray-600">Số điện thoại: (84) 913-728-397</p>
            <p className="text-gray-600">Email: info@themonaglobal.com</p>
          </div>
          <div className="footer-hours">
            <p className="text-gray-600">Thứ hai - Thứ sáu: 09:00 - 18:00</p>
            <p className="text-gray-600">Thứ bảy: 09:00 - 15:00</p>
            <p className="text-gray-600">Chủ nhật: 09:00 - 12:00</p>
          </div>
          <div className="footer-payment">
            <img src="/visa.png" alt="Visa" className="payment-icon" />
            <img src="/mastercard.png" alt="Mastercard" className="payment-icon" />
            <img src="/paypal.png" alt="Paypal" className="payment-icon" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;