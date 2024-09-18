import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="">
      <div className="flex h-[100vh] w-full flex-col">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
