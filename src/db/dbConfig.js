import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Avoid reconnecting if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};
