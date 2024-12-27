import { Order } from "../model/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { orderID, customerName, productId } = req.body;

    if (!orderID || !customerName || !productId) {
      return res.status(400).json({
        message: "Order ID, customer name, and product IDs are required.",
      });
    }

    const newOrder = new Order({
      orderID,
      customerName,
      productId,
      status: "Open",
      statusHistory: [{ status: "Open" }],
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error in placeOrder: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderID, status } = req.body;

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
    const orders = await Order.find().populate("productIds", "name");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    const formattedOrders = orders.map((order) => ({
      orderID: order.orderID,
      customerName: order.customerName,
      productNames: order.productIds.map((product) => product.name),
      status: order.status,
      statusHistory: order.statusHistory,
    }));

    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("Error in listOrders: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const shipOrder = async (req, res) => updateOrderStatus(req, res);
export const confirmOrder = async (req, res) => updateOrderStatus(req, res);
export const outForDelivery = async (req, res) => updateOrderStatus(req, res);
export const delivered = async (req, res) => updateOrderStatus(req, res);
