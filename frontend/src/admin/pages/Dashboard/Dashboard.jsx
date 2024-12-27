import { Box, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import axiosInstance from "../../../../axiosConfig";
import { useEffect, useState } from "react";

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
        // console.log(response?.data);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { Products, Customers, Categories } = dashboardData;

  return (
    <Box
      p={3}
      sx={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center h-16 px-6 bg-white text-black shadow-lg">
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
          Plexi<span className="text-gray-900">Genius</span>
        </h1>
        <div className="flex items-center space-x-4">
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
      </nav>

      {/* Main Dashboard Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-bold">Categories</h3>
            <p className="mt-2 text-4xl font-extrabold">{Categories.length}</p>
            <p className="text-sm mt-4">Manage your product categories here.</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-500 via-teal-400 to-cyan-500 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-bold">Products</h3>
            <p className="mt-2 text-4xl font-extrabold">{Products.length}</p>
            <p className="text-sm mt-4">Track and manage your products.</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-bold">Orders</h3>
            <p className="mt-2 text-4xl font-extrabold">120</p>
            <p className="text-sm mt-4">Monitor and process customer orders.</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-bold">Customers</h3>
            <p className="mt-2 text-4xl font-extrabold">{Customers.length}</p>
            <p className="text-sm mt-4">View and manage customer data.</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">All Products</h2>
          <div className="overflow-x-auto">
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
                {Products.map((product) => (
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
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
