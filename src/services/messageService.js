import axios from "axios";
import { getAuthToken } from "./serviceService";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getMessages = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BASE_URL}/message`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMessageByEmail = async (email) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BASE_URL}/message/${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendReply = async (email, content) => {
  try {
    const token = getAuthToken();

    const formData = new FormData(); // ✅ Create form-data
    formData.append("email", email);
    formData.append("content", content);

    await axios.post(
      `${BASE_URL}/message/reply`,
      formData, // ✅ Send form-data instead of JSON
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Important for form-data
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const token = getAuthToken();
    await axios.delete(`${BASE_URL}/message/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getMessages();
  } catch (error) {
    throw new Error("Message Can't be Deleted");
  }
};

export const sendReplyEmail = async (email, message) => {
  try {
    const token = getAuthToken();
    await axios.post(
      `${BASE_URL}/message/reply`,
      {
        email,
        content: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
