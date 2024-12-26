import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import PageNotFound from "./user/pages/PageNotFound";
import Home from "./user/pages/Home";
import LoginForm from "./user/pages/Login";
import RegisterForm from "./user/pages/Register";
import Admin from "./admin/Admin";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.post("/auth/isLoggedIn");
        if (response.status === 200) {
          const role = response?.data?.user?.role;
          setUserRole(role);
          localStorage.setItem("userRole", role);
        } else {
          setUserRole("user");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserRole("user");
      }
    };

    getUserDetails();
  }, []);

  if (userRole === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        {userRole === "admin" && <Route path="/admin/*" element={<Admin />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
