/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const DeleteDialog = ({
  setDeleteDialogOpen,
  isDeleteDialogOpen,
  handleDeleteProduct,
}) => {
  return (
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
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
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
          justifyContent: "center",
          mt: 2,
          gap: 1,
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
  );
};

export default DeleteDialog;
