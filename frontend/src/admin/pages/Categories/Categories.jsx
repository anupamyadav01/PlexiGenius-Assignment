import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../../axiosConfig";
const Category = () => {
  const [categories, setCategories] = useState([]);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddOrEditCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      if (isEditMode) {
        // Update category via API
        const response = await axiosInstance.put(
          `/categories/editCategory/${selectedCategory._id}`,
          { name: categoryName.trim() }
        );

        if (response.status === 200) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === selectedCategory._id
                ? { ...cat, name: categoryName.trim() }
                : cat
            )
          );
          toast.success("Category updated successfully!");
        }
      } else {
        // Add new category via API
        const response = await axiosInstance.post("/categories/addCategory", {
          name: categoryName.trim(),
        });

        if (response.status === 201) {
          setCategories((prev) => [...prev, response.data.category]);
          toast.success("Category added successfully!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }

    handleCloseDialog();
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setSelectedCategory(category);
    setCategoryName(category.name);
    setDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    // console.log(categoryToDelete);

    setCategories((prev) =>
      prev.filter((category) => category._id !== categoryToDelete._id)
    );
    try {
      const response = await axiosInstance.delete(
        `/categories/deleteCategory/${categoryToDelete?._id}`
      );

      // console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDeleteDialogOpen(false);
  };

  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditMode(false);
    setSelectedCategory(null);
    setCategoryName("");
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories/getCategories");
        console.log(response?.data?.categories);
        setCategories(response?.data?.categories);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen">
      {/* Header */}
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold uppercase">Category Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => setDialogOpen(true)}
        >
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Category Name</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr
                key={category?._id}
                className="odd:bg-gray-100 even:bg-gray-200"
              >
                <td className="py-2 px-4">{category.name}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-center space-x-4">
                    <button
                      className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 shadow-md"
                      onClick={() => handleEditCategory(category)}
                    >
                      <FaEdit className="mr-2" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300 shadow-md"
                      onClick={() => handleOpenDeleteDialog(category)}
                    >
                      <FaTrashAlt className="mr-2" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Category" : "Add Category"}
            </h2>
            <input
              type="text"
              className="border p-2 w-full mb-4 rounded"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddOrEditCategory}
                disabled={!categoryName.trim()}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-center">
              Are you sure you want to delete{" "}
              <strong>{categoryToDelete?.name}</strong>?
            </p>
            <div className="flex justify-center gap-5 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDeleteCategory}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
