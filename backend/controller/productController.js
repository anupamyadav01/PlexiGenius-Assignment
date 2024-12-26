import { ProductModel } from "../model/productModel.js";
import mongoose from "mongoose";

export const addNewProduct = async (req, res) => {
  const { name, price, description, category, status, image } = req.body;

  try {
    if (!name || !price || !description || !category || !status || !image) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const product = await ProductModel.create({
      name,
      category,
      price,
      image,
      description,
      status,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error in addNewProduct:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error in showAllProducts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editProduct = async (req, res) => {
  const { name, price, description, category, status, image } = req.body;
  const { productId } = req.params;

  try {
    const newProductId = new mongoose.Types.ObjectId(productId);
    if (!mongoose.Types.ObjectId.isValid(newProductId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }
    const existingProduct = await ProductModel.findById(newProductId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      newProductId,
      {
        name: name || existingProduct.name,
        price: price || existingProduct.price,
        description: description || existingProduct.description,
        category: category || existingProduct.category,
        status: status || existingProduct.status,
        image: image || existingProduct.image,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in editProduct:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProudct = async (req, res) => {
  const { productId } = req.params;
  try {
    const newProductId = new mongoose.Types.ObjectId(productId);
    if (!mongoose.Types.ObjectId.isValid(newProductId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const existingProduct = await ProductModel.findById(newProductId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await ProductModel.findByIdAndDelete(newProductId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
