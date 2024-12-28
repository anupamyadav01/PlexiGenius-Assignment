/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

const AddProductDialog = ({
  isDialogOpen,
  setDialogOpen,
  newProduct,
  handleAddProduct,
  handleFileChange,
  handleInputChange,
  categories,
}) => {
  console.log(categories);

  return (
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
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", mb: 0 }}>
        Add a New Product
      </DialogTitle>
      <DialogContent
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 8,
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
            value={newProduct?.category}
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
            {categories?.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Product Name */}
          <TextField
            name="name"
            label="Product Name"
            value={newProduct?.name}
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
                backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
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
            {newProduct?.image && (
              <img
                src={newProduct?.image}
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
            value={newProduct?.description}
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
            value={newProduct?.price}
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
            value={newProduct?.status}
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
          justifyContent: "center",
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
  );
};

export default AddProductDialog;
