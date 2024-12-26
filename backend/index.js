import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectToDB } from "./services/connectToDB.js";
import { categoriesRoute } from "./routes/categoriesRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 10001;
export const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/categories", categoriesRoute);
app.use("/api/products", productRouter);
app.use("/api/auth", authRoutes);

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
