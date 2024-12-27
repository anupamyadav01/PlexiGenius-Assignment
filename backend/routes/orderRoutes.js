import express from "express";
import {
  confirmOrder,
  delivered,
  outForDelivery,
  placeOrder,
  shipOrder,
} from "../controller/orderController.js";

export const orderRoutes = express.Router();

orderRoutes.post("/placeOrder", placeOrder);

orderRoutes.post("/shipOrder", shipOrder);

orderRoutes.post("/confirmOrder", confirmOrder);

orderRoutes.post("/outForDelivery", outForDelivery);

orderRoutes.post("/delivered", delivered);
