import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Import cart icon
import { useContext } from "react";
import { CartContext } from "../../App";
import axiosInstance from "../../../axiosConfig";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(CartContext);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("userRole");
        setLoggedInUser(null);
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-500">
          E-Shop
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700">
          <Link
            to="/"
            className="hover:text-blue-500 transition text-sm sm:text-base"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-blue-500 transition text-sm sm:text-base"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500 transition text-sm sm:text-base"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 transition text-sm sm:text-base"
          >
            Contact
          </Link>
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {loggedInUser ? (
            <>
              {/* Admin Dashboard Button */}
              {loggedInUser?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="bg-green-500 text-white text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-green-600 transition shadow-md"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative cursor-pointer text-blue-500 hover:text-blue-600 transition"
              >
                <AiOutlineShoppingCart size={20} />
              </Link>

              {/* Greeting */}
              <span className="text-gray-700 text-sm sm:text-lg hidden sm:block font-medium">
                Hi, {loggedInUser.name}
              </span>

              {/* Logout */}
              <div
                onClick={handleLogout}
                className="text-blue-500 text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition"
              >
                <FiLogOut />
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-blue-600 transition shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
