import axios from "axios";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

// Function to retrieve JWT token from localStorage
export const getAuthToken = () =>
  localStorage.getItem("authToken");

// Fetch all services
export const getAllServices = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/services`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch services",
      }
    );
  }
};

// Fetch a single service by ID
export const getServiceById = async (
  serviceId
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/services/${serviceId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch service",
      }
    );
  }
};

// Create a new service
export const createService = async (
  serviceData
) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${BASE_URL}/services`,
      serviceData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to create service",
      }
    );
  }
};

// Update an existing service
export const updateService = async (
  serviceId,
  updateData
) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${BASE_URL}/services/${serviceId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update service",
      }
    );
  }
};

// Delete a service
export const deleteService = async (
  serviceId
) => {
  try {
    const token = getAuthToken();
    await axios.delete(
      `${BASE_URL}/services/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      message: "Service deleted successfully",
    };
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete service",
      }
    );
  }
};

// Fetch all subservices of a service
export const getSubServices = async (
  serviceId
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/services/${serviceId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch subservices",
      }
    );
  }
};

// Fetch a single subservice by ID
export const getSubServiceById = async (
  subServiceId
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subservices/${subServiceId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch subservice",
      }
    );
  }
};

// Create a new subservice
export const createSubService = async (
  serviceId,
  subServiceData
) => {
  try {
    const token = getAuthToken();

    const response = await axios.post(
      `${BASE_URL}/subservices/service/${serviceId}`,
      subServiceData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to create subservice",
      }
    );
  }
};

// Update an existing subservice
export const updateSubService = async (
  subServiceId,
  serviceId,
  updateData
) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${BASE_URL}/subservices/${serviceId}/${subServiceId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update subservice",
      }
    );
  }
};

// Delete a subservice
export const deleteSubService = async (
  serviceId,
  subServiceId
) => {
  try {
    const token = getAuthToken();
    await axios.delete(
      `${BASE_URL}/subservices/${serviceId}/${subServiceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      message: "Subservice deleted successfully",
    };
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete subservice",
      }
    );
  }
};

export const uploadImage = async (file) => {
  try {
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${BASE_URL}/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Construct the full URL here
    const relativePath = response.data; // "uploads/customized-theme.jpg"
    const fullImageUrl = `${BASE_URL}/files/${relativePath
      .split("/")
      .pop()}`; //Extract filename only.

    return fullImageUrl; // Return the full URL
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
