import express from "express";
import {
  createProduct,
  deleteProudct,
  editProduct,
  showAllProducts,
} from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.post("/create", createProduct);

productRouter.get("/showAllProducts", showAllProducts);

productRouter.patch("/editProduct/:id", editProduct);

productRouter.delete("/deleteProduct/:id", deleteProudct);
