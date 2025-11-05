"use client";

import { useState } from "react";
import {
  signupFormControls,
  signUpInitialFormData,
} from "@/app/utils";
import FormElementPage from "@/components/form-element/page";

export default function SignUpPage() {
  const [formData, setFormData] = useState(signUpInitialFormData);

  // ✅ Validation: Enable button only when all fields are filled
  const handleSignupButtonValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Later: Add API call or NextAuth register logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

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
            </div>
          ))}

          <button
            type="submit"
            disabled={!handleSignupButtonValid()}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
