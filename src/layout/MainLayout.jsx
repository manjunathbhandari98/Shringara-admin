import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  FileText,
  Menu,
  Bell,
  Upload,
  Plus,
  ChevronRight,
} from "lucide-react";
import TopNav from "../components/Topnav";
import DashboardStats from "../components/Dashboard";
import RecentBookings from "../components/RecentBookings";
import ServicesOverview from "../components/ServicesOverview";
import PortfolioSection from "../components/PortfolioSection";
import MessagesSection from "../components/MessagesSection";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      to: "/",
      active: true,
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        items={menuItems}
        isOpen={sidebarOpen}
      />

      <div className="flex-1">
        <TopNav
          onMenuClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ServicesOverview />
              <PortfolioSection />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RecentBookings />
              <MessagesSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
