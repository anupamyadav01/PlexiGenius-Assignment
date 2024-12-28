import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../App";
import { v4 as generateUUID } from "uuid";
import axiosInstance from "../../../axiosConfig";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  const onDelete = () => {};
  console.log(cartItems);

  const updatePurchasedItems = async (productId) => {
    try {
      const response = await axiosInstance.post(
        `/cart/updatePurchasedItems/${productId}`,
        { quantity: 1 }
      );
      console.log(response);
    } catch (error) {
      console.error("Error in updatePurchasedItems: ", error);
    }
  };
  const onBuyNow = async (productId) => {
    const userName = JSON.parse(localStorage.getItem("user")).name;

    const orderDetails = {
      orderID: generateUUID(),
      customerName: userName,
      productId: productId,
      quantity: 1,
    };
    try {
      const response = await axiosInstance.post(
        "/order/placeOrder",
        orderDetails
      );
      if (response.status === 201) {
        updatePurchasedItems(productId);
      }
      console.log(response);
    } catch (error) {
      console.error("Error in onBuyNow: ", error);
    }
  };
  return (
    <div className="w-full">
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

        {cartItems?.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg border-collapse border border-gray-300 overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 border border-gray-300">Image</th>
                <th className="p-4 border border-gray-300">Name</th>
                <th className="p-4 border border-gray-300">Price</th>
                <th className="p-4 border border-gray-300">Quantity</th>
                <th className="p-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition text-center"
                >
                  <td className="p-4 border border-gray-300 flex items-center justify-center">
                    <img
                      src={item?.productId?.image}
                      alt={item?.productId?.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">
                    {item?.productId?.name}
                  </td>
                  <td className="p-4 border border-gray-300 text-green-600 font-bold">
                    ${item?.productId?.price}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {item?.productId?.quantity}
                  </td>
                  <td className="p-4 border border-gray-300 flex gap-4 justify-center items-center">
                    {/* Delete Icon */}
                    <button
                      onClick={() => onDelete(item?.productId?._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
                    >
                      <FaTrashAlt size={18} />
                      Delete
                    </button>

                    {/* Buy Now Button */}
                    <button
                      onClick={() => onBuyNow(item?.productId?._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-8 text-lg">
            Your cart is empty. Start adding items to your cart!
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
