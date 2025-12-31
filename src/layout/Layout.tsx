import React from "react";
import { Outlet } from "react-router-dom";
import LeftNav from "./LeftNav";

const Layout: React.FC = () => {
  return (
    // Full viewport lock
    <div className="flex h-screen bg-gray-900 overflow-hidden">

      <LeftNav />

      {/* Right Panel */}
      <div className="flex-1 bg-gray-100 rounded-l-[80px] overflow-hidden">

        {/* This ensures rounded panel never scrolls */}
        <div className="h-full flex flex-col">

          {/* ✅ ONLY THIS SCROLLS */}
          <div className="flex-1 overflow-y-auto pl-3.5 py-3">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Layout;
