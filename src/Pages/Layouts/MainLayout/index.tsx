import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="bg-[red] w-[100vw]">
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
