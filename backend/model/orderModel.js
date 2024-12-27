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
  productNames: {
    type: [String],
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

module.exports = mongoose.model("Order", OrderSchema);
