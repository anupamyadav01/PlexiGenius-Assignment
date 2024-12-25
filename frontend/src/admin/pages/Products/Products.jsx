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
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Home Appliances",
  ]);
  const [isDialogOpen, setDialogOpen] = useState(false);
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
        fullScreen
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h5">Add a New Product</Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "100%", maxWidth: 600 }}>
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
                style={{ width: 100, marginTop: 10 }}
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
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Save Product
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setDialogOpen(false)}
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Products;
