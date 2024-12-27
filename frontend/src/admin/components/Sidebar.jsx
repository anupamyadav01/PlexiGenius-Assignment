import { useState, useEffect } from "react";
import { Home, Inventory, ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = location.pathname.split("/")[2]?.toLowerCase() || "";
    setActive(path);

    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // navigation links
  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <Home className="text-2xl" />,
    },
    {
      name: "categories",
      label: "Categories",
      icon: <CategoryIcon className="text-2xl" />,
    },
    {
      name: "products",
      label: "Products",
      icon: <Inventory fontSize="small" />,
    },
    {
      name: "customers",
      label: "Customers",
      icon: <PeopleAltIcon className="text-2xl" />,
    },
    {
      name: "orders",
      label: "Orders",
      icon: <ShoppingCart fontSize="medium" />,
    },
  ];

  return (
    <div className="w-[20%] bg-[#202d31] text-white shadow-lg flex flex-col">
      <ul className="flex-1 space-y-2">
        {loading
          ? [...Array(5)].map((_, idx) => (
              <li
                key={idx}
                className="group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 skeleton-item"
              >
                <Skeleton
                  circle={true}
                  height={30}
                  width={30}
                  className="skeleton-blur"
                />{" "}
                <Skeleton width={100} height={20} className="skeleton-blur" />{" "}
              </li>
            ))
          : menuItems.map((item) => (
              <Link
                key={item.name}
                to={`/admin/${item.name}`}
                onClick={() => setActive(item.name)}
                className={`group flex items-center space-x-4 py-5 px-6 rounded cursor-pointer transition-all duration-300 ${
                  active === item.name
                    ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg scale-100"
                    : "hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-pink-500"
                }`}
              >
                {/* Show icon */}
                {item.icon}

                {/* Show text on large screens */}
                <span className="text-base font-medium hidden sm:block">
                  {item.label}
                </span>
              </Link>
            ))}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-blue-800">
        <p className="text-center text-xs">© 2024 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;
