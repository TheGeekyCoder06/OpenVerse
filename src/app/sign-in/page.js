"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/loginAction";
import { initialLoginFormData, loginFormControls } from "@/app/utils";
import CommonFormElement from "@/components/form-element/page";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  const [signInData, setSignInData] = useState(initialLoginFormData);
  const [serverErrors, setServerErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignInButtonValid = () =>
    signInData.email.trim() !== "" && signInData.password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerErrors({});
    setMessage("");

    startTransition(async () => {
      const result = await loginAction(signInData);

      if (result?.success) {
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        router.push("/profile");
      } else {
        setServerErrors(result?.errors || {});
        setMessage(result?.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100 px-6 py-12 md:py-0">
      {/* Left Illustration Section */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="w-[400px] h-[400px] relative">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
            alt="Sign In Illustration"
            fill
            className="object-cover rounded-3xl shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Sign in to continue exploring <span className="text-blue-600 font-semibold">Open Verse</span>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {loginFormControls.map((control) => (
            <div key={control.name}>
              <CommonFormElement
                currentItem={control}
                value={signInData[control.name]}
                onChange={(e) =>
                  setSignInData({
                    ...signInData,
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
            disabled={!handleSignInButtonValid() || isPending}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing In..." : "Sign In"}
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

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
