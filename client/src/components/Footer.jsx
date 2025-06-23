import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>HUNIVA Fashion</h3>
          <p>Chào mừng đến với HUNIVA Fashion - điểm đến thời trang dành cho mọi phong cách. Chúng tôi cung cấp các sản phẩm chất lượng cao, từ thời trang nam, nữ đến phụ kiện thời thượng.</p>
        </div>
        <div className="footer-section links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="/products">Sản phẩm</a></li>
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/contact">Liên hệ</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Liên hệ</h3>
          <p>Email: <a href="mailto:support@hunivafashion.com">support@hunivafashion.com</a></p>
          <p>Hotline: <a href="tel:0909123456">0909 123 456</a></p>
          <p>Địa chỉ: 107/23 Điên Biên Phủ, Quận Thuận Hóa, TP.Huế</p>
        </div>
        <div className="footer-section social">
          <h3>Theo dõi chúng tôi</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 HUNIVA Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;