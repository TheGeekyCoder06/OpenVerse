"use client";

import React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Example links (you can edit them later)
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

  return (
    <div className="flex items-center justify-center w-full border-b border-gray-200 bg-white shadow-sm">
      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList className="flex-wrap px-6 py-3">
          {/* Home Menu */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className="font-semibold text-lg">
                Open Verse
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Main Navigation */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
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

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/write">Write</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/profile">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/sign-in">Sign In</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function ListItem({ title, children, href }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="block p-2 rounded-md hover:bg-gray-50">
          <div className="text-sm font-medium leading-none text-gray-900">
            {title}
          </div>
          <p className="text-muted-foreground text-sm leading-snug text-gray-600">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
