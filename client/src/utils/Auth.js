export const getUserInfo = () => {
  const userStr = localStorage.getItem('user');
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  try {
    const user = JSON.parse(userStr);
    return {
      ...user,
      role,
      token,
      isLoggedIn,
    };
  } catch {
    return null;
  }
};
