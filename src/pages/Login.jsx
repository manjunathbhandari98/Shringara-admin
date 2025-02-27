import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  loginAdmin,
} from "../services/adminService";
import { useAdmin } from "./../hooks/useAdmin";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection
  const { setAdminInfo } = useAdmin(); // Get setUserInfo function from context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await loginAdmin(formData);

      localStorage.setItem(
        "authToken",
        response.token
      );
      const admin = response;

      localStorage.setItem(
        "admin",
        JSON.stringify(admin)
      );
      setAdminInfo(admin);
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      setError(
        err.message || "Invalid credentials!"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const userData = await getUserInfo();
      console.log("Fetched User:", userData);
      setAdminInfo(userData);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error
      );
    }
  };

  useEffect(() => {
    fetchUser();
    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );
    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const handleFocus = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Admin Login
        </h2>
        {error && (
          <p className="text-red-500 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
