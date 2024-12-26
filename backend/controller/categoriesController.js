import { CategoriesModel } from "../model/categoriesModel.js";

export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required." });
  }

  try {
    const existingCategory = await CategoriesModel.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }

    const newCategory = await CategoriesModel.create({ name: name.trim() });

    return res.status(201).json({
      message: "Category added successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in addCategory:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getCategories = async (req, res) => {
  try {
    const allCategories = await CategoriesModel.find();

    if (allCategories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    return res.status(200).json({ categories: allCategories });
  } catch (error) {
    console.error("Error in getCategories:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const editCategory = async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  if (!categoryId || !name) {
    return res
      .status(400)
      .json({ message: "Category ID and name are required." });
  }

  try {
    const existingCategory = await CategoriesModel.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    existingCategory.name = name.trim();
    await existingCategory.save();

    return res.status(200).json({
      message: "Category updated successfully.",
      category: existingCategory,
    });
  } catch (error) {
    console.error("Error in editCategory:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    console.log(categoryId);

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required." });
    }

    const existingCategory = await CategoriesModel.findById({
      _id: categoryId,
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    await CategoriesModel.findByIdAndDelete(categoryId);

    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return res.status(500).json({ message: "Internal server message." });
  }
};
