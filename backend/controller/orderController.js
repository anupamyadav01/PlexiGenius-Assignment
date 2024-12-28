import { Order } from "../model/orderModel.js";
import { UserModel } from "../model/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { orderID, customerName, productId } = req.body;

    // Validate required fields
    if (!orderID || !customerName || !productId) {
      return res.status(400).json({
        message: "Order ID, customer name, and product ID are required.",
      });
    }

    // Check if an order with the same orderID already exists
    const existingOrder = await Order.findOne({ orderID });

    if (existingOrder) {
      // If order exists, append the productId to the productIds array
      existingOrder.productIds.push(productId);
      await existingOrder.save();

      return res.status(200).json({
        message: "Product added to existing order successfully",
        order: existingOrder,
      });
    } else {
      // If order does not exist, create a new order
      const newOrder = new Order({
        orderID,
        customerName,
        productId: productId, // Initialize with single productId
        status: "Open",
        statusHistory: [{ status: "Open" }],
      });

      await newOrder.save();

      return res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
      });
    }
  } catch (error) {
    console.error("Error in placeOrder: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderID } = req.params;

    if (!orderID || !status) {
      return res
        .status(400)
        .json({ message: "Order ID and status are required." });
    }

    const order = await Order.findOne({ orderID });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    order.statusHistory.push({ status });

    await order.save();

    return res.status(200).json({
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    console.error("Error in updateOrderStatus: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listOrders = async (req, res) => {
  try {
    // Fetch orders and populate the productId field to get product details
    const orders = await Order.find().populate("productId", "name");

    // If no orders are found, return a 404 response
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    // Format the orders to include product name from the populated productId
    const formattedOrders = orders.map((order) => ({
      orderID: order.orderID,
      customerName: order.customerName,
      productName: order.productId?.name || "Unknown Product",
      status: order.status,
      statusHistory: order.statusHistory,
    }));

    // Return the formatted orders
    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("Error in listOrders: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePurchasedItems = async (req, res) => {
  const user = req.user; // Assuming `req.user` contains the authenticated user's details
  try {
    const { productId } = req.params;
    const { quantity } = req.body; // Quantity is passed in the request body

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    // Update or add the product in the productsPurchased array
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id, "productsPurchased.productId": { $ne: productId } }, // Check if the product is not already in the array
      {
        $push: {
          productsPurchased: {
            productId,
            quantity,
          },
        },
      },
      { new: true } // Return the updated document
    );

    // If the product already exists, update its quantity
    if (!updatedUser) {
      await UserModel.findOneAndUpdate(
        { _id: user._id, "productsPurchased.productId": productId },
        {
          $inc: {
            "productsPurchased.$.quantity": quantity, // Increment quantity
          },
        },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Product added to purchased items successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const shipOrder = async (req, res) => updateOrderStatus(req, res);
export const confirmOrder = async (req, res) => updateOrderStatus(req, res);
export const outForDelivery = async (req, res) => updateOrderStatus(req, res);
export const delivered = async (req, res) => updateOrderStatus(req, res);
