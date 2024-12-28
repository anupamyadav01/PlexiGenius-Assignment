import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Import cart icon
import { useContext } from "react";
import { CartContext } from "../../App";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(CartContext);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("user");
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

              {/* Cart Icon with Dynamic Count */}
              <Link
                to="/cart"
                className="relative cursor-pointer text-blue-500 hover:text-blue-600 transition"
              >
                <AiOutlineShoppingCart size={20} className=" sm:size-7" />
                {loggedInUser.cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                    {loggedInUser?.cart?.length || 0}
                  </span>
                )}
              </Link>

              {/* Greeting */}
              <span className="text-gray-700 text-sm sm:text-lg hidden sm:block font-medium">
                Hi, {loggedInUser.name}
              </span>

              {/* Logout Icon */}
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

      {/* Mobile Navigation */}
      <div className="md:hidden mt-3 bg-gray-100 py-2 px-4 flex justify-between items-center text-gray-700">
        <Link to="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-500 transition">
          Products
        </Link>
        <Link to="/about" className="hover:text-blue-500 transition">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-blue-500 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
