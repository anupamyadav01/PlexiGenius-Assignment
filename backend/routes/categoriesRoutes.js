import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../controller/categoriesController.js";

export const categoriesRoute = express.Router();

categoriesRoute.post("/addCategory", addCategory);

categoriesRoute.get("/getCategories", getCategories);

categoriesRoute.put("/editCategory/:categoryId", editCategory);

categoriesRoute.delete("/deleteCategory/:categoryId", deleteCategory);
