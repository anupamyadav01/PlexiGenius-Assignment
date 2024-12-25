import { useState } from "react";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

const Customer = () => {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "123-456-7890",
      products: "Smartphone, Headphones",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "987-654-3210",
      products: "Laptop, Mouse",
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      contact: "456-789-1230",
      products: "Refrigerator, Washing Machine",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      contact: "321-654-9870",
      products: "Books, Desk Lamp",
    },
    {
      id: 5,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      contact: "789-123-4560",
      products: "Smartwatch, Tablet",
    },
  ]);

  const [filterText, setFilterText] = useState("");

  const handleSearchChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(filterText) ||
      customer.email.toLowerCase().includes(filterText)
  );

  const columns = [
    { field: "name", headerName: "Customer Name", width: 200 },
    { field: "email", headerName: "Email Address", width: 250 },
    { field: "contact", headerName: "Contact Number", width: 200 },
    { field: "products", headerName: "Products Purchased", width: 300 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          placeholder="Search by Name or Email"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{ width: "50%" }}
        />
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
          rows={filteredCustomers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            "& .MuiDataGrid-cell": { textAlign: "center" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5" },
          }}
        />
      </Box>
    </Box>
  );
};

export default Customer;
