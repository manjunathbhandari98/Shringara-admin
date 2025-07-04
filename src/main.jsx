import { createRoot } from "react-dom/client";
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
          <App />
        </BrowserRouter>
      </BookingProvider>
    </ServiceProvider>
  </AdminProvider>
);
