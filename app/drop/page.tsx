"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CircularTextSpinner from "@/components/circular-text-spinner";
import VideoPreloader from "@/components/video-preloader";
import { client } from "@/sanity/lib/client";
import { activeDropSettingsQuery } from "@/lib/queries";

interface DropSettings {
  title?: string;
  backgroundVideo?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  dropDescription?: string;
}

export default function DropPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropSettings, setDropSettings] = useState<DropSettings>({});
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/check-drop-auth");
        const data = await res.json();

        setAuthenticated(res.ok && data.authenticated);

        // After checking auth, fetch drop settings
        try {
          // Use the predefined query from queries.ts
          const settings = await client.fetch(activeDropSettingsQuery);

          console.log("Drop page settings:", settings);
          setDropSettings(settings || {});
        } catch (err) {
          console.error("Error fetching drop settings:", err);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error checking authentication:", err);
        setLoading(false);
        setError("Failed to check authentication status");
      }
    }
    checkAuth();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/drop", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAuthenticated(true);
        // Refresh the page to ensure cookies are properly set
        router.refresh();
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      console.error("Error submitting password:", err);
      setError("An error occurred. Please try again.");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <CircularTextSpinner
          animationDuration={10}
          size={250}
          text="お前はもう死んでいる"
          textColor="white"
        />
      </div>
    );

  // Handle video preload completion
  const handleVideoPreloaded = (url: string) => {
    console.log("Video has been preloaded successfully", url);
    setIsVideoPreloaded(true);
  };

  if (!authenticated) {
    return (
      <>
        {/* Preload video when on the password page */}
        {dropSettings?.backgroundVideo && !isVideoPreloaded && (
          <VideoPreloader
            videoAsset={dropSettings.backgroundVideo}
            onPreloaded={handleVideoPreloaded}
          />
        )}
        
        <div className="max-w-sm mx-auto px-4">
          <div className="bg-black/60 backdrop-blur-sm mb-8 p-6 rounded-lg border border-gray-700">
            <h1 className="text-4xl font-bold animate-pulse">
              {dropSettings.title || "Exclusive Drop"}
            </h1>
          </div>
          <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <p className="text-gray-300 mb-2">
                Enter the password to access the exclusive drop
              </p>
              <input
                className="border border-gray-700 bg-black/40 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                className="bg-white text-black hover:bg-gray-200 p-3 rounded-md font-medium transition-colors"
                type="submit"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-4xl p-8 bg-black/70 backdrop-blur-md rounded-lg border border-gray-700 shadow-2xl">
      <h1 className="text-4xl font-bold text-center mb-6">
        🔥 {dropSettings.title?.toUpperCase() || "EXCLUSIVE DROP"} 🔥
      </h1>
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-8" />

      <p className="text-xl mb-8 text-center">
        {dropSettings.dropDescription ||
          "Welcome to our exclusive limited-time collection. These items are only available for a short period."}
      </p>

      {/* Add your exclusive content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Example product cards - replace with your actual drop content */}
        <div className="bg-black/50 border border-gray-700 rounded-lg p-4 hover:border-white transition-colors">
          <h3 className="text-xl font-bold">Limited Edition Shirt</h3>
          <p className="text-gray-400 mt-2">Only 50 available</p>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-lg p-4 hover:border-white transition-colors">
          <h3 className="text-xl font-bold">Collector&apos;s Hoodie</h3>
          <p className="text-gray-400 mt-2">Numbered series</p>
        </div>
      </div>
    </div>
  );
}
