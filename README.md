# eCommerce Admin Panel - MERN Stack

## Overview

This project is a comprehensive **Admin Panel** for an eCommerce website, designed and developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The admin panel enables efficient management of products, categories, customers, and orders with dynamic dashboard analytics.

## Live Demo

You can visit the deployed application here:

## [Hosted Link](https://plexi-genius-project.vercel.app/)

## Login Data

- **Admin Login**
  - Gmail : admin@gmail.com
  - Password : 123456
- **User Login**:
  - Gmail : anupam@gmail.com
  - Password : 123456

## Features

### Dashboard

- Provides an overview of key metrics:
  - Total Products
  - Total Categories
  - Total Orders
  - Total Customers

### Category Management

- **Add New Category**: Admins can create categories by providing a name.
- **List Categories**: Displays all categories with pagination support.
- **Edit Category**: Allows updating category details.
- **Delete Category**: Deletes categories with a confirmation prompt to prevent accidental removal.

### Product Management

- **Add New Product**:
  - Select a category from a dropdown.
  - Input fields for:
    - Product Name
    - Product Image (with upload functionality)
    - Product Description
    - Product Price
    - Product Status (Available/Not Available)
- **List Products**: Displays all products with details including name, image, description, price, category, and status.
- **Edit Product**: Allows updating product information.
- **Delete Product**: Enables product deletion with confirmation.

### Customer Management

- **Customer List**: Displays customer details:
  - Name
  - Email Address
  - Contact Number
  - Products Purchased
- **Search Functionality**: Search by customer name or email.

### Order Management

- **List Orders**: Displays details for each order:
  - Order ID
  - Product Name(s)
  - Customer Name
  - Order Status
- **Update Order Status**:
  - Update status using a dropdown with predefined values:
    - Open (default), Shipped, Packed, Delivered, etc.
    - Track timestamp for each status change.

---

## Installation and Setup

### Prerequisites

Ensure the following are installed on your system:

- Node.js
- MongoDB
- npm

### Steps to Run the Project

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/anupamyadav01/PlexiGenius-Assignment
    cd PlexiGenius-Assignment
    ```

2.  **Install Dependencies**

    For the backend:

    ```bash
    cd backend
    npm install
    ```

    For the frontend:

    ```bash
    cd frontend
    npm install
    ```

3.  **Set Up the Environment Variables**

    - Create a `.env` file in the `backend` directory with the following keys:

      ````env
      PORT=10001

      MONGODB_URI=<YOUR_MONGODB_URI>

      DB_NAME=<YOUR_DATABASE_NAME>

      JWT_SECRET=<YOUR_JWT_SECRET>

      MAIL_PASSWORD=<YOUR_MAIL_PASSWORD>

      MAIL_USERNAME=<YOUR_MAIL_USERNAME>

      CLOUDINARY_NAME=<YOUR_CLOUDINARY_NAME>

      CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>

      CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

      CLOUDINARY_URL=<YOUR_CLOUDINARY_URL>

           ```
      ````

4.  **Run the MongoDB Server**
    Ensure your MongoDB service is running locally or provide a connection string for a cloud-hosted MongoDB instance (e.g., MongoDB Atlas).

5.  **Start the Backend Server**

    ```bash
    cd backend
    npm run dev
    ```

6.  **Start the Frontend Server**

    ```bash
    cd frontend
    npm run dev
    ```

7.  **Access the Application**
    Open your browser and navigate to:
    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:10001`

---

## Folder Structure

### Backend

```
backend/
├── config/       # Configuration files (e.g., database, JWT)
├── controllers/  # Route logic (categories, products, orders, etc.)
├── models/       # Mongoose schemas for MongoDB collections
├── routes/       # API routes for various modules
├── middlewares/  # Authentication and error handling
├── utils/        # Utility functions
└── server.js     # Entry point for the backend
```

### Frontend

```
frontend/
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Page-level components (Dashboard, Products, etc.)
│   ├── context/      # Context API for global state
│   ├── services/     # API service functions
│   ├── App.jsx       # Main app component
│   ├── index.js      # Entry point for React
└── public/           # Static files
```

---

## Technology Stack

### Frontend

- **React.js**: Component-based UI development.
- **Tailwind CSS**: Responsive and modern styling.
- **Axios**: For making API requests.

### Backend

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building REST APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.

### Tools and Libraries

- **JWT**: Authentication and authorization.
- **Multer**: File upload handling for product images.
- **dotenv**: Manage environment variables.
- **Bcrypt**: Secure password hashing.

---

## Security Measures

- Input validation and sanitization.
- JWT-based authentication for protected routes.
- Confirmation dialogs for delete operations.
- Error handling and feedback for user actions.

---

## Future Enhancements

- Role-based access control (e.g., Super Admin, Admin).
- Advanced filtering and sorting for products and customers.
- Analytics for sales trends and customer behavior.
- Integration with third-party payment gateways.

---

## License

This project is licensed under the MIT License.
