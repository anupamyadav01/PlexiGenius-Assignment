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
  const { id, name } = req.body;

  if (!id || !name) {
    return res
      .status(400)
      .json({ message: "Category ID and name are required." });
  }

  try {
    const existingCategory = await CategoriesModel.findById(id);

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
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Category ID is required." });
  }

  try {
    const existingCategory = await CategoriesModel.findById(id);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    await CategoriesModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Category removed successfully." });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return res.status(500).json({ message: "Internal server message." });
  }
};
