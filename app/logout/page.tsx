/* eslint-disable no-console */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const { logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logOut();
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    performLogout();
  }, [logOut, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
}
