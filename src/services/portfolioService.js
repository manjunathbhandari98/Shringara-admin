import axios from "axios";
import { getAuthToken } from "./serviceService";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
export const getPortfolio = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/portfolio`);
    return response.data;
  } catch (error) {
    throw new error(error);
  }
};

export const getPortfolioById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/portfolio/${id}`);
  } catch (error) {
    throw new error(error);
  }
};
export const createPortfolio = async (portfolioData) => {
  try {
    const token = getAuthToken();

    const response = await axios.post(`${BASE_URL}/portfolio`, portfolioData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Can't Create Portfolio at the moment..,";
  }
};

// update portfolio

export const updatePortfolio = async (id, updatedData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${BASE_URL}/portfolio/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Can't update Portfolio at the moment";
  }
};

// delete Portfolio
export const deletePortfolio = async (id) => {
  try {
    const token = getAuthToken();
    await axios.delete(
      `${BASE_URL}/portfolio/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "Portfolio Deleted Successfully";
  } catch (error) {
    throw error.response?.data || "Can't Delete At the moment";
  }
};
