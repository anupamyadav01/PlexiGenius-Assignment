import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../../../axiosConfig";
import { CartContext } from "../../App";
import Navbar from "../components/Navbar";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCartItems } = useContext(CartContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/showAllProducts");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axiosInstance.post(`/cart/addToCart/${productId}`);
      console.log(response?.data?.userDetails?.cart);
      setCartItems(response?.data?.userDetails?.cart);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Similar Items You Might Like
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
