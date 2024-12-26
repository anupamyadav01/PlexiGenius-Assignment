import { Box, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import axiosInstance from "../../../../axiosConfig";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("userRole");
        window.location.href = "/login";
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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
        {/* Logo */}
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
          Plexi<span className="text-gray-900">Genius</span>
        </h1>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          {/* Signout Button */}
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            startIcon={<Logout />}
            className="capitalize"
            sale
          >
            Sign Out
          </Button>

          {/* Profile Button */}
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="font-bold text-gray-700">P</span>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Dashboard Overview
        </h2>

        {/* Animated Cards */}
        <div className="grid grid-cols-4 gap-6">
          {/* Categories */}
          <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold">Categories</h3>
            <p className="mt-2 text-4xl font-extrabold">12</p>
            <p className="text-sm mt-4">Manage your product categories here.</p>
          </div>

          {/* Products */}
          <div className="p-6 bg-gradient-to-r from-green-500 via-teal-400 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold">Products</h3>
            <p className="mt-2 text-4xl font-extrabold">45</p>
            <p className="text-sm mt-4">Track and manage your products.</p>
          </div>

          {/* Orders */}
          <div className="p-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold">Orders</h3>
            <p className="mt-2 text-4xl font-extrabold">120</p>
            <p className="text-sm mt-4">Monitor and process customer orders.</p>
          </div>

          {/* Customers */}
          <div className="p-6 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold">Customers</h3>
            <p className="mt-2 text-4xl font-extrabold">300</p>
            <p className="text-sm mt-4">View and manage customer data.</p>
          </div>
        </div>

        {/* All Sales Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">All Sales</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Example Data */}
                {[
                  {
                    id: "#1234",
                    product: "Smartphone",
                    customer: "John Doe",
                    date: "2024-12-25",
                    amount: "$799",
                    status: "Completed",
                  },
                  {
                    id: "#1235",
                    product: "Laptop",
                    customer: "Jane Smith",
                    date: "2024-12-24",
                    amount: "$1299",
                    status: "Pending",
                  },
                  {
                    id: "#1236",
                    product: "Headphones",
                    customer: "Robert Wilson",
                    date: "2024-12-23",
                    amount: "$199",
                    status: "Completed",
                  },
                ].map((sale, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.amount}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-bold ${
                        sale.status === "Completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {sale.status}
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
