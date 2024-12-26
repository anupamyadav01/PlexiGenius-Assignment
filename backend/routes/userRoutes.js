import express from "express";

export const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout", logoutUser);

userRoutes.patch("/resetPassword", resetPassword);
