import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controller/userController.js";
import getUserDetails from "../middlewares/getUserDetails.js";
import { updatePurchasedItems } from "../controller/orderController.js";

export const cartRoutes = express.Router();

cartRoutes.post("/addToCart/:productId", getUserDetails, addToCart);

cartRoutes.get("/getCartItems", getUserDetails, getCartItems);

cartRoutes.delete("/removeFromCart/:productId", getUserDetails, removeFromCart);

cartRoutes.post(
  "/updatePurchasedItems/:productId",
  getUserDetails,
  updatePurchasedItems
);
