import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import Chatbox from '../components/Chatbox';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState('user'); // Thêm role mặc định là user
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' },
  ];

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^(0[1-9][0-9]{8,9})$/;
    return phoneRegex.test(phone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!fullName || !email || !password || !confirmPassword || !phone || !birthDate || !agreeTerms) {
      setError('Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản!');
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError('Email không hợp lệ!');
      setLoading(false);
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Số điện thoại không hợp lệ (phải bắt đầu 0 và 9-10 số)!');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      setLoading(false);
      return;
    }
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      setError('Email đã tồn tại!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, phone, birthDate, role }),
      });
      if (response.ok) {
        setError('');
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        throw new Error('Đăng ký thất bại');
      }
    } catch (err) {
      setError('Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRegister = () => {
    navigate('/login');
  };

  const handleCloseForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ff6b6b to-gray-200 flex flex-col">

      <div className="flex-1 flex items-center justify-center p-6">
        {showRegisterForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border-4 border-double border-ff6b6b">
            <button
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-ff6b6b transition"
              onClick={handleCloseForm}
              aria-label="Đóng"
              style={{ border: 'none' }}
            >
              ×
            </button>
            <h2 className="text-ff6b6b text-center text-3xl font-bold mb-8">Đăng ký tài khoản</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '20rem' }}>Họ và tên</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '23.5rem' }}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '18.7rem' }}>Số điện thoại</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '20rem' }}>Ngày sinh</label>
                <input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  required
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '20rem' }}>Mật khẩu</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition placeholder-gray-400 pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-xl text-gray-600 hover:text-ff6b6b transition"
                  style={{ border: 'none', background: 'none', top: '50%', transform: 'translateY(-50%)', verticalAlign: 'middle', lineHeight: '1.5rem', padding: '0' }}
                  disabled={loading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '16rem' }}>Xác nhận mật khẩu</label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition placeholder-gray-400 pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-xl text-gray-600 hover:text-ff6b6b transition"
                  style={{ border: 'none', background: 'none', top: '50%', transform: 'translateY(-50%)', verticalAlign: 'middle', lineHeight: '1.5rem', padding: '0' }}
                  disabled={loading}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 text-left ml-2" style={{ paddingRight: '23rem' }}>Quyền</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  required
                  disabled={loading}
                >
                  <option value="user">User</option>
                  <option value="admin">Quản lý</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-5 w-5 text-ff6b6b focus:ring-ff6b6b"
                  required
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                  Tôi đồng ý với <a href="/terms" className="text-ff6b6b hover:underline">Điều khoản dịch vụ</a> và <a href="/privacy" className="text-ff6b6b hover:underline">Chính sách bảo mật</a>
                </label>
              </div>
              <button
                onClick={handleRegister}
                className={`w-full bg-ff6b6b text-white py-3 rounded-xl hover:bg-ff4d4d transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
              </button>
              <p className="text-center text-sm text-gray-600">
                Đã có tài khoản? <a href="/login" className="text-ff6b6b hover:underline font-medium transition">Đăng nhập</a>
              </p>
              {error && (
                <p className="text-center text-ff6b6b text-sm font-medium">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Chatbox onClose={() => {}} />
    </div>
  );
};

export default RegisterPage;