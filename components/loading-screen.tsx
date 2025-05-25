"use client";

import { useEffect, useState } from "react";

import CircularTextSpinner from "./circular-text-spinner";

import { fontUDMincho } from "@/config/fonts";

interface LoadingScreenProps {
  isLoading: boolean;
  children: React.ReactNode;
  minimumLoadingTime?: number;
  backgroundColor?: string;
  textColor?: string;
  spinnerSize?: number;
  text?: string;
}

const LoadingScreen = ({
  isLoading,
  children,
  minimumLoadingTime = 1000,
  backgroundColor = "rgba(0, 0, 0, 0.95)",
  textColor = "white",
  spinnerSize = 300,
  text = "お前はもう死んでいる", // "You are already dead" in Japanese
}: LoadingScreenProps) => {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [contentReady, setContentReady] = useState(!isLoading);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      // Show loader immediately when loading starts
      setShowLoader(true);
      setContentReady(false);
    } else if (!isLoading && showLoader) {
      // Ensure minimum loading time before hiding loader
      timeoutId = setTimeout(() => {
        setShowLoader(false);
        // Give some time for fade-out animation before showing content
        setTimeout(() => {
          setContentReady(true);
        }, 300);
      }, minimumLoadingTime);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading, minimumLoadingTime, showLoader]);

  return (
    <div className={`relative w-full h-full ${fontUDMincho.variable}`}>
      {/* Loading screen */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor }}
      >
        <CircularTextSpinner
          fontFamily={fontUDMincho.style.fontFamily}
          size={spinnerSize}
          text={text}
          textColor={textColor}
        />
      </div>

      {/* Content */}
      <div
        className={`transition-opacity duration-300 ${
          contentReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default LoadingScreen;
