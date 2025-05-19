"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeBackgroundProps {
  darkImageUrl: string;
  lightImageUrl: string;
  opacity?: number;
  className?: string;
}

export default function ThemeBackground({
  darkImageUrl,
  lightImageUrl,
  opacity = 0.3,
  className = "",
}: ThemeBackgroundProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Use appropriate image URL based on current theme
  const currentImageUrl = theme === "light" ? lightImageUrl : darkImageUrl;

  return (
    <>
      {/* Mobile background (hidden on desktop) */}
      <div
        className={`fixed inset-0 w-full h-full bg-cover z-0 md:hidden ${className}`}
        style={{
          backgroundImage: `url('${currentImageUrl}')`,
          opacity: opacity,
          backgroundSize: "cover",
          backgroundPosition: "center center", // Good for mobile
        }}
      />

      {/* Desktop background (hidden on mobile) */}
      <div
        className={`fixed inset-0 w-full h-full bg-cover z-0 hidden md:block ${className}`}
        style={{
          backgroundImage: `url('${currentImageUrl}')`,
          opacity: opacity,
          backgroundSize: "cover",
          backgroundPosition: "center top -50px", // Positioned 100px down from top
        }}
      />
    </>
  );
}
