/* eslint-disable no-console */
"use client";

import { useEffect, useRef, useState } from "react";

// Debug logger function to improve troubleshooting
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    if (data) {
      console.log(`[VideoPreloader] ${message}`, data);
    } else {
      console.log(`[VideoPreloader] ${message}`);
    }
  }
};

interface VideoAsset {
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
    _id?: string;
    originalFilename?: string;
    extension?: string;
    mimeType?: string;
  };
  _type?: string;
}

interface VideoPreloaderProps {
  videoAsset: VideoAsset | null;
  onPreloaded?: (url: string) => void;
  fallbackUrl?: string;
}

const VideoPreloader = ({
  videoAsset,
  onPreloaded,
  fallbackUrl = "",
}: VideoPreloaderProps) => {
  const preloaderRef = useRef<HTMLVideoElement>(null);
  const [_videoUrl, setVideoUrl] = useState<string | null>(null);
  const [_isPreloaded, setIsPreloaded] = useState(false);
  const [_error, setError] = useState(false);

  // Effect to construct and preload the video URL from Sanity asset
  useEffect(() => {
    debugLog("Starting video preload with videoAsset", videoAsset);

    // Make sure to reset the error state when props change
    setError(false);
    setIsPreloaded(false);

    let url: string | null = null;

    // First try using direct URL from query
    if (videoAsset?.asset?.url) {
      debugLog("Using direct asset URL", videoAsset.asset.url);
      url = videoAsset.asset.url;
    }
    // If we have complete asset info from dereference, construct URL directly
    else if (videoAsset?.asset?._id && videoAsset?.asset?.extension) {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

      // Extract file ID from _id (remove prefix if it exists)
      let fileId = videoAsset.asset._id;

      if (fileId.startsWith("file-")) {
        fileId = fileId.substring(5);
      }

      const extension = videoAsset.asset.extension;

      url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;

      debugLog("Constructed URL from _id and extension", url);
    }
    // Fall back to reference parsing
    else if (videoAsset?.asset?._ref) {
      const ref = videoAsset.asset._ref;

      debugLog("Parsing asset reference", ref);

      try {
        // Handle standard Sanity ID format: file-<fileId>-<extension>
        if (ref.startsWith("file-")) {
          const parts = ref.split("-");

          debugLog("Reference parts", parts);

          if (parts.length >= 3) {
            // First part is 'file'
            // Last part is the extension
            // Everything in between is the fileId
            const fileType = parts[0]; // Should be "file"
            const extension = parts[parts.length - 1]; // Last part is the extension
            const fileId = parts.slice(1, parts.length - 1).join("-"); // Middle parts form the ID

            debugLog("Parsed components", { fileType, fileId, extension });

            if (fileId && extension) {
              const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
              const dataset =
                process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

              // Use proper Sanity CDN URL format
              url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;
              debugLog("Constructed video URL", url);
            }
          }
        }
      } catch (error) {
        debugLog("Error parsing video reference", error);
        setError(true);
      }
    } else if (fallbackUrl && fallbackUrl.trim() !== "") {
      debugLog("Using fallback URL", fallbackUrl);
      url = fallbackUrl;
    } else {
      debugLog("No video asset or fallback URL provided");
      setError(true);
    }

    if (url) {
      setVideoUrl(url);

      // Start preloading the video
      const videoElement = preloaderRef.current;

      if (videoElement) {
        debugLog("Setting up preload video element", url);

        // Set up event listeners
        const handleCanPlayThrough = () => {
          debugLog("Video preloaded successfully", url);
          setIsPreloaded(true);

          // Notify parent component that the video is preloaded
          if (onPreloaded) {
            onPreloaded(url);
          }
        };

        const handleError = (e: Event) => {
          const target = e.target as HTMLVideoElement;

          debugLog("Video preloading error", {
            error: target.error,
            networkState: target.networkState,
            readyState: target.readyState,
            errorCode: target.error?.code,
            videoUrl: url,
          });

          setError(true);
        };

        // Set up the preloader video element
        try {
          videoElement.crossOrigin = "anonymous"; // Try to handle CORS issues
          videoElement.src = url;
          videoElement.preload = "auto"; // Force preloading
          videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
          videoElement.addEventListener("error", handleError);

          // Start loading the video
          videoElement.load();

          // Clean up when unmounting
          return () => {
            videoElement.removeEventListener(
              "canplaythrough",
              handleCanPlayThrough,
            );
            videoElement.removeEventListener("error", handleError);
            videoElement.src = "";
            videoElement.load();
          };
        } catch (error) {
          debugLog("Error setting up video preloader", error);
          setError(true);
        }
      }
    }
  }, [videoAsset, fallbackUrl, onPreloaded]);

  // Hidden video element for preloading
  return (
    <video
      ref={preloaderRef}
      muted
      playsInline
      preload="auto"
      style={{ display: "none" }}
    />
  );
};

export default VideoPreloader;
