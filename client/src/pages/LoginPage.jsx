import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Chatbox from '../components/Chatbox';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveLoginInfo = ({ email, id, role }) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ email, id }));
    localStorage.setItem('role', role);
    localStorage.setItem('token', `static-token-${role}`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu!');
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError('Email không hợp lệ!');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      setLoading(false);
      return;
    }
    if (role !== 'user' && role !== 'admin') {
      setError('Vai trò không hợp lệ!');
      setLoading(false);
      return;
    }

    // Xác thực tĩnh
    if (email === 'thanhtrinh15032000@gmail.com' && password === '@Dmin1234') {
      saveLoginInfo({ email, id: 1, role: 'admin' });
      navigate('/admin');
    } else if (email === 'test@gmail.com' && password === '@123456') {
      saveLoginInfo({ email, id: 2, role: 'user' });
      navigate('/');
    } else {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
    }

    setLoading(false);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Vui lòng nhập email để khôi phục mật khẩu!');
      return;
    }
    alert(`Yêu cầu khôi phục mật khẩu đã được gửi đến ${email}. Vui lòng kiểm tra email!`);
  };

  // const handleLoginRegister = () => {
  //   navigate('/register');
  // };

  const handleCloseForm = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ff6b6b to-gray-200 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-6">
        {showLoginForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border-4 border-double border-ff6b6b relative">
            <button
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-ff6b6b transition"
              onClick={handleCloseForm}
              aria-label="Đóng"
              style={{ border: 'none' }}
            >
              ×
            </button>
            <h2 className="text-4xl font-extrabold text-ff6b6b text-center mb-10">Chào mừng đăng nhập!</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="role" className="block text-base font-semibold text-gray-700 mb-3">Vai trò</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  disabled={loading}
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Tên tài khoản hoặc email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  required
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3">
                  Mật khẩu{' '}
                  <button
                    id="passwordhandle"
                    onClick={handleForgotPassword}
                    className="text-base text-ff6b6b hover:underline"
                    disabled={loading}
                    style={{ border: 'none' }}
                  >
                    Quên mật khẩu?
                  </button>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  required
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleLogin}
                className={`w-full bg-ff6b6b text-white py-3 rounded-xl hover:bg-ff4d4d transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
              <p className="text-center text-base text-gray-600">
                Không phải là thành viên?{' '}
                <a href="/register" className="text-ff6b6b hover:underline font-semibold transition">Tạo tài khoản</a>
              </p>
              {error && (
                <p className="text-center text-ff6b6b text-base font-semibold">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <Chatbox onClose={() => {}} />
    </div>
  );
};

export default LoginPage;
