import axios from "axios";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

// Function to store JWT token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Function to retrieve JWT token from localStorage
export const getAuthToken = () =>
  localStorage.getItem("authToken");

// Function to remove JWT token (Logout)
export const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userInfo"); // Ensure user data is cleared on logout
};

// Login API call
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/admin/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token } = response.data;
    if (token) {
      setAuthToken(token);
    }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed",
      }
    );
  }
};

// Fetch user info from backend (Updated API Call)
export const getUserInfo = async () => {
  const token = getAuthToken();
  if (!token) return null; // Return null if no token is found

  try {
    const response = await axios.get(
      `${BASE_URL}/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns user object
  } catch (error) {
    console.error(
      "Error fetching user info:",
      error
    );
    logoutUser(); // Logout if token is invalid
    return null;
  }
};

// Update User user info
export const updateUser = async (updateData) => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const response = await axios.put(
      `${BASE_URL}/auth/update`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message:
          "Failed to update user information",
      }
    );
  }
};

// Secure API request with JWT token
export const getProtectedData = async (
  endpoint
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unauthorized access",
      }
    );
  }
};
