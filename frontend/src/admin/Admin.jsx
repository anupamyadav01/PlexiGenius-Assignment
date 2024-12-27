import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import Customer from "./pages/Customers/Customers";
import Category from "./pages/Categories/Categories";
import PageNotFound from "../user/pages/PageNotFound";

const Admin = () => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="w-full h-full">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/categories" element={<Category />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
