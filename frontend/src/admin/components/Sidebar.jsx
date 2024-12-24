import { useState } from "react";
import {
  Home,
  Inventory,
  ShoppingCart,
  People,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard"); // Track the active menu item
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
      {/* Sidebar Menu */}
      <ul className="flex-1 py-4 space-y-4">
        {/* Dashboard */}
        <li
          onClick={() => handleClick("Dashboard")}
          className={`group flex items-center space-x-4 py-4 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Dashboard"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <Home fontSize="medium" />
          <span className="text-base font-medium">Dashboard</span>
        </li>

        {/* Products */}
        <li
          onClick={() => handleClick("Products")}
          className={`group flex items-center space-x-4 py-4 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Products"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <Inventory fontSize="small" />
          <span className="text-sm font-medium">Products</span>
        </li>

        {/* Orders */}
        <li
          onClick={() => handleClick("Orders")}
          className={`group flex items-center space-x-4 py-4 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Orders"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <ShoppingCart fontSize="small" />
          <span className="text-sm font-medium">Orders</span>
        </li>

        {/* Users */}
        <li
          onClick={() => handleClick("Users")}
          className={`group flex items-center space-x-4 py-4 px-6 rounded cursor-pointer transition-all duration-300 ${
            active === "Users"
              ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
              : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
          }`}
        >
          <People fontSize="small" />
          <span className="text-sm font-medium">Users</span>
          {open ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </li>

        {/* Collapsible Menu */}
        <Collapse in={open}>
          <ul className="pl-8 space-y-3">
            <li
              className={`text-sm cursor-pointer transition-all duration-300 ${
                active === "Admins"
                  ? "text-pink-400 font-bold"
                  : "hover:text-pink-400"
              }`}
              onClick={() => handleClick("Admins")}
            >
              Admins
            </li>
            <li
              className={`text-sm cursor-pointer transition-all duration-300 ${
                active === "Customers"
                  ? "text-pink-400 font-bold"
                  : "hover:text-pink-400"
              }`}
              onClick={() => handleClick("Customers")}
            >
              Customers
            </li>
          </ul>
        </Collapse>
      </ul>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-blue-800">
        <p className="text-center text-xs">© 2024 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;
