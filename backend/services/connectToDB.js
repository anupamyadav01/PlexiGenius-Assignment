import mongoose from "mongoose";
const PORT = process.env.PORT || 10000;
import { app } from "../index.js";

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/PlexiGenius`);
    console.log("Server connected to the database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server didn't connect to the database", error);
  }
};
