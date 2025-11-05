"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import CommonFormElement from "@/components/form-element/page.js";
import { initialLoginFormData, loginFormControls } from "@/app/utils/index.js";

export default function SignIn() {
  // state for input data
  const [signInData, setSignInData] = useState({
    ...initialLoginFormData,
  });

  // validation: enable button only when both fields are filled
  const handleSignInButtonValid = () => {
    return signInData.email.trim() !== "" && signInData.password.trim() !== "";
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", signInData);
    // add api call here for auth
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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
            </div>
          ))}

          <button
            type="submit"
            disabled={!handleSignInButtonValid()}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
