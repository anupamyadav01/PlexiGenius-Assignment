import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { connectToDB } from "./services/connectToDB.js";
import { authRoutes } from "./routes/authRoutes.js";

dotenv.config();
export const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 10000;

// app.use("/client", clientRoutes);
// app.use("/product", productRoutes);
// app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

connectToDB();
