import { useState } from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
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
        textAlign="center"
        fontWeight="bold"
      >
        Customer Management
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={3}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
        }}
      >
        <TextField
          placeholder="Search by Name or Email"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", md: "50%" },
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Data Table */}
      <Box
        sx={{
          height: 450,
          width: "80%",
          padding: 2,
          margin: "0 auto",
          boxShadow: 4,
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#e3f2fd",
            fontWeight: "bold",
            fontSize: "1.1rem",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f9f9f9",
            textAlign: "start",
          },
          "& .MuiDataGrid-cell": {},
        }}
      >
        {filteredCustomers.length > 0 ? (
          <DataGrid
            rows={filteredCustomers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "#1565c0",
              },
            }}
          />
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No customers found. Please refine your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Customer;
