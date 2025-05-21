"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import VideoBackground from "@/components/video-background";
import VideoPreloader from "@/components/video-preloader";
import { client } from "@/sanity/lib/client";
import { activeDropSettingsQuery } from "@/lib/queries";
import ThemeInstagram from "@/components/theme-instagram";
import CircularTextSpinner from "@/components/circular-text-spinner";

// Debug logger function to improve troubleshooting
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    if (data) {
      console.log(`[DropLayout] ${message}`, data);
    } else {
      console.log(`[DropLayout] ${message}`);
    }
  }
};

interface DropSettings {
  backgroundVideo?: {
    asset: {
      _ref?: string;
      _type?: string;
      url?: string;
      _id?: string;
      originalFilename?: string;
      extension?: string;
      mimeType?: string;
    };
  };
  dropDescription?: string;
}

export default function DropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dropSettings, setDropSettings] = useState<DropSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preloadedVideoUrl, setPreloadedVideoUrl] = useState<string>("");
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);

  // Fallback video URL in case Sanity data is not available
  const fallbackVideoUrl = "";

  useEffect(() => {
    async function fetchDropSettings() {
      try {
        debugLog("Fetching drop settings...");

        // Use the predefined query from queries.ts
        const settings = await client.fetch(activeDropSettingsQuery);

        debugLog("Drop settings received", settings);

        if (settings && Object.keys(settings).length > 0) {
          if (settings.backgroundVideo && settings.backgroundVideo.asset) {
            debugLog(
              "Video asset found in drop settings",
              settings.backgroundVideo.asset,
            );
          } else {
            debugLog("No video asset found in drop settings");
          }

          setDropSettings(settings);
        } else {
          debugLog("No drop settings found or empty result");
          setError("No active drop settings found");
        }
      } catch (error) {
        debugLog("Error fetching drop settings", error);
        setError("Failed to load drop settings");
      } finally {
        setLoading(false);
      }
    }

    fetchDropSettings();
  }, []);

  debugLog("Drop settings for video", dropSettings?.backgroundVideo);

  // Determine if there's an active drop
  const hasActiveDrop = !!dropSettings && !error;

  // Handle video preload complete
  const handleVideoPreloaded = (url: string) => {
    debugLog("Video preloaded successfully", url);
    setPreloadedVideoUrl(url);
    setIsVideoPreloaded(true);
  };
  
  return (
    <>
      {/* Preload the video in the background */}
      {dropSettings?.backgroundVideo && !isVideoPreloaded && (
        <VideoPreloader 
          videoAsset={dropSettings.backgroundVideo}
          onPreloaded={handleVideoPreloaded}
          fallbackUrl={fallbackVideoUrl}
        />
      )}
      
      <VideoBackground
        className=" "
        fallbackUrl={fallbackVideoUrl}
        overlayClassName="bg-black/40"
        showLoadingScreen={false}
        videoAsset={dropSettings?.backgroundVideo || null}
        preloadedUrl={preloadedVideoUrl}
      >
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen">
        {/* No active drop message */}
        {!hasActiveDrop && !loading && (
          <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-gray-700 text-center max-w-lg animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-4">
              No Active Drop Event
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Follow our Instagram to know when the next drop is coming!
            </p>

            {/* Instagram Link */}
            <Link
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              href="https://www.instagram.com/grail__seekers/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <ThemeInstagram size={24} />
              <span>@grail__seekers</span>
            </Link>

            <p className="text-white/60 text-sm mt-6">
              Check back soon for our next exclusive drop!
            </p>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <CircularTextSpinner
              animationDuration={10}
              size={250}
              text="お前はもう死んでいる"
              textColor="white"
            />
          </div>
        )}

        {/* Show children only if there's an active drop */}
        {hasActiveDrop && (
          <div className="inline-block max-w-lg text-center justify-center text-white">
            {children}
          </div>
        )}
      </section>
    </VideoBackground>
    </>
  );
}
