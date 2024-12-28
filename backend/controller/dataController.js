import { CategoriesModel } from "../model/categoriesModel.js";
import { ProductModel } from "../model/productModel.js";
import { UserModel } from "../model/userModel.js";
import { Order } from "../model/orderModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const [Products, Customers, Categories, Orders] = await Promise.all([
      ProductModel.find().exec(),
      UserModel.find().exec(),
      CategoriesModel.find().exec(),
      Order.find().exec,
    ]);

    res.status(200).json({
      Products,
      Customers,
      Categories,
      Orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
