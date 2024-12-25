import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

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

  const handleAddProduct = () => {
    setProducts((prev) => [...prev, newProduct]);
    setDialogOpen(false);
    resetForm();
  };

  const handleEditProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[selectedProductIndex] = newProduct;
    setProducts(updatedProducts);
    setEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteProduct = () => {
    setProducts((prev) =>
      prev.filter((_, index) => index !== selectedProductIndex)
    );
    setDeleteDialogOpen(false);
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
    setNewProduct(products[index]);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (index) => {
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
          rows={products.map((product, index) => ({ id: index, ...product }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      {/* Add Product Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 0 }}>
          Add a New Product
        </DialogTitle>
        <DialogContent
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Category Selection */}
            <TextField
              select
              name="category"
              label="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                },
              }}
            >
              {categories.map((category, idx) => (
                <MenuItem key={idx} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            {/* Product Name */}
            <TextField
              name="name"
              label="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />

            {/* Upload Image */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #6a11cb, #2575fc)",
                  color: "#fff",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #5a10ab, #1d63d4)",
                  },
                }}
              >
                Upload Image
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {newProduct.image && (
                <img
                  src={newProduct.image}
                  alt="Preview"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                    objectFit: "cover",
                    marginTop: 8,
                  }}
                />
              )}
            </Box>

            {/* Product Description */}
            <TextField
              name="description"
              label="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
              variant="outlined"
            />

            {/* Product Price */}
            <TextField
              name="price"
              label="Product Price ($)"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />

            {/* Status */}
            <TextField
              select
              name="status"
              label="Status"
              value={newProduct.status}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 3,
            py: 2,
            background: "#f9f9f9",
          }}
        >
          <Button
            onClick={() => setDialogOpen(false)}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 2,
              borderColor: "#c2c2c2",
              "&:hover": {
                borderColor: "#9e9e9e",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #ff6b6b, #ff9e57)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 0 }}>
          Edit Product
        </DialogTitle>
        <DialogContent
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Category Field */}
            <TextField
              select
              name="category"
              label="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                },
              }}
            >
              {categories.map((category, idx) => (
                <MenuItem key={idx} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            {/* Product Name */}
            <TextField
              name="name"
              label="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />

            {/* Upload Image */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #6a11cb, #2575fc)",
                  color: "#fff",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #5a10ab, #1d63d4)",
                  },
                }}
              >
                Upload Image
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {newProduct.image && (
                <img
                  src={newProduct.image}
                  alt="Preview"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                    objectFit: "cover",
                    marginTop: 8,
                  }}
                />
              )}
            </Box>

            {/* Product Description */}
            <TextField
              name="description"
              label="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
              variant="outlined"
            />

            {/* Product Price */}
            <TextField
              name="price"
              label="Product Price ($)"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />

            {/* Status Field */}
            <TextField
              select
              name="status"
              label="Status"
              value={newProduct.status}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 3,
            py: 2,
            background: "#f9f9f9",
          }}
        >
          <Button
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 2,
              borderColor: "#c2c2c2",
              "&:hover": {
                borderColor: "#9e9e9e",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditProduct}
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #ff6b6b, #ff9e57)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 4,
            padding: 3,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <WarningIcon color="error" fontSize="large" />
            <Typography variant="h6" color="error" fontWeight="bold">
              Confirm Deletion
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
            mt: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            onClick={handleDeleteProduct}
            variant="contained"
            color="error"
            sx={{
              backgroundImage: "linear-gradient(to right, #ff6b6b, #ff1e1e)",
              color: "#fff",
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #e64545, #d61515)",
              },
              borderRadius: 2,
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 2,
              borderColor: "#bdbdbd",
              "&:hover": {
                borderColor: "#9e9e9e",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
