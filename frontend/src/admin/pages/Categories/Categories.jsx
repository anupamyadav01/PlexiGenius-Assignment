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
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.action.hover,
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleOpenDeleteDialog(params.row)}
              sx={{
                color: theme.palette.error.main,
                backgroundColor: theme.palette.action.hover,
                "&:hover": {
                  backgroundColor: theme.palette.error.light,
                },
              }}
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
      p={3}
      sx={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
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

      {/* DataGrid */}
      <Box
        sx={{
          height: 500,
          backgroundColor: "white",
          boxShadow: theme.shadows[4],
          borderRadius: 2,
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
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            padding: 3,
            borderRadius: 3,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle>
          {isEditMode ? "Edit Category" : "Add Category"}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              disabled={!categoryName.trim()}
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: { padding: 3, borderRadius: 3, maxWidth: 400 },
        }}
      >
        <DialogTitle sx={{ color: theme.palette.error.main }}>
          Confirm Deletion
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography textAlign="center" mb={3}>
            Are you sure you want to delete
            <strong> {categoryToDelete?.name} </strong>?
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCategory}
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
