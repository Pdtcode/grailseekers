"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/button";

import { useAuth } from "@/context/AuthContext";

export const UserAccountButton = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Default avatar if user doesn't have a photo URL
  const defaultAvatar = "/default-avatar.svg";

  // Get user's display name or email for display
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  // Get user's photo URL or use default
  const photoURL = user?.photoURL || defaultAvatar;

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !(event.target as Element).closest("#user-menu-container")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" id="user-menu-container">
      <Button
        className="p-1 bg-transparent min-w-0"
        variant="light"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden relative">
            <Image
              alt={displayName}
              className="object-cover"
              height={32}
              src={photoURL}
              width={32}
            />
          </div>
          <span className="text-sm font-medium">{displayName}</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => navigateTo("/account")}
          >
            My Account
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => navigateTo("/account/orders")}
          >
            My Orders
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => navigateTo("/account/notifications")}
          >
            Notifications
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
