"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "@/db/dbConfig.js";
import User from "@/models/userModel.js";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function loginAction(formData) {
  try {
    await connectDB();

    // ✅ Validate input
    const validatedData = loginSchema.parse(formData);

    // ✅ Find user
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // ✅ Compare passwords
    const passwordMatch = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!passwordMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    // ✅ Safe user object
    const safeUser = {
      id: user._id.toString(),
      userName: user.userName,
      email: user.email,
    };

    // ✅ Fix: await cookies() and then set cookie properly
    const cookieStore = await cookies();
    cookieStore.set("userEmail", safeUser.email, {
      path: "/",
      httpOnly: false, // keep accessible for client
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log("✅ Cookie set for:", safeUser.email);

    return { success: true, message: "Login successful", user: safeUser };
  } catch (error) {
    console.error("❌ Login error:", error);
    return { success: false, message: "Internal server error" };
  }
}
