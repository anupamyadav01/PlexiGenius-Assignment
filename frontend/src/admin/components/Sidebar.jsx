import { useState } from "react";
import { Home, Inventory, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  const handleClick = (menuItem) => {
    if (menuItem === "Users") {
      setOpen(!open);
    } else {
      setOpen(false);
    }
    setActive(menuItem);
  };

  return (
    <div className="w-[20%] h-screen bg-[#202d31] text-white shadow-lg flex flex-col">
      <ul className="flex-1 space-y-2">
        <Link
          to="/admin/dashboard"
          onClick={() => handleClick("Dashboard")}
          className={`group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Dashboard"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <Home fontSize="medium" />
          <span className="text-base font-medium">Dashboard</span>
        </Link>

        <Link
          to="/admin/categories"
          onClick={() => handleClick("Categories")}
          className={`group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Categories"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <Inventory fontSize="small" />
          <span className="text-sm font-medium">Categories</span>
        </Link>

        <Link
          to="/admin/products"
          onClick={() => handleClick("Products")}
          className={`group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Products"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <Inventory fontSize="small" />
          <span className="text-sm font-medium">Products</span>
        </Link>

        <Link
          to="/admin/customers"
          onClick={() => handleClick("Customers")}
          className={`group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Customers"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <ShoppingCart fontSize="small" />
          <span className="text-sm font-medium">Customers</span>
        </Link>

        <Link
          to="/admin/orders"
          onClick={() => handleClick("Orders")}
          className={`group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Orders"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <ShoppingCart fontSize="small" />
          <span className="text-sm font-medium">Orders</span>
        </Link>
      </ul>

      <div className="p-4 border-t border-blue-800">
        <p className="text-center text-xs">© 2024 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;
