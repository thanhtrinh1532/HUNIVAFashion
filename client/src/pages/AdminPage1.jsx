import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/admin/products').then(res => res.json()).then(setProducts);
    fetch('http://localhost:5000/api/admin/categories').then(res => res.json()).then(setCategories);
    fetch('http://localhost:5000/api/admin/users').then(res => res.json()).then(setUsers);
    fetch('http://localhost:5000/api/admin/orders').then(res => res.json()).then(setOrders);
  };

  const formatPrice = (vnd) => parseInt(vnd).toLocaleString('vi-VN') + '₫';

  // Xử lý xóa
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  // Xử lý cập nhật
  const handleProductUpdate = async () => {
    await fetch(`/api/admin/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct)
    });
    setEditingProduct(null);
    fetchData();
  };

  const handleUserUpdate = async () => {
    await fetch(`/api/admin/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingUser)
    });
    setEditingUser(null);
    fetchData();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Trang Quản Trị</h2>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Sản phẩm</button>
        <button onClick={() => setActiveTab('categories')} className={activeTab === 'categories' ? 'active' : ''}>Danh mục</button>
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Người dùng</button>
        <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Đơn hàng</button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Danh mục</th><th>Lượt xem</th><th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td>{p.quantity}</td>
                  <td>{p.category_id}</td>
                  <td>{p.view}</td>
                  <td>
                    <button onClick={() => setEditingProduct({ ...p })}>Sửa</button>
                    <button onClick={() => handleDeleteProduct(p.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'users' && (
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Email</th><th>Vai trò</th><th>Hành động</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => setEditingUser({ ...u })}>Sửa</button>
                    <button onClick={() => handleDeleteUser(u.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'categories' && (
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Tên danh mục</th></tr></thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'orders' && (
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Mã đơn</th><th>Trạng thái</th><th>ID người dùng</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.code}</td>
                  <td>{o.status}</td>
                  <td>{o.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form cập nhật sản phẩm */}
      {editingProduct && (
        <div className="edit-popup">
          <h3>Cập nhật sản phẩm</h3>
          <input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} placeholder="Tên" />
          <input value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} placeholder="Giá" />
          <input value={editingProduct.quantity} onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })} placeholder="Số lượng" />
          <button onClick={handleProductUpdate}>Lưu</button>
          <button onClick={() => setEditingProduct(null)}>Hủy</button>
        </div>
      )}

      {/* Form cập nhật người dùng */}
      {editingUser && (
        <div className="edit-popup">
          <h3>Cập nhật người dùng</h3>
          <input value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} placeholder="Email" />
          <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button onClick={handleUserUpdate}>Lưu</button>
          <button onClick={() => setEditingUser(null)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
