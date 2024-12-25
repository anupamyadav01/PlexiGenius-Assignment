import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    prodImg: {
      type: String,
      required: true,
    },
    prodDesc: {
      type: String,
      required: true,
    },
    prodPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Product", productSchema);
