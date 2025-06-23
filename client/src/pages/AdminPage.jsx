import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');
  const [activeTab, setActiveTab] = useState('products');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setCurrentPage(1);

    if (activeTab === 'products') {
      fetch('/api/products') // Đảm bảo endpoint đúng
        .then(res => res.json())
        .then(data => {
          console.log('Products data:', data); // Debug
          const arr = Array.isArray(data) ? data : (data.data || data.products || []);
          setProducts(arr); // Gán trực tiếp mảng
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError('Lỗi khi tải sản phẩm');
          setIsLoading(false);
        });
    } else if (activeTab === 'users') {
      fetch('/api/admin/users')
        .then(res => res.json())
        .then(data => {
          console.log('Users data:', data);
          const arr = Array.isArray(data) ? data : (data.data || data.users || []);
          setUsers(arr);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError('Lỗi khi tải users');
          setIsLoading(false);
        });
    } else if (activeTab === 'orders') {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          console.log('Orders data:', data);
          const arr = Array.isArray(data) ? data : (data.data || data.orders || []);
          setOrders(arr);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError('Lỗi khi tải đơn hàng');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [activeTab]);

  const handleAddProduct = async () => {
    // if (role !== 'admin') return;

    // Kiểm tra tính hợp lệ của các trường
    if (!newProduct.name ||
      !newProduct.description ||
      !newProduct.image ||
      isNaN(newProduct.price) ||
      newProduct.price <= 0 ||
      isNaN(newProduct.quantity) ||
      newProduct.quantity < 0 ||
      !newProduct.categories_id) {
      setError('Vui lòng nhập đầy đủ thông tin sản phẩm hợp lệ');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          image: newProduct.image,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
          categories_id: parseInt(newProduct.categories_id),
          description: newProduct.description
        }),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        const newProductData = addedProduct.product || addedProduct;

        setProducts([...products, {
          id: newProductData.id || Date.now(),
          name: newProductData.name,
          image: newProductData.image,
          price: newProductData.price,
          quantity: newProductData.quantity,
          categories_id: newProductData.categories_id,
          description: newProductData.description
        }]);

        // Reset form
        setNewProduct({
          name: '',
          image: '',
          price: '',
          quantity: '',
          categories_id: '',
          description: ''
        });
        setError(null);
      } else {
        const errorText = await response.text();
        setError(`Lỗi khi thêm sản phẩm: ${errorText}`);
      }
    } catch (error) {
      setError('Lỗi kết nối server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    if (role !== 'admin') return;
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedProduct, price: parseFloat(updatedProduct.price) }),
      });
      if (response.ok) {
        setProducts(products.map(p => (p.id === id ? { ...p, ...updatedProduct } : p)));
      } else {
        const errorText = await response.text();
        setError(`Lỗi khi cập nhật sản phẩm: ${errorText}`);
      }
    } catch (error) {
      setError('Lỗi kết nối server');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (role !== 'admin') return;
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        const errorText = await response.text();
        setError(`Lỗi khi xóa sản phẩm: ${errorText}`);
      }
    } catch (error) {
      setError('Lỗi kết nối server');
    }
  };

  return (
    <div className="admin-container">
      <header className="header">
        <div className="header-top">
          <span style={{ color: '#808080' }}>Sử dụng mã giảm giá 20% cho đơn hàng đầu tiên</span>
          <span className="login-status" onClick={() => navigate('/account')}>Tài khoản</span>
        </div>
        <div className="header-main">
          <h1 className="logo">HUNIVA FASHION.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => navigate('/Home')}>Trang chủ</button>
            <button className="nav-btn" onClick={() => navigate('/gioithieu')}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => navigate('/sanpham')}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => navigate('/tintuc')}>Tin tức</button>
            <button className="nav-btn" onClick={() => navigate('/contact')}>Liên hệ</button>
          </div>
          <div className="header-icons">
            <span className="cursor-pointer" aria-label="Tài khoản">👤</span>
            <span className="cursor-pointer" aria-label="Giỏ hàng">🛒</span>
            <span className="cursor-pointer" aria-label="Yêu thích">❤️</span>
            <span className="cursor-pointer" aria-label="So sánh">🔄</span>
            <span className="cursor-pointer" aria-label="Tìm kiếm">🔍</span>
          </div>
        </div>
      </header>
      <div className="account-section">
        <h2 className="account-title">Admin Page</h2>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>
        {isLoading && <p>Đang tải...</p>}
        {error && <p className="error">{error}</p>}
        {activeTab === 'products' && (
          <div className="admin-content">

            <div className="product-list">
              <h3>Danh sách sản phẩm</h3>
              {products.length === 0 ? (

                <p>Không có sản phẩm nào</p>
              ) : (
                currentProducts.map(p => (
                  <div key={p.id} className="product-item">
                    <textarea
                      value={p.name || ''} // Đảm bảo giá trị mặc định
                      onChange={(e) => handleUpdateProduct(p.id, { ...p, name: e.target.value })}
                    />
                    <textarea
                      value={p.price || 0} // Đảm bảo giá trị mặc định
                      onChange={(e) => handleUpdateProduct(p.id, { ...p, price: e.target.value })}
                    />
                    <textarea
                      value={p.description || ''} // Đảm bảo giá trị mặc định
                      onChange={(e) => handleUpdateProduct(p.id, { ...p, description: e.target.value })}
                    />
                    {p.thumbnail && typeof p.thumbnail === 'string' && (
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        style={{ width: 60, height: 60, objectFit: 'cover', marginBottom: 8 }}
                      />
                    )}

                    <textarea
                      value={p.quantity || 0} // Đảm bảo giá trị mặc định
                      onChange={(e) => handleUpdateProduct(p.id, { ...p, quantity: e.target.value })}
                    />
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="delete-btn"
                      disabled={isLoading}
                    >
                      Xóa <span>❌</span>
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trang trước
              </button>
              <span style={{ margin: '0 8px' }}>
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Trang sau
              </button>
            </div>
            <div className="product-form">
              <input
                placeholder="Tên sản phẩm"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              /><input
                placeholder="Giá"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />

              <input
                placeholder="Mô tả"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <input
                placeholder="Số lượng"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />
              <input
                placeholder="Ảnh sản phẩm (URL hoặc file)"
                value={newProduct.thumbnail}
                onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
              />
              <input
                placeholder='mã danh mục'
                value={newProduct.categoryId}
                onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              />
              <button onClick={handleAddProduct} className="add-btn" disabled={isLoading}>
                Thêm sản phẩm <span>➕</span>
              </button>
            </div>
          </div>
        )}
        {role === 'admin' && activeTab === 'users' && (
          <div className="admin-content">
            <h3>Danh sách người dùng</h3>
            {users.length === 0 ? (
              <p>Không có người dùng nào</p>
            ) : (
              users.map(u => (
                <div key={u.id} className="user-item">
                  {u.email || 'No email'} - {u.role || 'No role'}
                </div>
              ))
            )}
          </div>
        )}
        {role === 'admin' && activeTab === 'orders' && (
          <div className="orders-list">
            <h3>Đơn hàng</h3>
            {orders.length === 0 ? (
              <p>Không có đơn hàng nào</p>
            ) : (
              orders.map(order => <p key={order.id} className="order-item">{order.id || 'No ID'}</p>)
            )}
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="profile-content">
            <h3>Thông tin tài khoản</h3>
            <div className="profile-info">
              <p>Địa chỉ: 107/23 Cạch Mạng Thăng 8, P.7, Q.Tân Bình, TP.HCM</p>
              <p>Số điện thoại: (84) 913-728-397</p>
              <p>Email: info@themonaglobal.com</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminPage;