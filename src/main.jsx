import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceProvider.jsx";
import { AdminProvider } from "./context/adminProvider.jsx";
import { BookingProvider } from "./context/BookingProvider.jsx";

createRoot(
  document.getElementById("root")
).render(
  <AdminProvider>
    <ServiceProvider>
      <BookingProvider>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </BookingProvider>
    </ServiceProvider>
  </AdminProvider>
);
