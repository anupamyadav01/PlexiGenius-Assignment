import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../../axiosConfig";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

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
    setCategories((prev) =>
      prev.filter((category) => category._id !== categoryToDelete._id)
    );
    try {
      const response = await axiosInstance.delete(
        `/categories/deleteCategory/${categoryToDelete?._id}`
      );

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
        setIsLoading(true);
        const response = await axiosInstance.get("/categories/getCategories");
        setCategories(response?.data?.categories);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md sm:text-2xl font-bold uppercase">
          Category Management
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-xs sm:text-base"
          onClick={() => setDialogOpen(true)}
        >
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-hidden relative">
        {/* Blurred background overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-md z-10"></div>
        )}

        <table className="w-full text-center z-20 relative">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-xs sm:text-sm">Category Name</th>
              <th className="py-2 px-4 text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? // Skeleton Loader
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-100 even:bg-gray-200"
                    >
                      <td className="py-2 px-4 text-xs sm:text-sm">
                        <div className="w-32 h-5 bg-gray-300 animate-pulse rounded"></div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex justify-center space-x-2 sm:space-x-4">
                          <div className="w-20 h-7 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-20 h-7 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              : categories?.map((category) => (
                  <tr
                    key={category?._id}
                    className="odd:bg-gray-100 even:bg-gray-200"
                  >
                    <td className="py-2 px-4 text-xs sm:text-sm">
                      {category.name}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex justify-center space-x-2 sm:space-x-4">
                        {/* Edit Button */}
                        <button
                          className="flex items-center px-3 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 shadow-md text-xs sm:text-sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <FaEdit className="mr-1 sm:mr-2" />
                          <span className="sm:block hidden text-xs sm:text-sm">
                            Edit
                          </span>
                        </button>

                        {/* Delete Button */}
                        <button
                          className="flex items-center px-3 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300 shadow-md text-xs sm:text-sm"
                          onClick={() => handleOpenDeleteDialog(category)}
                        >
                          <FaTrashAlt className="mr-1 sm:mr-2" />
                          <span className="sm:block hidden text-xs sm:text-sm">
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {categories?.length === 0 && (
        <div className="flex items-center justify-center mt-8">
          <p className="text-lg text-gray-500">No categories found.</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {isEditMode ? "Edit Category" : "Add Category"}
            </h2>
            <input
              type="text"
              className="border p-2 w-full mb-4 rounded text-sm sm:text-base"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-center text-sm sm:text-base">
              Are you sure you want to delete{" "}
              <strong>{categoryToDelete?.name}</strong>?
            </p>
            <div className="flex justify-center gap-5 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
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
