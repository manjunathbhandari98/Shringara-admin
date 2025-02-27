/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { AdminContext } from "./adminContext";

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const setAdminInfo = useCallback((userData) => {
    setAdmin(userData); // Update user data and trigger re-render
  }, []);

  return (
    <AdminContext.Provider
      value={{ admin, setAdminInfo }}
    >
      {children}
    </AdminContext.Provider>
  );
};
