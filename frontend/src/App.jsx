import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import PageNotFound from "./user/pages/PageNotFound";
import Home from "./user/pages/Home";
import LoginForm from "./user/pages/Login";
import RegisterForm from "./user/pages/Register";
import Admin from "./admin/Admin";
import Products from "./user/pages/Product";
import Navbar from "./user/components/Navbar";
import CartPage from "./user/pages/CartPage";
export const CartContext = createContext(null);

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.post("/auth/isLoggedIn");
        if (response.status === 200) {
          const role = response?.data?.user?.role;
          setUserRole(role);
          localStorage.setItem("userRole", role);
          console.log(response?.data?.user);

          localStorage.setItem("user", JSON.stringify(response?.data?.user));
        } else {
          setUserRole("user");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserRole("user");
      }
    };

    // Simulate loading for 2 seconds before fetching user details
    const timer = setTimeout(() => {
      getUserDetails();
      setLoading(false); // After 2 seconds, stop the loading state
    }, 2000); // 2-second delay for loading simulation

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center h-screen bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-md"></div>

        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>

        <p className="relative text-black text-4xl font-semibold animate-jump">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
          {userRole === "admin" && (
            <Route path="/admin/*" element={<Admin />} />
          )}
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default App;
