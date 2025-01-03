import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Edit, Delete, ArrowBack, ArrowForward } from "@mui/icons-material";
import axiosInstance from "../../../../axiosConfig";
import AddProductDialog from "../../components/AddProductDialog";
import EditProductDialog from "../../components/EditProductDialog";
import DeleteDialog from "../../components/DeleteDialog";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Home Appliances",
  ]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
    status: "Available",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/showAllProducts");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axiosInstance.post(
        "/products/addProduct",
        newProduct
      );
      setProducts((prev) => [...prev, response?.data?.product]);
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async () => {
    try {
      await axiosInstance.patch(
        `/products/editProduct/${selectedProductIndex}`,
        newProduct
      );
      setProducts((prev) =>
        prev.map((product) =>
          product._id === selectedProductIndex ? newProduct : product
        )
      );
      setEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(
        `/products/deleteProduct/${selectedProductIndex}`
      );
      setProducts((prev) =>
        prev.filter((product) => product._id !== selectedProductIndex)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      image: "",
      description: "",
      price: "",
      category: "",
      status: "Available",
    });
  };

  const handleEditClick = (index) => {
    setSelectedProductIndex(index);
    const selectedProduct = products.find((product) => product._id === index);
    setNewProduct(selectedProduct);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (index) => {
    setSelectedProductIndex(index);
    setDeleteDialogOpen(true);
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories/getCategories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(products.length / itemsPerPage) ? prev + 1 : prev
    );
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box className="px-6 bg-gradient-to-br from-gray-200 to-blue-200 min-h-screen">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        <p className="text-center font-bold text-2xl md:text-4xl">Products</p>
        <Box className="flex justify-end w-full md:w-auto">
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 px-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-600 hover:scale-105 active:scale-95"
          >
            Add Product
          </button>
        </Box>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 opacity-40 backdrop-blur-md z-10"></div>
        )}

        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
            <tr className="text-sm">
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Price ($)</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="odd:bg-gray-50 even:bg-gray-100">
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-32 h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-48 h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-20 h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <div className="w-20 h-6 bg-gray-300 rounded"></div>
                          <div className="w-20 h-6 bg-gray-300 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              : paginatedProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base">
                      {product.description}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base">
                      ${product.price}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base">
                      {product.status}
                    </td>
                    <td className="px-4 flex gap-2 py-4">
                      <button
                        onClick={() => handleEditClick(product._id)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-md hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-600 flex items-center"
                      >
                        <Edit className="mr-2" />
                        <span className="hidden sm:block">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="px-4 py-2 border border-red-500 text-red-500 text-sm rounded-md hover:border-red-600 hover:text-red-600 flex items-center"
                      >
                        <Delete className="mr-2" />
                        <span className="hidden sm:block">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {products?.length === 0 && (
        <div className="flex items-center justify-center mt-8">
          <p className="text-lg text-gray-500">No products found.</p>
        </div>
      )}

      <div className="flex justify-center gap-5 items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ArrowBack className="mr-2" />
          Prev
        </button>
        <p className="text-gray-700">
          Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow ${
            currentPage === Math.ceil(products.length / itemsPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
          <ArrowForward className="ml-2" />
        </button>
      </div>

      <AddProductDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        categories={categories}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleAddProduct={handleAddProduct}
        newProduct={newProduct}
      />
      <EditProductDialog
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        categories={categories}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleEditProduct={handleEditProduct}
        newProduct={newProduct}
      />
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDeleteProduct={handleDeleteProduct}
      />
    </Box>
  );
};

export default Products;
