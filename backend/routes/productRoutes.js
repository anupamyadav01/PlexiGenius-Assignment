import express from "express";
import {
  addNewProduct,
  deleteProudct,
  editProduct,
  showAllProducts,
} from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.post("/addProduct", addNewProduct);

productRouter.get("/showAllProducts", showAllProducts);

productRouter.patch("/editProduct/:productId", editProduct);

productRouter.delete("/deleteProduct/:productId", deleteProudct);
