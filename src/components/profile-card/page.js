"use client";

import { useState, useEffect } from "react";
import { getUserAction } from "@/actions/getUserAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser?.email) {
      router.push("/sign-in");
      return;
    }

    const fetchUser = async () => {
      const result = await getUserAction(storedUser.email);
      if (result.success) {
        setUser(result.user);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    document.cookie = "userEmail=; Max-Age=0; path=/";
    router.push("/sign-in");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <p className="text-center text-gray-700 text-lg font-medium">
          Loading profile...
        </p>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <p className="text-center text-red-500 text-lg font-semibold">
          User not found or session expired.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100 px-4">
      {/* Profile Image (optional) */}
      <div className="mb-6 w-32 h-32 relative">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Profile Avatar"
          fill
          className="rounded-full object-cover border-4 border-blue-200 shadow-md"
        />
      </div>

      <Card className="w-full max-w-sm bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {user.userName}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Your personal account details
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Member Since</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>

      <p className="text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-700">Open Verse</span>
      </p>
    </div>
  );
}
