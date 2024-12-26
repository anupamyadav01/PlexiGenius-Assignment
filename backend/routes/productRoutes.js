import express from "express";
import {
  addNewProduct,
  editProduct,
  deleteProduct,
  showAllProducts,
} from "../controller/productController.js";
import uploadToCloudinary from "../middlewares/cloudinaryUpload.js";

export const productRouter = express.Router();

productRouter.post("/addProduct", uploadToCloudinary, addNewProduct);

productRouter.get("/showAllProducts", showAllProducts);

productRouter.patch("/editProduct/:productId", editProduct);

productRouter.delete("/deleteProduct/:productId", deleteProduct);
