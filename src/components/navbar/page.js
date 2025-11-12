"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/* ---------- Menu Links ---------- */
const components = [
  {
    title: "Write Blog",
    href: "/write",
    description: "Start writing your own blog posts and share your ideas.",
  },
  {
    title: "Profile",
    href: "/profile",
    description: "View and edit your personal profile and blog stats.",
  },
  {
    title: "Sign In",
    href: "/sign-in",
    description: "Access your account to post and manage your blogs.",
  },
  {
    title: "Sign Up",
    href: "/sign-up",
    description: "Create a new account to join Open Verse.",
  },
];

export default function NavbarMenu() {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // ✅ Check login state
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(!!user?.email);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    document.cookie = "userEmail=; Max-Age=0; path=/";
    setIsLoggedIn(false);
    router.push("/sign-in");
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        {/* ---------- Left: Logo ---------- */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Open Verse
        </Link>

        {/* ---------- Center: Menu ---------- */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 font-medium hover:text-blue-600 transition-all text-lg">
                  Menu
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ---------- Right: Links & Buttons (even spacing) ---------- */}
        <div className="flex items-center space-x-4">
          <Link
            href="/write"
            className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Write
          </Link>

          <Link
            href="/profile"
            className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Profile
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                href="/sign-in"
                className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>

              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm px-5 py-2 font-semibold shadow-sm transition-all duration-300"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="rounded-full text-sm px-5 py-2 font-semibold shadow-sm transition-all duration-300"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------- Helper Component ---------- */
function ListItem({ title, children, href }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block p-3 rounded-lg hover:bg-blue-50 transition-all duration-300"
        >
          <div className="text-base font-semibold text-gray-900 mb-1">
            {title}
          </div>
          <p className="text-sm text-gray-600 leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
