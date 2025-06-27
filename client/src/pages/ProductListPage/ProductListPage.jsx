import ProductRecommendations from "../../components/ProductRecommendations/ProductRecommendations"
import "./ProductListPage.css"
import Chatbox from '../../components/Chatbox/Chatbox';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Chào mừng đến với HANIVA Fashion</h1>
        <p>Khám phá bộ sưu tập thời trang mới nhất</p>
      </div>
      <ProductRecommendations />
      <Chatbox onClose={() => {}} />
    </div>
  )
}

export default HomePage