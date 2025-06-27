import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      const arr = Array.isArray(data) ? data : (data.data || data.products || []);
      setProducts(arr);
    } catch (err) {
      setError('Lỗi khi tải sản phẩm: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSaveClick = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error('Cập nhật thất bại');
      const updated = products.map(p => (p.id === editForm.id ? editForm : p));
      setProducts(updated);
      setEditingId(null);
    } catch (err) {
      setError('Lỗi khi cập nhật sản phẩm: ' + err.message);
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Xóa thất bại');
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError('Lỗi khi xóa sản phẩm: ' + err.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container py-4" style={{ marginTop: '100px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách sản phẩm</h2>
        <button className="btn btn-primary">+ Thêm sản phẩm</button>
      </div>

      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Tìm kiếm..." />
      </div>

      {isLoading ? (
        <div className="alert alert-info text-center">Đang tải...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th style={{ width: '35%' }}>Sản phẩm</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((p) => (
                <tr key={p.id}>
                  <td className="text-start">
                    <div className="d-flex align-items-start gap-3">
                      <img src={p.thumbnail} alt={p.name} className="img-thumbnail" style={{ width: 80, height: 80, objectFit: 'cover' }} />
                      <div>
                        {editingId === p.id ? (
                          <input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="form-control mb-2"
                          />
                        ) : (
                          <strong>{p.name}</strong>
                        )}
                        <p className="mb-0 small text-muted">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(p.created_at || Date.now()).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <span className={`badge ${p.quantity > 10 ? 'bg-success' : p.quantity > 0 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                      {p.quantity > 10 ? 'Còn hàng' : p.quantity > 0 ? 'Sắp hết hàng' : 'Hết hàng'}
                    </span>
                  </td>
                  <td>{p.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      {editingId === p.id ? (
                        <button className="btn btn-sm btn-success" onClick={handleSaveClick}>Lưu</button>
                      ) : (
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditClick(p)}>Sửa</button>
                      )}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(p.id)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
              Trang trước
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
              Trang sau
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPage;
