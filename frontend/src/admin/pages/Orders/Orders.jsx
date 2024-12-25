import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "ORD001",
      productImg: "https://via.placeholder.com/50",
      productName: "Smartphone",
      customerName: "John Doe",
      status: "Delivered",
      timeline: [
        {
          status: "Order Confirmed",
          timestamp: "Fri, 22nd Nov '24 - 11:21 AM",
          description: "Your order has been placed.",
        },
        {
          status: "Shipped",
          timestamp: "Sat, 23rd Nov '24 - 10:28 AM",
          description: "Your item has been picked up by courier partner.",
        },
        {
          status: "Out For Delivery",
          timestamp: "Mon, 25th Nov '24 - 8:17 AM",
          description: "Your item is out for delivery.",
        },
        {
          status: "Delivered",
          timestamp: "Mon, 25th Nov '24 - 9:34 AM",
          description: "Your item has been delivered.",
        },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsOpen = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setSelectedOrder(null);
    setDetailsOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const columns = [
    {
      field: "productImg",
      headerName: "Product Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    {
      field: "status",
      headerName: "Order Status",
      width: 200,
      renderCell: (params) => (
        <Typography
          sx={{
            padding: "4px 8px",
            borderRadius: "5px",
            backgroundColor: (() => {
              switch (params.value) {
                case "Delivered":
                  return "#4caf50";
                case "Shipped":
                  return "#2196f3";
                case "Out For Delivery":
                  return "#ff9800";
                case "Order Confirmed":
                  return "#9c27b0";
                default:
                  return "#757575";
              }
            })(),
            color: "#fff",
            textAlign: "center",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "changeStatus",
      headerName: "Change Status",
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="Order Confirmed">Order Confirmed</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDetailsOpen(params.row)}
        >
          More Details
        </Button>
      ),
    },
  ];

  return (
    <Box
      p={3}
      sx={{
        background: "linear-gradient(135deg, #f0f4f7, #d9e8fc)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#3f51b5" }}
      >
        Order Management
      </Typography>

      <Box
        sx={{
          height: 500,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3f51b5",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px",
            },
          }}
        />
      </Box>

      <Dialog
        open={detailsOpen}
        onClose={handleDetailsClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent
          sx={{
            backgroundColor: "#f0f4f7",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {selectedOrder && (
            <>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Order Timeline for {selectedOrder?.orderId}
              </Typography>
              <Timeline
                sx={{
                  paddingLeft: 0,
                  marginLeft: 0,
                  "& .MuiTimelineDot-root": {
                    backgroundColor: "#3f51b5",
                  },
                }}
              >
                {selectedOrder.timeline.map((event, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {index < selectedOrder.timeline.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1" fontWeight="bold">
                        {event.status}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {event.timestamp}
                      </Typography>
                      <Typography variant="body2">
                        {event.description}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
              <Box textAlign="right">
                <Button
                  onClick={handleDetailsClose}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
