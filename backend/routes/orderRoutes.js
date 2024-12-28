import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  listOrders,
} from "../controller/orderController.js";

export const orderRoutes = express.Router();

orderRoutes.post("/placeOrder", placeOrder);
orderRoutes.put("/updateStatus/:orderID", updateOrderStatus);
orderRoutes.get("/getAllOrders", listOrders);
