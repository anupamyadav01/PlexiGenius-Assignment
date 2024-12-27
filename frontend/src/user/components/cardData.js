export const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 15.99,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 49.99,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
];

export const handleDelete = (id) => {
  console.log("Delete item with ID:", id);
};

export const handleBuyNow = (id) => {
  console.log("Buy now for item with ID:", id);
};
