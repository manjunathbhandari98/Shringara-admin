import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ManageBookings from "./pages/ManageBookings";
import ManageServices from "./pages/ManageServices";
import ManagePortfolio from "./pages/ManagePortfolio";
import ManageMessages from "./pages/ManageMessages";
import Dashboard from "./pages/Dashboard";
import React, {
  useState,
  useEffect,
} from "react";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  FileText,
} from "lucide-react";
import TopNav from "./components/Topnav";
import Sidebar from "./components/Sidebar";
import ManageWebsiteContent from "./pages/ManageWebsiteContent";
import { useAdmin } from "./hooks/useAdmin";
import AdminLogin from "./pages/Login";

function App() {
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      to: "/",
    },
    {
      icon: Package,
      label: "Manage Services",
      to: "/services",
    },
    {
      icon: ImageIcon,
      label: "Manage Portfolio",
      to: "/portfolio",
    },
    {
      icon: Calendar,
      label: "Manage Bookings",
      to: "/bookings",
    },
    {
      icon: MessageSquare,
      label: "Manage Messages",
      to: "/messages",
    },
    {
      icon: FileText,
      label: "Website Content",
      to: "/contents",
    },
  ];
  if (!admin) {
    return <AdminLogin />;
  }

  return (
    <div className="flex">
      {/* Sidebar is always present for logged-in users */}
      <Sidebar
        items={menuItems}
        isOpen={sidebarOpen}
      />

      <div className="flex-1">
        {/* TopNav is also always present */}
        <TopNav
          onMenuClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <main className="p-6">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/bookings"
              element={<ManageBookings />}
            />
            <Route
              path="/services"
              element={<ManageServices />}
            />
            <Route
              path="/portfolio"
              element={<ManagePortfolio />}
            />
            <Route
              path="/messages"
              element={<ManageMessages />}
            />
            <Route
              path="/contents"
              element={<ManageWebsiteContent />}
            />
            {/* Redirect unknown routes to Dashboard */}
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
