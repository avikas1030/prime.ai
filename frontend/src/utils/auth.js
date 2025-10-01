// frontend/src/utils/auth.js
export const isAuthenticated = () => {
  // If you are storing JWT in localStorage after login
  return !!localStorage.getItem("token");

  // OR if you are using httpOnly cookies only:
  // return document.cookie.includes("token="); 
  // (better: call a backend `/api/user/current` on app load to verify)
};
