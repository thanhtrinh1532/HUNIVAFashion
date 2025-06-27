import { useCart } from "../../context/CartContext";
import "./ProductRecommendations.css";
import { useState, useEffect } from "react";

const ProductRecommendations = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //lọc
  // const [genderFilter, setGenderFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/api/products");
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu sản phẩm!");
        }
        const data = await response.json();
        // Ánh xạ dữ liệu để thêm badges và điều chỉnh thumbnail
        const enhancedProducts = data.map((product) => ({
          ...product,
          image: product.thumbnail, // Chuyển thumbnail thành image
          badges: [
            product.quantity < 30 ? { type: "limited", label: "SỐ LƯỢNG HẠN CHẾ" } : null,
            product.view > 5 ? { type: "popular", label: "PHỔ BIẾN" } : null,
            product.price < 300000 ? { type: "discount", label: "-GIÁ TỐT-" } : null,
          ].filter(Boolean), // Loại bỏ null
        }));
        setProducts(enhancedProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`); // Có thể thay bằng toast
  };

  if (loading) {
    return <div className="product-recommendations">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="product-recommendations">Lỗi: {error}</div>;
  }


  // useEffect(() => {

  // }, [searchQuery])
 //thanh navbar
  let filteredProducts = [...products];

  // // Lọc theo giới tính
  // if (genderFilter !== "all") {
  //   filteredProducts = filteredProducts.filter(
  //     (p) => p.gender && p.gender.toLowerCase() === genderFilter.toLowerCase()
  //   );
  // }

  // Tìm kiếm theo tên sản phẩm
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sắp xếp
  switch (sortOption) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  //phân trang
   // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);


  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="product-recommendations">
      <div class="product-navbar">
        <div class="filters-left">
          <span class="label">Lọc bởi:</span>

          <div class="dropdown">
            <button class="dropbtn">📄 Danh mục</button>
            <div class="dropdown-content">
              <a href="#">Áo</a>
              <a href="#">Quần</a>
              <a href="#">Giày</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Màu sắc ▾</button>
            <div class="dropdown-content">
              <a href="#">Đỏ</a>
              <a href="#">Xanh</a>
              <a href="#">Vàng</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Size ▾</button>
            <div class="dropdown-content">
              <a href="#">S</a>
              <a href="#">M</a>
              <a href="#">L</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Giá ▾</button>
            <div class="dropdown-content">
              <a href="#">Dưới 200K</a>
              <a href="#">200K - 500K</a>
              <a href="#">Trên 500K</a>
            </div>
          </div>

          <span class="result-count">
            <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
          </span>
        </div>

        <div class="filters-right">
          <label for="sort-select">Sắp xếp</label>
          <select id="sort-select" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="none">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>

          <div class="view-icons">
            <button title="Grid view">▦</button>
            <button title="List view">▤</button>
          </div>
        </div>
      </div>

      <h2>Sản phẩm phổ biến</h2>              
        <div className="products-grid imgfix">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.image ? product.name : `Placeholder for ${product.name}`}
              />
              <div className="product-badges">
                {product.badges.map((badge, index) => (
                  <span key={index} className={`badge ${badge.type}`}>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="product-info">
              <h3 className="name">{product.name}</h3>
              <div className="product-prices">
                <span className="current-price">{formatCurrency(product.price)}</span>
              </div>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PHÂN TRANG */}
      <div className="pagination">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          &laquo; Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
          Tiếp &raquo;
        </button>
      </div>
 
    </div>
    
  );
  
};

export default ProductRecommendations;