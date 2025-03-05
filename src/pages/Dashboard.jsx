import React from "react";
import DashboardStats from "../components/DashboardStats";
import ServicesOverview from "../components/ServicesOverview";
import PortfolioSection from "../components/PortfolioSection";
import RecentBookings from "../components/RecentBookings";
import MessagesSection from "../components/MessagesSection";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ServicesOverview />

        <MessagesSection />
      </div>

      <div className="mt-6">
        <RecentBookings />
      </div>
    </div>
  );
};

export default Dashboard;
