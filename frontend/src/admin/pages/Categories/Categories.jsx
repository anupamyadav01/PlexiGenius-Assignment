import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const Category = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" },
    { id: 4, name: "Home Appliances" },
    { id: 5, name: "Sports Equipment" },
  ]);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddCategory = () => {
    if (!categoryName.trim()) return;

    if (isEditMode) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id
            ? { ...cat, name: categoryName.trim() }
            : cat
        )
      );
    } else {
      const newCategory = {
        id: categories.length ? categories[categories.length - 1].id + 1 : 1,
        name: categoryName.trim(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    handleCloseDialog();
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setSelectedCategory(category);
    setCategoryName(category.name);
    setDialogOpen(true);
  };

  const handleDeleteCategory = () => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryToDelete.id)
    );
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

  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" gap={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleEditCategory(params.row)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleOpenDeleteDialog(params.row)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box
      p={4}
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: theme.palette.text.primary,
          }}
        >
          Category Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ paddingX: 3, borderRadius: 2 }}
        >
          Add Category
        </Button>
      </Box>

      <Box
        sx={{
          height: 500,
          backgroundColor: "white",
          boxShadow: theme.shadows[4],
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": { textAlign: "center" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              textAlign: "center",
              fontSize: "1rem",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }}
        />
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: { padding: 3, borderRadius: 3, maxWidth: 500, margin: "auto" },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          {isEditMode ? "Edit Category" : "Add Category"}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ marginY: 2 }} />
        <DialogContent>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              sx={{ paddingX: 4, borderRadius: 2 }}
              disabled={!categoryName.trim()}
            >
              {isEditMode ? "Update Category" : "Add Category"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: { padding: 3, borderRadius: 3, maxWidth: 400, margin: "auto" },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", color: "error.main" }}
        >
          Confirm Deletion
        </DialogTitle>
        <Divider sx={{ marginY: 2 }} />
        <DialogContent>
          <Typography sx={{ textAlign: "center", marginBottom: 3 }}>
            Are you sure you want to delete
            <strong> {categoryToDelete?.name} </strong>?
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDeleteDialogOpen(false)}
              sx={{ paddingX: 3, borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCategory}
              sx={{ paddingX: 3, borderRadius: 2 }}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Category;
