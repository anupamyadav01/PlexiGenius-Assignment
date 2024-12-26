import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (req, res, next) => {
  const { image } = req.body;

  // Check if image is provided from frontend
  if (!image) {
    return next();
  }

  // Cloudinary config
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    timeout: 120000,
  });

  try {
    // If user already has an image, destroy the old one
    if (req?.user && req.user.image) {
      await cloudinary.uploader.destroy(
        req.user.image.split("/").pop().split(".")[0]
      );
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "threads-clone",
      timeout: 120000,
    });

    req.secure_url = result.secure_url;
    next();
  } catch (error) {
    console.error("Error in Cloudinary upload");
    console.error(error);
  }
};

export default uploadToCloudinary;
