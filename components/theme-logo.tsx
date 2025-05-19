"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function ThemeLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // During SSR and initial client render, show a placeholder
    return (
      <div className="relative w-12 h-12 mr-1">
        <div className="w-full h-full" />
      </div>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDarkMode = currentTheme === "dark";

  return (
    <div className="relative w-12 h-12 mr-1">
      <Image
        alt="Grail Seekers Logo"
        className={clsx(
          "w-full h-full object-contain transition-all duration-300",
          isDarkMode && "invert contrast-100", // Apply inversion only in dark mode
        )}
        layout="fill"
        src="/logo-light.svg"
      />
    </div>
  );
}
