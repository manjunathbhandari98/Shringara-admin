import {
  Calendar,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/Topnav";
import { useAdmin } from "./hooks/useAdmin";
import BookingDetails from "./pages/BookingDetails";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/Login";
import ManageBookings from "./pages/ManageBookings";
import ManageMessages from "./pages/ManageMessages";
import ManagePortfolio from "./pages/ManagePortfolio";
import ManageServices from "./pages/ManageServices";
import MessageView from "./pages/MessageView";
import Settings from "./pages/Settings";

function App() {
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      icon: Settings2,
      label: "Settings",
      to: "/settings",
    },
  ];
  if (!admin) {
    return <AdminLogin />;
  }

  return (
    <div className="flex">
      {/* Sidebar is always present for logged-in users */}
      <Sidebar items={menuItems} isOpen={sidebarOpen} />

      <div className="flex-1">
        {/* TopNav is also always present */}
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<ManageBookings />} />
            <Route path="/services" element={<ManageServices />} />
            <Route path="/portfolio" element={<ManagePortfolio />} />
            <Route path="/messages" element={<ManageMessages />} />
            <Route path="/message/:email" element={<MessageView />} />

            <Route path="/booking-details/:id" element={<BookingDetails />} />
            <Route path="/settings" element={<Settings />} />
            {/* Redirect unknown routes to Dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
