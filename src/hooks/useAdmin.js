import { useContext } from "react"; // Import UserContext from the separate file
import { AdminContext } from "./../context/adminContext";

// Custom hook to use the UserContext
export const useAdmin = () => {
  return useContext(AdminContext);
};
