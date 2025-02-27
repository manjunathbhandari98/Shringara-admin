import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceProvider.jsx";
import { AdminProvider } from "./context/adminProvider.jsx";

createRoot(
  document.getElementById("root")
).render(
  <AdminProvider>
    <ServiceProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </ServiceProvider>
  </AdminProvider>
);
