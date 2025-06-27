import React, { useState, useEffect, useCallback } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  useEffect(() => {
    if (!hasGreeted) {
      const initialMessage = 'Chào bạn yêu ơi! Tìm outfit xinh xắn nào? Kiểm tra sản phẩm bên dưới nha!';
      const productSuggestions = [
        { id: 1, name: 'Áo Thun Basic', price: '250.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8961ORYf8Oy6OpVRDQXPNhccJJl6SfyccSw&s' },
        { id: 2, name: 'Quần Jeans Slim', price: '450.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpaOoTjqpz8wcSyySDrY_o9IAZkcf1iJJzw&s' },
        { id: 3, name: 'Váy Maxi Floral', price: '600.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LfT3VXCeR8D_EknAQOR_o1ILVGUcyxhsBw&s' },
      ];
      setMessages([{ text: initialMessage, sender: 'bot', suggestions: productSuggestions }]);
      setHasGreeted(true);
    }
  }, [hasGreeted]);

  const predefinedResponses = {
    size: [
      'Size xinh: S (40-50kg), M (50-60kg), L (60-70kg). Cần tư vấn không nè?',
      'Size áo: S (80-84cm), M (84-88cm), L (88-92cm). Chọn size nào xinh xắn?',
      'Cho mình chiều cao, cân nặng để tư vấn size xịn nha!',
      'Size shop chuẩn lắm! S (40-50kg), M (50-60kg), L (60-70kg). Size nào phù hợp?',
      'Size S (nhỏ), M (vừa), L (lớn) nha! Muốn mình đo giúp không?'
    ],
    price: [
      'Giá từ 200k - 1tr nha! Muốn biết giá món nào?',
      'Áo 200k, quần 350k, váy 500k. Xem giá chi tiết không?',
      'Giá siêu yêu: 200k - 1tr. Thích món nào xinh?',
      'Shop có giá 200k - 1tr nè! Gợi ý món nào không?',
      'Giá hấp dẫn: áo 200k, quần 350k, váy 500k. Chọn đi!'
    ],
    return: [
      'Đổi trả 7 ngày nếu còn nguyên nha! Hỏi thêm gì không?',
      'Đổi trả miễn phí nếu lỗi, 7 ngày thôi. Muốn chi tiết không?',
      '7 ngày đổi trả xịn sò! Giữ tag nhé, hỏi thêm không?',
      'Hỗ trợ đổi trả 7 ngày nếu nguyên vẹn nha! Cần gì thêm?',
      'Đổi trả 7 ngày, miễn phí nếu lỗi shop. Hỏi gì nữa không?'
    ],
    discount: [
      'Mua 2 tặng 1 hoặc giảm 20% từ 500k nha! Chọn đi!',
      'Giảm 15% đơn đầu hoặc freeship nè! Thích không?',
      'Ưu đãi hot: giảm 20% từ 500k. Áp dụng ngay không?',
      'Mua 2 tặng 1 hoặc freeship toàn quốc nha! Chọn đi!',
      'Giảm 15% cho khách mới nè! Thử không?'
    ],
    delivery: [
      'Giao hàng 2-3 ngày nha! Có thắc mắc gì không?',
      'Freeship nội thành nếu trên 500k nha! Muốn biết thêm không?',
      'Giao tận nơi, 2-3 ngày thôi. Cần gì thêm không?',
      'Đơn giao 2-3 ngày nha! Freeship nếu trên 500k!',
      'Ship siêu nhanh 2-3 ngày! Hỏi gì thêm không?'
    ],
    complaint: [
      'Sorry nha nếu có gì không ổn! Kể mình nghe để fix nhé!',
      'Có vấn đề gì hả? Mình hỗ trợ ngay nha!',
      'Đừng buồn nha, mình sẽ xử lý ngay! Kể đi!',
      'Huhu, lỗi gì vậy? Mình sửa ngay nha!',
      'Không hài lòng hả? Mình lo ngay cho bạn nha!'
    ],
    orderStatus: [
      'Đơn đang xử lý nha! Giao trong 2-3 ngày!',
      'Check rồi, đơn đang giao nha! Mã qua SĐT nhé!',
      'Đơn ok nha, giao 2-3 ngày, update qua tin nhắn!',
      'Đơn trên đường nha! Sẽ đến sớm thôi!',
      'Đơn an toàn nha! Giao 2-3 ngày, hỏi gì thêm không?'
    ],
    offTopic: [
      'Chủ đề thú vị nha! Nhưng mình chuyên outfit, muốn xem không?',
      'Lạc đề rồi nha! Quay lại outfit xinh không?',
      'Dễ thương quá, nhưng mình giúp outfit nha! Xem không?',
      'Wow, hay thật! Nhưng mình có đồ xinh lắm, xem không?',
      'Đi xa rồi nha! Chọn outfit xinh với mình không?'
    ]
  };

  const paymentOptions = [
    { id: 1, name: 'Thanh toán QR Vietcombank', text: 'STK: 1027580508, Lê Thị Tuong Vi. Quét mã QR nhé!', qr: 'https://qrco.de/bg4FTG' },
    { id: 2, name: 'Chuyển khoản/COD', text: 'Nhập thông tin chuyển khoản hoặc COD.' },
  ];

  const getRandomResponse = useCallback((responses) => responses[Math.floor(Math.random() * responses.length)], []);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let botResponse;

      if (lowerInput.includes('size') || lowerInput.includes('kích thước')) botResponse = getRandomResponse(predefinedResponses.size);
      else if (lowerInput.includes('giá') || lowerInput.includes('bao nhiêu') || lowerInput.includes('price')) botResponse = getRandomResponse(predefinedResponses.price);
      else if (lowerInput.includes('đổi') || lowerInput.includes('trả') || lowerInput.includes('return')) botResponse = getRandomResponse(predefinedResponses.return);
      else if (lowerInput.includes('ưu đãi') || lowerInput.includes('khuyến mãi') || lowerInput.includes('discount')) botResponse = getRandomResponse(predefinedResponses.discount);
      else if (lowerInput.includes('giao') || lowerInput.includes('hàng') || lowerInput.includes('delivery')) botResponse = getRandomResponse(predefinedResponses.delivery);
      else if (lowerInput.includes('khiếu nại') || lowerInput.includes('lỗi') || lowerInput.includes('complaint')) botResponse = getRandomResponse(predefinedResponses.complaint);
      else if (lowerInput.includes('trạng thái') || lowerInput.includes('đơn hàng') || lowerInput.includes('status')) botResponse = getRandomResponse(predefinedResponses.orderStatus);
      else if (orderConfirmed && (lowerInput.includes('mua thêm') || lowerInput.includes('xem trạng thái'))) {
        if (lowerInput.includes('mua thêm')) {
          const productSuggestions = [
            { id: 1, name: 'Áo Thun Basic', price: '250.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8961ORYf8Oy6OpVRDQXPNhccJJl6SfyccSw&s' },
            { id: 2, name: 'Quần Jeans Slim', price: '450.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpaOoTjqpz8wcSyySDrY_o9IAZkcf1iJJzw&s' },
            { id: 3, name: 'Váy Maxi Floral', price: '600.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LfT3VXCeR8D_EknAQOR_o1ILVGUcyxhsBw&s' },
          ];
          botResponse = 'Ok nha, tiếp tục mua thêm đây! Chọn sản phẩm xinh xắn nè:';
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot', suggestions: productSuggestions }]);
          setOrderConfirmed(false); // Reset để quay lại trạng thái mua sắm
          return;
        } else {
          botResponse = getRandomResponse(predefinedResponses.orderStatus);
        }
      } else if (orderConfirmed) {
        botResponse = 'Cảm ơn bạn đã mua nha! Có gì hỏi thêm mình nhé, mình gợi ý outfit xinh xắn tiếp nha!';
        const productSuggestions = [
          { id: 1, name: 'Áo Thun Basic', price: '250.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8961ORYf8Oy6OpVRDQXPNhccJJl6SfyccSw&s' },
          { id: 2, name: 'Quần Jeans Slim', price: '450.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpaOoTjqpz8wcSyySDrY_o9IAZkcf1iJJzw&s' },
          { id: 3, name: 'Váy Maxi Floral', price: '600.000 VNĐ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LfT3VXCeR8D_EknAQOR_o1ILVGUcyxhsBw&s' },
        ];
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot', suggestions: productSuggestions }]);
        setOrderConfirmed(false); // Reset để quay lại tư vấn
        return;
      } else botResponse = getRandomResponse(predefinedResponses.offTopic);

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
  }, [inputMessage, getRandomResponse, orderConfirmed]);

  const handleAddToCart = useCallback((product) => {
    if (cartItems.length >= 5) {
      setMessages(prev => [...prev, { text: 'Giỏ đầy (tối đa 5)! Thêm không nổi nữa nha!', sender: 'bot' }]);
      return;
    }
    setCartItems(prev => [...prev, product]);
    setMessages(prev => [...prev, { text: `Đã thêm ${product.name} vào giỏ nha!`, sender: 'bot' }]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: 'Chọn phương thức thanh toán nha!', sender: 'bot', payment: paymentOptions }
      ]);
    }, 500);
  }, [cartItems.length]);

  const handlePaymentSelect = useCallback((method) => {
    setPaymentMethod(method);
    if (method.id === 1) {
      setMessages(prev => [...prev, { text: 'Bạn chọn QR! Quét mã sau khi thanh toán nha:', sender: 'bot', qr: method.qr }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Gửi: Họ tên, SĐT, Địa chỉ giao hàng nha!', sender: 'bot' }]);
      }, 500);
    } else {
      setMessages(prev => [...prev, { text: 'Bạn chọn Chuyển khoản/COD! Nhập: Họ tên, SĐT, Địa chỉ nha:', sender: 'bot' }]);
    }
  }, []);

  const handleInfoSubmit = useCallback(() => {
    if (customerInfo.name && customerInfo.phone && customerInfo.address) {
      setMessages(prev => [
        ...prev,
        { text: `Đã nhận: ${customerInfo.name}, ${customerInfo.phone}, ${customerInfo.address}. Cảm ơn nha, thông tin đúng chưa?`, sender: 'bot' }
      ]);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { text: 'Cảm ơn bạn đã mua hàng nha! Đơn sẽ giao 2-3 ngày, mình gửi mã theo dõi qua SĐT nhé!', sender: 'bot' }
        ]);
        setOrderConfirmed(true);
        setCustomerInfo({ name: '', phone: '', address: '' });
        setPaymentMethod(null);
      }, 500);
    } else {
      setMessages(prev => [...prev, { text: 'Thiếu info nha! Điền đầy đủ Họ tên, SĐT, Địa chỉ đi!', sender: 'bot' }]);
    }
  }, [customerInfo]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  if (isMinimized && !isOpen) {
    return <div className="chatbox-toggle" onClick={handleToggle}>💬 {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}</div>;
  }

  if (!isOpen) return null;

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <img src="https://via.placeholder.com/30" alt="Logo" className="chatbox-logo" />
        <h3>HANIVA FASHION</h3>
        <button onClick={handleClose} className="close-btn">×</button>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
            {msg.suggestions && (
              <div className="suggestions">
                {msg.suggestions.map(product => (
                  <div key={product.id} className="suggestion-item">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <p>{product.name}</p>
                      <p>{product.price}</p>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>Thêm</button>
                  </div>
                ))}
              </div>
            )}
            {msg.payment && (
              <div className="payment-options">
                {msg.payment.map(option => (
                  <button key={option.id} onClick={() => handlePaymentSelect(option)} className="payment-btn">
                    {option.name}
                  </button>
                ))}
              </div>
            )}
            {msg.qr && <img src={msg.qr} alt="QR Code" className="qr-code" />}
            {paymentMethod && paymentMethod.id === 2 && (
              <div className="info-input">
                <input
                  placeholder="Họ tên"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
                <input
                  placeholder="SĐT"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  placeholder="Địa chỉ"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                />
                <button onClick={handleInfoSubmit}>Gửi</button>
              </div>
            )}
            {orderConfirmed && !inputMessage && (
              <div className="post-order">
                <button onClick={() => setMessages(prev => [...prev, { text: 'Mình muốn mua thêm!', sender: 'user' }])}>Mua thêm</button>
                <button onClick={() => setMessages(prev => [...prev, { text: 'Xem trạng thái đơn!', sender: 'user' }])}>Xem trạng thái</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Hỏi về size, giá..."
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default Chatbox;