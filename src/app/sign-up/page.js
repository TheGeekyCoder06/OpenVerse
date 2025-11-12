"use client";

import { useState, useTransition } from "react";
import {
  signupFormControls,
  signUpInitialFormData,
} from "@/app/utils";
import FormElementPage from "@/components/form-element/page";
import { signupAction } from "@/actions/signupAction";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState(signUpInitialFormData);
  const [serverErrors, setServerErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSignupButtonValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({});
    setMessage("");

    startTransition(async () => {
      const result = await signupAction(formData);

      if (!result.success) {
        setServerErrors(result.errors || {});
        setMessage(result.message || "Signup failed");
      } else {
        setMessage(result.message);
        setFormData(signUpInitialFormData);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100 px-6 py-12 md:py-0">
      {/* Left Illustration Section */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="w-[400px] h-[400px] relative">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200"
            alt="Sign Up Illustration"
            fill
            className="object-cover rounded-3xl shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
          Join <span className="text-blue-600">Open Verse</span>
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Create your account and start sharing your stories with the world.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {signupFormControls.map((control) => (
            <div key={control.name}>
              <FormElementPage
                currentItem={control}
                value={formData[control.name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [control.name]: e.target.value,
                  })
                }
              />
              {serverErrors[control.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {serverErrors[control.name][0]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={!handleSignupButtonValid() || isPending}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>

          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Redirect to Sign In */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
