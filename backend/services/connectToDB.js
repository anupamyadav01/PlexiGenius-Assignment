import mongoose from "mongoose";
const PORT = process.env.PORT || 10000;

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/PlexiGenius`);
    console.log("Server connected to the database");
  } catch (error) {
    console.log("Server didn't connect to the database", error);
  }
};
