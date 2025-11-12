"use server";

import { connectDB } from "@/db/dbConfig.js";
import User from "@/models/userModel.js";
import { z } from "zod";

// Schema for safety
const getUserSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function getUserAction(email) {
  try {
    await connectDB();
    const validated = getUserSchema.parse({ email });

    const user = await User.findOne({ email: validated.email }).select(
      "userName email _id"
    );

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        userName: user.userName,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("❌ getUserAction Error:", error);
    return { success: false, message: "Failed to fetch user data" };
  }
}
