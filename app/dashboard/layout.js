// ------------------------ Dashboard Layout Component ----------------------------------------
// This component defines the layout for the dashboard.
// It includes a fixed sidebar, a header, and a content area for dynamically rendered child components.

import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

/**
 * DashboardLayout Component
 * Provides a consistent layout for the dashboard with a sidebar, header, and main content area.
 * 
 * Features:
 * - Fixed sidebar for navigation.
 * - Header at the top for user-related actions.
 * - Content area for rendering dynamic child components passed as `children`.
 */
function DashboardLayout ({children}) {
  return (
    <div>
        <div className="w-64 h-screen fixed">
            <SideBar/>
        </div>
        <div className="ml-64">
            <Header/>
            <div className="p-10">
                {children}
            </div>
        </div>
    </div>
  );
}

export default DashboardLayout;