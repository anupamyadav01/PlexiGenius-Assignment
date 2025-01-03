import { Routes, Route, useLocation } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "./App";

import PageNotFound from "./user/pages/PageNotFound";
import Home from "./user/pages/Home";
import LoginForm from "./user/pages/Login";
import RegisterForm from "./user/pages/Register";
import Admin from "./admin/Admin";
import Products from "./user/pages/Product";
import CartPage from "./user/pages/CartPage";
import { useEffect } from "react";

const AppRoutes = ({ loading, fetchUserDetails }) => {
  const location = useLocation();
  const { userRole } = useContext(CartContext);

  useEffect(() => {
    fetchUserDetails();
  }, [location]);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center h-screen bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-md"></div>

        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>

        <p className="relative text-black text-4xl font-semibold animate-jump">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<PageNotFound />} />
      {userRole === "admin" && <Route path="/admin/*" element={<Admin />} />}
    </Routes>
  );
};

export default AppRoutes;
