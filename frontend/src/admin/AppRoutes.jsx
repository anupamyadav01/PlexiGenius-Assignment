import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Products from "./pages/Products/Products.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Customers from "./pages/Customers/Customers.jsx";
import Category from "./pages/Categories/Categories.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/categories" element={<Category />} />
    </Routes>
  );
};

export default AppRoutes;
