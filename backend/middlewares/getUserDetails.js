import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";

export const getUserDetails = async (req, res, next) => {
  try {
    const token =
      req?.headers?.cookie?.split("=")[1] ||
      req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "No token provided",
      });
    }
    const loggedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ email: loggedUser.email }).select(
      "-password -token -createdAt -updatedAt -otp"
    );

    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "Invalid token",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log("Error In GetUserDetails", error);
  }
};

export default getUserDetails;
