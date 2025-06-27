import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', thumbnail: '', quantity: '', categoryId: '' });
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');
  const [activeTab, setActiveTab] = useState('products');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'asc' | 'desc' | 'none'
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  // const currentProducts = products.slice(indexOfFirst, indexOfLast);
  // const totalPages = Math.ceil(products.length / itemsPerPage);
  // Lọc theo tên sản phẩm
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Sắp xếp theo giá
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });
  // Phân trang
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // Định dạng giá 
  const formatCurrency = (value) => {
      if (!value) return '';
      const number = Number(value.toString().replace(/\D/g, ''));
      return number.toLocaleString('vi-VN') + ' ₫';
    };
    
  const [showAddForm, setShowAddForm] = useState(false);


  useEffect(() => {
    if (role !== 'admin') {
      setError('Bạn không có quyền truy cập trang admin');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentPage(1);

    const headers = { 'Content-Type': 'application/json' };
 
    if (activeTab === 'products') {
      fetch('http://localhost:5000/api/products', { headers })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {
              throw new Error(`${res.status} ${err.error || 'Error'}: ${err.details || ''}`);
            });
          }
          return res.json();
        })
        .then(data => {
          console.log('Products data:', data);
          const arr = Array.isArray(data) ? data : (data.data || data.products || []);
          setProducts(arr);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError('Lỗi khi tải sản phẩm: ' + err.message);
          setIsLoading(false);
        });
    } else if (activeTab === 'users') {
      fetch('http://localhost:5000/api/users', { headers })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {
              throw new Error(`${res.status} ${err.error || 'Error'}: ${err.details || ''}`);
            });
          }
          return res.json();
        })
        .then(data => {
          console.log('Users data:', data);
          const arr = Array.isArray(data) ? data : (data.data || data.users || []);
          setUsers(arr);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError('Lỗi khi tải users: ' + err.message);
          setIsLoading(false);
        });
    } else if (activeTab === 'orders') {
      fetch('http://localhost:5000/api/orders', { headers })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {
              throw new Error(`${res.status} ${err.error || 'Error'}: ${err.details || ''}`);
            });
          }
          return res.json();
        })
        .then(data => {
          console.log('Orders data:', data);
          const arr = Array.isArray(data) ? data : (data.data || data.orders || []);
          setOrders(arr);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError('Lỗi khi tải đơn hàng: ' + err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [activeTab, role]);

  const handleAddProduct = async () => {
    if (role !== 'admin') {
      setError('Bạn không có quyền thêm sản phẩm');
      return;
    }

    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.thumbnail ||
      isNaN(newProduct.price) ||
      newProduct.price <= 0 ||
      isNaN(newProduct.quantity) ||
      newProduct.quantity < 0 ||
      !newProduct.categoryId
    ) {
      setError('Vui lòng nhập đầy đủ thông tin sản phẩm hợp lệ');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          thumbnail: newProduct.thumbnail,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
          category_id: parseInt(newProduct.categoryId),
          description: newProduct.description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const addedProduct = data.product || data;
        setProducts([...products, {
          id: addedProduct.id || Date.now(),
          name: addedProduct.name,
          thumbnail: addedProduct.thumbnail,
          price: addedProduct.price,
          quantity: addedProduct.quantity,
          category_id: addedProduct.category_id,
          description: addedProduct.description,
        }]);
        setNewProduct({
          name: '', thumbnail: '', price: '', quantity: '', categoryId: '', description: '',
        });
        setSuccess('Thêm sản phẩm thành công!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(`Lỗi khi thêm sản phẩm: ${data.error || data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setError('Lỗi kết nối server: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    if (role !== 'admin') {
      setError('Bạn không có quyền cập nhật sản phẩm');
      return;
    }

    if (
      !updatedProduct.name ||
      isNaN(updatedProduct.price) ||
      updatedProduct.price <= 0 ||
      !updatedProduct.category_id ||
      isNaN(updatedProduct.category_id)
    ) {
      setError('Vui lòng nhập đầy đủ thông tin sản phẩm hợp lệ');
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        name: updatedProduct.name,
        price: parseFloat(updatedProduct.price),
        description: updatedProduct.description || '',
        thumbnail: updatedProduct.thumbnail || '',
        quantity: parseInt(updatedProduct.quantity) || 0,
        category_id: parseInt(updatedProduct.category_id),
        view: parseInt(updatedProduct.view) || 0,
      };
      console.log('Updating product with payload:', payload);

      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedProductFromServer = data.product || data;
        setProducts(products.map(p => (p.id === id ? { ...p, ...updatedProductFromServer } : p)));
        setSuccess('Đã cập nhật sản phẩm thành công!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(`Lỗi khi cập nhật sản phẩm: ${data.error || data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setError('Lỗi kết nối server: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (role !== 'admin') {
      setError('Bạn không có quyền xóa sản phẩm');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
        setSuccess('Xóa sản phẩm thành công!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        setError(`Lỗi khi xóa sản phẩm: ${data.error || data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setError('Lỗi kết nối server: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="account-section">
        <h2 className="account-title">Admin page</h2>
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
        {success && <div className="alert-box success-alert">{success}</div>}
        {error && <div className="alert-box error-alert">{error}</div>}
        {isLoading && <p>Đang tải...</p>}
        {role === 'admin' && activeTab === 'products' && (
          <div className="admin-content">
            <div className="product-list">
              <div className="filter-sort-bar">
                <button
                  className="add-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                  style={{ marginBottom: '10px' }}
                >
                  {showAddForm ? 'Đóng biểu mẫu' : '➕ Thêm sản phẩm mới'}
                </button>

                {showAddForm && (
                  <div className="add-product-form">
                    <input
                      placeholder="Tên sản phẩm"
                      value={newProduct.name}
                      onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                      placeholder="Giá"
                      type="number"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <input
                      placeholder="Ảnh sản phẩm (URL)"
                      value={newProduct.thumbnail}
                      onChange={e => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
                    />
                    <input
                      placeholder="Số lượng"
                      type="number"
                      value={newProduct.quantity}
                      onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    />
                    <input
                      placeholder="Mã danh mục"
                      value={newProduct.categoryId}
                      onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                    />
                    <textarea
                      placeholder="Mô tả"
                      value={newProduct.description}
                      onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <button className="add-btn" onClick={handleAddProduct} disabled={isLoading}>
                      Lưu sản phẩm
                    </button>
                  </div>
                )}
                <div className="filter-sort-bar" style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Tìm theo tên sản phẩm..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ padding: '5px', width: '200px', marginRight: '10px' }}
                  />
                  <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    style={{ padding: '5px' }}
                  >
                    <option value="none">Sắp xếp theo giá</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                  </select>
                </div>
            </div>
              <h3>Danh sách sản phẩm</h3>
              {products.length === 0 ? (
                <p>Không có sản phẩm nào</p>
              ) : (
                currentProducts.map(p => (
                  <div key={p.id} className="product-item">
                    {editProductId === p.id ? (
                      <>
                        <input
                          value={editProductData.name || ''}
                          onChange={e => setEditProductData({ ...editProductData, name: e.target.value })}
                          placeholder="Tên sản phẩm"
                        />
                        <input
                          type="text"
                          value={formatCurrency(editProductData.price)}
                          onChange={e => {
                            const rawValue = e.target.value.replace(/\D/g, '');
                            setEditProductData({ ...editProductData, price: rawValue });
                          }}
                          placeholder="Giá"
                          inputMode="numeric"
                        />

                        <textarea
                          value={editProductData.description || ''}
                          onChange={e => setEditProductData({ ...editProductData, description: e.target.value })}
                          placeholder="Mô tả"
                        />
                        <input
                          value={editProductData.thumbnail || ''}
                          onChange={e => setEditProductData({ ...editProductData, thumbnail: e.target.value })}
                          placeholder="Ảnh sản phẩm"
                        />
                        <input
                          type="number"
                          value={editProductData.quantity || 0}
                          onChange={e => setEditProductData({ ...editProductData, quantity: e.target.value })}
                          placeholder="Số lượng"
                        />
                        <input
                          value={editProductData.category_id || ''}
                          onChange={e => setEditProductData({ ...editProductData, category_id: e.target.value })}
                          placeholder="Mã danh mục"
                        />
                        <button
                          onClick={() => setShowConfirm(true)}
                          className="update-btn"
                          disabled={isLoading}
                        >
                          Xác nhận cập nhật
                        </button>
                        <button
                          onClick={() => setEditProductId(null)}
                          className="delete-btn"
                        >
                          Hủy
                        </button>
                        {showConfirm && (
                          <div className="confirm-table">
                            <p>Bạn chắc chắn muốn cập nhật sản phẩm này không?</p>
                            <button
                              onClick={async () => {
                                await handleUpdateProduct(p.id, editProductData);
                                setEditProductId(null);
                                setShowConfirm(false);
                              }}
                              className="update-btn"
                            >
                              Có
                            </button>
                            <button
                              onClick={() => setShowConfirm(false)}
                              className="delete-btn"
                            >
                              Không
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <input value={p.name || ''} disabled />
                        <input type="number" value={p.price || 0} disabled />
                        <input value={p.description || ''} disabled />
                        {p.thumbnail && typeof p.thumbnail === 'string' && (
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', marginBottom: 8 }}
                          />
                        )}
                        <input type="number" value={p.quantity || 0} disabled />
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="delete-btn"
                          disabled={isLoading}
                        >
                          Xóa <span>❌</span>
                        </button>
                        <button
                          onClick={() => {
                            setEditProductId(p.id);
                            setEditProductData({
                              name: p.name,
                              price: p.price,
                              description: p.description,
                              thumbnail: p.thumbnail,
                              quantity: p.quantity,
                              category_id: p.category_id || p.categoryId
                            });
                          }}
                          className="update-btn"
                          disabled={isLoading}
                        >
                          Cập nhật <span>✏️</span>
                        </button>
                      </>
                    )}
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