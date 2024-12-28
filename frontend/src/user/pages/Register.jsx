import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors on input change
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Regex for validating 10-digit phone numbers

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confPassword) {
      newErrors.confPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/auth/register", formData);
      console.log(response);
      if (response.status === 201) {
        toast.success(response?.data?.message);
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Register
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confPassword"
              name="confPassword"
              value={formData.confPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.confPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="Confirm your password"
              required
            />
            {errors.confPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-md hover:from-blue-500 hover:to-purple-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
