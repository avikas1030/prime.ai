// frontend/src/utils/auth.js
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new Event('authStateChanged'));
};

export const removeToken = () => {
  localStorage.removeItem("token");
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new Event('authStateChanged'));
};
