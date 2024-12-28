import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <Navbar />
      <div className="text-center py-16 bg-gradient-to-b from-blue-200 via-blue-100 to-gray-50">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our E-Commerce Store
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover the best products and enjoy seamless shopping!
        </p>
        {/* Animated Button */}
        <button
          onClick={handleContinueShopping}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-blue-600 transition transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Home;
