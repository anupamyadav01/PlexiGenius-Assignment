import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controller/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout", logoutUser);

userRoutes.patch("/resetPassword", resetPassword);
