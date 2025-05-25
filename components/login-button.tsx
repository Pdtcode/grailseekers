"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { UserAccountButton } from "./user-account-button";

import { useAuth } from "@/context/AuthContext";

export const LoginButton = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same size to avoid layout shift
    return (
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        variant="flat"
      >
        Login
      </Button>
    );
  }

  // If user is logged in, show the user account button
  if (user) {
    return <UserAccountButton />;
  }

  // Otherwise, show the login button
  return (
    <Button
      as={Link}
      className="text-sm font-normal text-default-600 bg-default-100"
      href="/login"
      variant="flat"
    >
      Login
    </Button>
  );
};
