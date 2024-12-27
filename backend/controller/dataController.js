import { CategoriesModel } from "../model/categoriesModel.js";
import { ProductModel } from "../model/productModel.js";
import { UserModel } from "../model/userModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const [Products, Customers, Categories] = await Promise.all([
      ProductModel.find().exec(),
      UserModel.find().exec(),
      CategoriesModel.find().exec(),
    ]);

    res.status(200).json({
      Products,
      Customers,
      Categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
