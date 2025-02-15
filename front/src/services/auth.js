import axios from "axios";

const API_BASE_URL = "http://localhost:5000/auth"; // Change to your backend URL

const AuthService = {
  // Signup function
  async signup(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);
      return response.data; // Return the response data
    } catch (error) {
      throw error.response?.data || "Signup failed";
    }
  },

  // Login function
  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      return user; // Return user data
    } catch (error) {
      throw error.response?.data || "Login failed";
    }
  },

  // Logout function
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  // Get the logged-in user's details
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  // Get the authentication token
  getToken() {
    return localStorage.getItem("token");
  }
};

export default AuthService;

export const axiosWithAuth = () => {
  const token = AuthService.getToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
