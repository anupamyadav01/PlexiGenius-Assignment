import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  shipOrder,
  confirmOrder,
  outForDelivery,
  delivered,
} from "../controller/orderController.js";

export const orderRoutes = express.Router();

orderRoutes.post("/placeOrder", placeOrder);
orderRoutes.post("/updateStatus", updateOrderStatus);
orderRoutes.post("/shipOrder", (req, res) => {
  req.body.status = "Shipped";
  shipOrder(req, res);
});
orderRoutes.post("/confirmOrder", (req, res) => {
  req.body.status = "Confirmed";
  confirmOrder(req, res);
});
orderRoutes.post("/outForDelivery", (req, res) => {
  req.body.status = "Out For Delivery";
  outForDelivery(req, res);
});
orderRoutes.post("/delivered", (req, res) => {
  req.body.status = "Delivered";
  delivered(req, res);
});
