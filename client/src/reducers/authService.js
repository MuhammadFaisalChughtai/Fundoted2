import axios from "axios";

const API_URL = "http://localhost:5000/api/v4/auth/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Froget Password user
const frogetPassword = async (userData) => {
  const response = await axios.post(API_URL + "forget-password", userData);

  return response.data;
};
// Reset Password user
const resetPassword = async (userData) => {
  const response = await axios.post(API_URL + "reset-password", userData);
  return response.data;
};
// Load User
const loadUser = async () => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  };
  const response = await axios.get(API_URL + "load-user", config);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  frogetPassword,
  resetPassword,
  loadUser,
  login,
};

export default authService;
