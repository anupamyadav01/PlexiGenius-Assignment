import { UserModel } from "../model/userModel.js";

export const getAllCustomers = async (req, res) => {
  try {
    // Find all users whose productsPurchased array has at least one item
    const customers = await UserModel.find({
      "productsPurchased.0": { $exists: true },
    })
      .select("-password")
      .lean();

    if (customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
