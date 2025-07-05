import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AdminProvider } from "./context/AdminProvider.jsx";
import { BookingProvider } from "./context/BookingProvider.jsx";
import { ServiceProvider } from "./context/ServiceProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <ServiceProvider>
      <BookingProvider>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </BookingProvider>
    </ServiceProvider>
  </AdminProvider>
);
