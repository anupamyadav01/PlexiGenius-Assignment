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
          style={{ width: 50, height: 50 }}
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
            color="warning"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Product
        </Button>
      </Box>

      {/* Data Table */}
      <Box
        sx={{
          height: 400,
          width: "100%",
          "& .MuiDataGrid-root": { border: "none" },
        }}
      >
        <DataGrid
          rows={products.map((product, index) => ({ id: index, ...product }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            "& .MuiDataGrid-cell": { textAlign: "center" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5" },
          }}
        />
      </Box>

      {/* Add Product Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Add a New Product</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              select
              name="category"
              label="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {categories.map((category, idx) => (
                <MenuItem key={idx} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="name"
              label="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                style={{ width: 100 }}
              />
            )}
            <TextField
              name="description"
              label="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              name="price"
              label="Product Price ($)"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              select
              name="status"
              label="Status"
              value={newProduct.status}
              onChange={handleInputChange}
              fullWidth
              required
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => setDialogOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Same fields as Add Product */}
            <TextField
              select
              name="category"
              label="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {categories.map((category, idx) => (
                <MenuItem key={idx} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="name"
              label="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                style={{ width: 100 }}
              />
            )}
            <TextField
              name="description"
              label="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              name="price"
              label="Product Price ($)"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              select
              name="status"
              label="Status"
              value={newProduct.status}
              onChange={handleInputChange}
              fullWidth
              required
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditProduct}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <WarningIcon color="error" />
            Confirm Deletion
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteProduct}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
