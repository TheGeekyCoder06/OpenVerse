"use server";

import { z } from "zod";
import bcrypt from "bcryptjs"; // use bcrypt if your build supports it
import { connectDB } from "@/db/dbConfig.js";
import User from "@/models/userModel.js";
import { redirect } from "next/navigation"; // for server-side redirect

// ✅ Zod schema for input validation
const signupSchema = z.object({
  userName: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(30, "Username must be under 30 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be under 20 characters"),
});

// ✅ Server Action
export async function signupAction(formData) {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Validate user input
    const validatedData = signupSchema.parse(formData);

    // 3️⃣ Check if the email already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return { success: false, message: "Email is already registered" };
    }

    // 4️⃣ Hash password securely
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // 5️⃣ Save user to MongoDB
    const newUser = await User.create({
      userName: validatedData.userName,
      email: validatedData.email,
      password: hashedPassword,
    });

    // 6️⃣ Optional: Convert to JSON if you ever need to return it
    const user = JSON.parse(JSON.stringify(newUser));
    delete user.password;

    console.log("✅ User created:", user.email);

    // 7️⃣ Redirect user to sign-in page
    redirect("/sign-in");
  } catch (error) {
    // 🧩 Ignore Next.js internal redirect mechanism
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    // 🧩 Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }

    console.error("❌ Signup Error:", error);
    return { success: false, message: "Internal server error" };
  }
}
