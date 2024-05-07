import mongoose from "mongoose";

const ConnectDB = async () => {
  // MongoDB Connection
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

export default ConnectDB;