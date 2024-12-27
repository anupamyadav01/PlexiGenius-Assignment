import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
// import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Import cart icon

const Navbar = () => {
  //   const [active, setActive] = useState("");

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          E-Shop
        </Link>

        {/* Nav Links */}
        <div className="hidden text-lg md:flex space-x-6 text-gray-700">
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

        {/* Logout Icon */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative cursor-pointer text-blue-500 hover:text-blue-600 transition"
          >
            <AiOutlineShoppingCart size={24} />
            {/* Cart Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3 {/* Replace this number with dynamic cart count */}
            </span>
          </Link>

          {/* Logout Icon */}
          <div className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600 transition">
            <FiLogOut />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
