import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Simulate loading data for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders([
        {
          id: 1,
          orderId: "ORD001",
          productImg: "https://via.placeholder.com/50",
          productName: "Smartphone",
          customerName: "John Doe",
          status: "Delivered",
          timeline: [
            {
              status: "Order Confirmed",
              timestamp: "Fri, 22nd Nov '24 - 11:21 AM",
              description: "Your order has been placed.",
            },
            {
              status: "Shipped",
              timestamp: "Sat, 23rd Nov '24 - 10:28 AM",
              description: "Your item has been picked up by courier partner.",
            },
            {
              status: "Out For Delivery",
              timestamp: "Mon, 25th Nov '24 - 8:17 AM",
              description: "Your item is out for delivery.",
            },
            {
              status: "Delivered",
              timestamp: "Mon, 25th Nov '24 - 9:34 AM",
              description: "Your item has been delivered.",
            },
          ],
        },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDetailsOpen = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setSelectedOrder(null);
    setDetailsOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Order Management
      </h1>

      {/* Orders Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white mb-8 mx-auto w-full relative">
        {loading && (
          <div className="absolute inset-0 bg-white opacity-80 backdrop-blur-md z-10"></div>
        )}

        {loading ? (
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
              <tr className="border-b">
                <th className="px-4 py-4 animate-pulse">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </th>
                <th className="px-4 py-4 animate-pulse">
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-4 animate-pulse">
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-4 animate-pulse">
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-4 animate-pulse">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </th>
                <th className="px-4 py-4 animate-pulse">
                  <div className="w-40 h-4 bg-gray-300 rounded"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b animate-pulse">
                    <td className="px-4 py-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-20 h-4 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-32 h-4 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-32 h-4 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-24 h-4 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-40 h-4 bg-gray-100 rounded"></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
              <tr className="border-b">
                <th className="px-4 py-4">Product Image</th>
                <th className="px-4 py-4">Order ID</th>
                <th className="px-4 py-4">Product Name</th>
                <th className="px-4 py-4">Customer Name</th>
                <th className="px-4 py-4">Order Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={order.productImg}
                      alt="Product"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.productName}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : order.status === "Out For Delivery"
                          ? "bg-orange-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {/* Status Change Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg bg-gray-100 text-sm"
                    >
                      <option value="Order Confirmed">Order Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => handleDetailsOpen(order)}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      More Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Order Details */}
      {detailsOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h3 className="text-xl font-bold text-center text-indigo-700 mb-4">
              Order Timeline for {selectedOrder.orderId}
            </h3>
            <div className="space-y-4">
              {selectedOrder.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1" />
                  <div>
                    <p className="font-semibold">{event.status}</p>
                    <p className="text-sm text-gray-500">{event.timestamp}</p>
                    <p className="text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-6">
              <button
                onClick={handleDetailsClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
