import axios from "axios";
import { getAuthToken } from "./serviceService";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const token = getAuthToken();

// Settings Service

export const fetchSettings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/general-settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data || "Can't Fetch Settings";
  }
};

export const createSettings = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/general-settings`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data || "Can't update Settings";
  }
};

export const updateSettings = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/general-settings/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data || "Can't update Settings";
  }
};

// Admin Services

export const addAdmin = async (adminData) => {
  try {
    await axios.post(`${BASE_URL}/auth/register`, adminData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error.response.data || "Can't Register New Admin";
  }
};

export const fetchAdmins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/admins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data || "Can't Fetch Admin";
  }
};

export const updateAdmin = async (admin) => {
  try {
    const response = await axios.put(`${BASE_URL}/auth/update`, admin, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data || "Can't Update Admin";
  }
};

export const deleteAdmin = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/auth/delete`);
  } catch (error) {
    throw error.response.data || "Can't Delete Admin";
  }
};

// Domain Service

export const getDomain = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/domain`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data || "Can't Fetch Domain";
  }
};

export const addDomain = async (requestData) => {
  try {
    const response = await axios.post(`${BASE_URL}/domain`, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data || "Can't Add Domain at the moment";
  }
};

export const deleteDomain = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/domain/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error.response.data || "Can't Delete this Domain at the moment";
  }
};

export const updateDomain = async (id, requestData) => {
  try {
    const response = await axios.put(`${BASE_URL}/domain/${id}`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data || "Can't Edit this Domain at the moment";
  }
};
