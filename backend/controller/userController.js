import { UserModel } from "../model/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ProductModel } from "../model/productModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error in registerUser: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log("Error in loginUser: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const isLoggedIn = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in isLoggedIn: ", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Error in logoutUser: ", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const resetPassword = async (req, res) => {};

export const addToCart = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userDetails = await UserModel.findById(user._id);
    const existingCartItem = userDetails.cart.find(
      (item) => item.productId === product._id
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      userDetails.cart.push({ productId: product._id, quantity: 1 });
    }
    const updatedUser = await userDetails.save();

    // Populate the cart for the response
    const populatedUser = await UserModel.findById(updatedUser._id).populate(
      "cart.productId"
    );

    return res
      .status(200)
      .json({ message: "Product added to cart", userDetails: populatedUser });
  } catch (error) {
    console.error("Error in addToCart: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    return res
      .status(200)
      .json({ message: "Cart items retrieved successfully" });
  } catch (error) {
    console.error("Error in getCartItems: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkout = async (req, res) => {};
