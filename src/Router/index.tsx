import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthLayout from "../Pages/Layouts/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import MainLayout from "../Pages/Layouts/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store";
import ChatRoom from "@/Pages/ChatRoom";

interface RouteConfig {
  path: string;
  element: React.FC;
}

const AuthRoutes: RouteConfig[] = [
  {
    path: "/conversation",
    element: ChatRoom,
  },
  {
    path: "/",
    element: ChatRoom,
  },
];

const MainRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: LoginPage,
  },
];

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  element: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  element: Component,
}) => {
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const RoutesLayout: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return (
    <Router>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isLogin}
              element={AuthLayout}
            ></ProtectedRoute>
          }
        >
          {AuthRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Route>
        <Route element={<MainLayout />}>
          {MainRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesLayout;
