import { BrowserRouter } from "react-router-dom";
import { createContext, useState } from "react";
import AppRoutes from "./AppRouter";
import axiosInstance from "../axiosConfig";

// Context for sharing data across the app
export const CartContext = createContext(null);

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Fetch user details once on app load
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.post("/auth/isLoggedIn");
      if (response.status === 200) {
        const user = response?.data?.user;
        const role = user?.role || "user";

        setLoggedInUser(user);
        setUserRole(role);

        localStorage.setItem("userRole", role);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUserRole("user");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserRole("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          loggedInUser,
          setLoggedInUser,
          userRole,
          setUserRole,
          fetchUserDetails,
        }}
      >
        <AppRoutes loading={loading} fetchUserDetails={fetchUserDetails} />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default App;
