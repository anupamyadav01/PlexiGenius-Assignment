import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../../../axiosConfig";
import DeleteDialog from "../../components/DeleteDialog";
import EditProductDialog from "../../components/EditProductDialog";
import AddProductDialog from "../../components/AddProductDialog";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState([
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
      setProducts((prev) => [...prev, newProduct]);
      await axiosInstance.post("/products/addProduct", newProduct);
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const handleEditProduct = async () => {
    try {
      // const productId = products[selectedProductIndex]._id;
      const response = await axiosInstance.put(
        `/products/editProduct/${selectedProductIndex}`,
        newProduct
      );
      setProducts((prev) =>
        prev.map((product) =>
          product._id === selectedProductIndex ? response?.data : product
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
      // const productId = products[selectedProductIndex]._id;
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

  console.log(newProduct);

  const handleDeleteClick = async (index) => {
    setSelectedProductIndex(index);
    setDeleteDialogOpen(true);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: "2px solid #ddd",
          }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price ($)", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(params.row.id)}
            sx={{
              backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "#fff",
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.id)}
            sx={{
              borderColor: "#ff616f",
              color: "#ff616f",
              "&:hover": {
                borderColor: "#ff4a59",
                color: "#ff4a59",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  console.log("Products:", products);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/showAllProducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box
      p={3}
      sx={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Product Management
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "#000",
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #ff6b6b, #ff9e57)",
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Data Table */}
      <Box
        sx={{
          height: 400,
          width: "100%",
          "& .MuiDataGrid-root": {
            borderRadius: 1,
            backgroundColor: "#ffffff",
            fontSize: "1.1rem",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundImage: "linear-gradient(to right, #2193b0, #6dd5ed)",
            fontWeight: "bold",
          },
        }}
      >
        <DataGrid
          rows={products?.map((product) => ({ id: product?._id, ...product }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      {/* Add Product Dialog */}
      <AddProductDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        newProduct={newProduct}
        handleAddProduct={handleAddProduct}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        categories={categories}
      />

      {/* Edit Product Dialog */}

      <EditProductDialog
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        categories={categories}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleEditProduct={handleEditProduct}
      />

      {/* Delete Confirmation Dialog */}

      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDeleteProduct={handleDeleteProduct}
      />
    </Box>
  );
};

export default Products;
