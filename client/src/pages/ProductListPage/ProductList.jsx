import React from 'react';
import './ProductList.css'; // Tạo file CSS nếu cần
import ProductRecommendations from "../components/ProductRecommendations"
import Chatbox from '../components/Chatbox';

const ProductList = () => {
  return (
    <div className="list-page">
      <div className="hero-section">
        <h1>Chào mừng đến với HANIVA Fashion</h1>
        <p>Khám phá bộ sưu tập thời trang mới nhất</p>
      </div>
      <ProductRecommendations />
      <Chatbox onClose={() => {}} />
    </div>
  );
};

export default ProductList; // Export mặc định