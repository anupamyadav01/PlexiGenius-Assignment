import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Products from "./pages/Products/Products.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Customers from "./pages/Customers/Customers.jsx";
import Category from "./pages/Categories/Categories.jsx";
import Register from "../user/pages/Register.jsx";
import Login from "../user/pages/Login.jsx";

const isAuthenticated = () => {
  return localStorage.getItem("userToken") !== null;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          isAuthenticated() ? <Dashboard /> : <Navigate to="/register" />
        }
      />
      <Route
        path="/products"
        element={isAuthenticated() ? <Products /> : <Navigate to="/register" />}
      />
      <Route
        path="/orders"
        element={isAuthenticated() ? <Orders /> : <Navigate to="/register" />}
      />
      <Route
        path="/customers"
        element={
          isAuthenticated() ? <Customers /> : <Navigate to="/register" />
        }
      />
      <Route
        path="/categories"
        element={isAuthenticated() ? <Category /> : <Navigate to="/register" />}
      />
    </Routes>
  );
};

export default AppRoutes;
