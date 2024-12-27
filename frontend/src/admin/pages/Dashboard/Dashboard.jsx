import { Box, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import axiosInstance from "../../../../axiosConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // for default styles

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("userRole");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axiosInstance.get("/general/getDashboardData");
        setDashboardData(response?.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };
    getAllData();
  }, []);

  // Check for loading and error states
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton count={1} width={200} height={50} />{" "}
        {/* Loader while loading */}
      </div>
    );

  if (error) return <p>{error}</p>;

  const cardsConfig = [
    {
      name: "Categories",
      path: "/admin/categories",
      bg: "from-blue-600 via-purple-500 to-pink-500",
      count: dashboardData?.Categories?.length || 0,
      description: "Manage your product categories here.",
    },
    {
      name: "Products",
      path: "/admin/products",
      bg: "from-green-500 via-teal-400 to-cyan-500",
      count: dashboardData?.Products?.length || 0,
      description: "Track and manage your products.",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      bg: "from-yellow-500 via-orange-500 to-red-500",
      count: 120,
      description: "Monitor and process customer orders.",
    },
    {
      name: "Customers",
      path: "/admin/customers",
      bg: "from-indigo-500 via-blue-500 to-purple-500",
      count: dashboardData?.Customers?.length || 0,
      description: "View and manage customer data.",
    },
  ];

  return (
    <Box
      py={1}
      px={2}
      sx={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center h-16 px-4 sm:px-6 bg-white text-black shadow-lg">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
            Plexi<span className="text-gray-900">Genius</span>
          </h1>
        </div>

        {/* Sign Out Button */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              startIcon={<Logout />}
              className="capitalize"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Cards */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center"
                >
                  <Skeleton height={40} width="80%" className="mb-4" />
                  <Skeleton width="60%" className="mb-4" />
                  <Skeleton width="50%" />
                </div>
              ))
            : cardsConfig.map((card) => (
                <Link
                  key={card?.name}
                  to={card?.path}
                  className={`p-6 bg-gradient-to-r ${card.bg} text-white rounded-xl shadow-lg`}
                >
                  <h3 className="text-lg font-bold">{card.name}</h3>
                  <p className="mt-2 text-4xl font-extrabold">{card.count}</p>
                  <p className="text-sm mt-4">{card.description}</p>
                </Link>
              ))}
        </div>

        {/* Products Table */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">All Products</h2>
          <div className="overflow-x-auto">
            {loading ? (
              <Skeleton height={400} count={5} className="rounded-lg" />
            ) : (
              <table className="min-w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.Products?.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-green-500">
                        {product.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
