import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    default: "Open",
  },
  statusHistory: [
    {
      status: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Order = mongoose.model("Order", OrderSchema);
