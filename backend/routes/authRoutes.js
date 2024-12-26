import express from "express";
import {
  isLoggedIn,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controller/userController.js";
import getUserDetails from "../middlewares/getUserDetails.js";

export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

authRoutes.post("/logout", logoutUser);

authRoutes.post("/isLoggedIn", getUserDetails, isLoggedIn);

authRoutes.patch("/resetPassword", resetPassword);
