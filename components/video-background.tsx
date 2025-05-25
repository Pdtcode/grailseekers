"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// Debug logger function to improve troubleshooting
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    if (data) {
      console.log(`[VideoBackground] ${message}`, data);
    } else {
      console.log(`[VideoBackground] ${message}`);
    }
  }
};

interface VideoBackgroundProps {
  videoAsset: {
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
  } | null;
  fallbackUrl?: string;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  showLoadingScreen?: boolean;
  preloadedUrl?: string; // Add support for a preloaded URL to skip asset resolution
}

const VideoBackground = ({
  videoAsset,
  fallbackUrl = "",
  children,
  className = "",
  overlayClassName = "",
  showLoadingScreen: _showLoadingScreen = false,
  preloadedUrl = "",
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [_isPreloading, _setIsPreloading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Effect to construct the video URL from Sanity asset or use preloaded URL
  useEffect(() => {
    debugLog("Received videoAsset", videoAsset);

    // Make sure to reset the error state when props change
    setVideoError(false);

    // First check for preloaded URL (highest priority)
    if (preloadedUrl && preloadedUrl.trim() !== "") {
      debugLog("Using preloaded URL", preloadedUrl);
      setVideoUrl(preloadedUrl);
      // Mark video as loaded since it's preloaded
      setVideoLoaded(true);

      return;
    }

    // Then try using direct URL from query
    if (videoAsset?.asset?.url) {
      debugLog("Using direct asset URL", videoAsset.asset.url);
      setVideoUrl(videoAsset.asset.url);

      return;
    }

    // If we have complete asset info from dereference, construct URL directly
    if (videoAsset?.asset?._id && videoAsset?.asset?.extension) {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

      // Extract file ID from _id (remove prefix if it exists)
      let fileId = videoAsset.asset._id;

      if (fileId.startsWith("file-")) {
        fileId = fileId.substring(5);
      }

      const extension = videoAsset.asset.extension;
      const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;

      debugLog("Constructed URL from _id and extension", url);
      setVideoUrl(url);

      return;
    }

    // Fall back to reference parsing
    if (videoAsset?.asset?._ref) {
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
              const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;

              debugLog("Constructed video URL", url);
              setVideoUrl(url);

              return;
            }
          }
        }

        // Try with direct Sanity ID format
        const directIdMatch = ref.match(/^file-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)$/);

        if (directIdMatch && directIdMatch.length === 3) {
          const fileId = directIdMatch[1];
          const extension = directIdMatch[2];
          const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
          const dataset =
            process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

          const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;

          debugLog("Constructed URL from direct ID pattern", url);
          setVideoUrl(url);

          return;
        }

        // If we get here, we failed to parse the reference
        debugLog("Failed to parse reference", ref);
        setVideoError(true);
      } catch (error) {
        debugLog("Error parsing video reference", error);
        setVideoError(true);
      }
    } else if (fallbackUrl && fallbackUrl.trim() !== "") {
      debugLog("Using fallback URL", fallbackUrl);
      setVideoUrl(fallbackUrl);
    } else {
      debugLog("No video asset or fallback URL provided");
      setVideoError(true);
    }
  }, [videoAsset, fallbackUrl, preloadedUrl]);

  // Ref to track pending play promises
  const pendingPlayPromiseRef = useRef<Promise<void> | null>(null);

  // Effect to handle visibility changes (tab switching)
  useEffect(() => {
    // Flag to prevent race conditions
    let isCurrentEffect = true;

    function handleVisibilityChange() {
      if (!isCurrentEffect) return;

      if (document.visibilityState === "visible") {
        debugLog("Tab is now visible, will resume video");
        setIsVisible(true);

        // Delay video resumption slightly to avoid conflicts
        // This prevents the AbortError by ensuring any pending pause operations complete
        setTimeout(() => {
          if (!isCurrentEffect) return;

          // Attempt to reload/restart the video when the tab becomes visible again
          const videoElement = videoRef.current;

          if (videoElement && videoUrl) {
            // Reset any previous errors
            setVideoError(false);

            // Carefully restart the video with proper state tracking
            try {
              // Cancel any pending play promise first
              if (pendingPlayPromiseRef.current) {
                debugLog("Cancelling previous play promise before restarting");
                pendingPlayPromiseRef.current = null;
              }

              // Make sure the video is properly reloaded
              videoElement.currentTime = 0;
              videoElement.load();

              // Use a new promise and track it
              debugLog("Attempting to play video after visibility change");
              const playPromise = videoElement.play();

              if (playPromise !== undefined) {
                pendingPlayPromiseRef.current = playPromise;

                playPromise
                  .then(() => {
                    if (!isCurrentEffect) return;
                    debugLog("Successfully resumed video after tab switch");
                    pendingPlayPromiseRef.current = null;
                    setVideoLoaded(true);
                  })
                  .catch((error) => {
                    if (!isCurrentEffect) return;
                    pendingPlayPromiseRef.current = null;

                    debugLog(
                      "Failed to play video after visibility change",
                      error,
                    );
                    // Only set error if it's not a user interaction issue or abort
                    if (
                      error.name !== "NotAllowedError" &&
                      error.name !== "AbortError"
                    ) {
                      setVideoError(true);
                    }
                  });
              }
            } catch (error) {
              if (!isCurrentEffect) return;
              debugLog("Error restarting video after visibility change", error);
            }
          }
        }, 250); // Short delay to avoid race conditions
      } else {
        debugLog("Tab is now hidden, pausing video");
        setIsVisible(false);

        // Safely pause video when tab is not visible
        const videoElement = videoRef.current;

        if (videoElement) {
          try {
            // Safely handle any pending play operations
            const currentPlayPromise = pendingPlayPromiseRef.current;

            if (currentPlayPromise) {
              // If there's a pending play promise, wait for it to resolve/reject before pausing
              currentPlayPromise
                .then(() => {
                  if (!isCurrentEffect) return;
                  debugLog("Play promise resolved, now pausing");
                  videoElement.pause();
                })
                .catch(() => {
                  // Play was already aborted or failed, no need to pause
                  debugLog(
                    "Play promise was already rejected, no need to pause",
                  );
                });
            } else {
              // No pending play promise, safe to pause immediately
              videoElement.pause();
            }
          } catch (error) {
            debugLog("Error pausing video on visibility change", error);
          }
        }
      }
    }

    // Set up visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Run the handler initially to sync with current visibility state
    handleVisibilityChange();

    // Clean up listener on unmount
    return () => {
      isCurrentEffect = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoUrl]);

  // Effect to load the video immediately without waiting
  useEffect(() => {
    if (!videoUrl) return;

    // Flag to prevent race conditions
    let isCurrentEffect = true;

    debugLog("Loading video immediately", videoUrl);
    // Mark as not preloading since we're loading immediately
    _setIsPreloading(false);

    // Set up the main video element directly
    const videoElement = videoRef.current;

    if (!videoElement) return;

    // Add event listeners for error tracking but don't block rendering
    const handleError = (e: Event) => {
      if (!isCurrentEffect) return;

      const target = e.target as HTMLVideoElement;

      debugLog("Video loading error", {
        error: target.error,
        networkState: target.networkState,
        readyState: target.readyState,
        errorCode: target.error?.code,
        videoUrl: videoUrl,
      });

      // Detailed error information for debugging
      if (target.error) {
        if (target.error.code === 4) {
          debugLog("Format not supported or file not found", {
            mimeType: videoAsset?.asset?.mimeType,
            originalFilename: videoAsset?.asset?.originalFilename,
          });
        } else if (target.error.code === 2) {
          debugLog("Network error - check CORS settings on Sanity");
        }
      }

      setVideoError(true);
    };

    const handleCanPlay = () => {
      if (!isCurrentEffect) return;
      debugLog("Video can begin playing (ready to display)");
      setVideoLoaded(true);
    };

    // Set up video element
    try {
      videoElement.crossOrigin = "anonymous"; // Try to handle CORS issues
      videoElement.src = videoUrl;
      videoElement.addEventListener("error", handleError);
      videoElement.addEventListener("canplay", handleCanPlay);
      videoElement.addEventListener("abort", () => {
        if (!isCurrentEffect) return;
        debugLog("Video loading aborted");
      });

      videoElement.load(); // Start loading the video

      // Only attempt playback if the tab is visible
      if (isVisible) {
        // Wait a brief moment for the video to start loading before trying to play
        setTimeout(() => {
          if (!isCurrentEffect || !isVisible) return;

          debugLog("Attempting initial video playback");

          // Cancel any existing play promise
          if (pendingPlayPromiseRef.current) {
            debugLog("Canceling previous play promise");
            pendingPlayPromiseRef.current = null;
          }

          try {
            const playPromise = videoElement.play();

            if (playPromise !== undefined) {
              pendingPlayPromiseRef.current = playPromise;

              playPromise
                .then(() => {
                  if (!isCurrentEffect) return;
                  debugLog("Initial playback successful");
                  pendingPlayPromiseRef.current = null;
                  setVideoLoaded(true);
                })
                .catch((error) => {
                  if (!isCurrentEffect) return;
                  pendingPlayPromiseRef.current = null;

                  debugLog("Initial autoplay failed", error);
                  // Don't mark as error for common non-error conditions
                  if (
                    error.name !== "NotAllowedError" &&
                    error.name !== "AbortError"
                  ) {
                    setVideoError(true);
                  }
                });
            }
          } catch (error) {
            if (!isCurrentEffect) return;
            debugLog("Exception during initial playback attempt", error);
            setVideoError(true);
          }
        }, 100);
      }
    } catch (error) {
      if (!isCurrentEffect) return;
      debugLog("Error setting up video element", error);
      setVideoError(true);
    }

    return () => {
      isCurrentEffect = false;

      try {
        videoElement.removeEventListener("error", handleError);
        videoElement.removeEventListener("canplay", handleCanPlay);

        // Only attempt to pause if there's no pending play promise
        if (!pendingPlayPromiseRef.current) {
          videoElement.pause();
        }

        videoElement.src = "";
        videoElement.load();
      } catch (error) {
        debugLog("Error cleaning up video element", error);
      }
    };
  }, [videoUrl, videoAsset, isVisible]);

  // Function to manually play video when autoplay is blocked
  const handleManualPlay = () => {
    if (videoRef.current && videoUrl && isVisible) {
      debugLog("Attempting manual play", videoUrl);

      // Reset any previous errors when manually playing
      setVideoError(false);

      // Cancel any existing play promise
      if (pendingPlayPromiseRef.current) {
        debugLog("Canceling previous play promise before manual play");
        pendingPlayPromiseRef.current = null;
      }

      // Make sure the video is properly loaded before trying to play
      try {
        videoRef.current.load();

        // Try to play with proper promise tracking
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          pendingPlayPromiseRef.current = playPromise;

          playPromise
            .then(() => {
              debugLog("Manual play successful");
              pendingPlayPromiseRef.current = null;
              setVideoLoaded(true);
            })
            .catch((err) => {
              pendingPlayPromiseRef.current = null;
              debugLog("Manual play failed", err);

              // Only set error for non-standard issues
              if (err.name !== "NotAllowedError" && err.name !== "AbortError") {
                setVideoError(true);
              }
            });
        }
      } catch (error) {
        debugLog("Exception during manual play", error);
        setVideoError(true);
      }
    } else {
      debugLog(
        "Cannot play manually - video element or URL missing or tab not visible",
      );
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-screen overflow-hidden ${className}`}
    >
      {/* Manual play button (when autoplay is blocked or returning from tab switch) */}
      {!videoLoaded && !videoError && videoUrl && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-20">
          <button
            className="bg-black/80 p-6 rounded-lg text-center cursor-pointer"
            onClick={handleManualPlay}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleManualPlay();
              }
            }}
          >
            <div className="animate-pulse text-white text-lg mb-2">
              Click to play video
            </div>
            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Error indicator */}
      {videoError && videoUrl && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-20">
          <div className="bg-black/80 p-6 rounded-lg text-center">
            <div className="text-red-500 text-lg mb-2">
              Video playback error
            </div>
            <div className="text-white/70 text-sm mb-4">
              There was a problem playing the background video.
            </div>
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => {
                // Reset error state and try again
                setVideoError(false);
                handleManualPlay();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Video background */}
      {videoUrl && !videoError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 min-w-full min-h-full object-cover w-full h-full"
          data-visibility-handled="true" // Flag to indicate this video uses visibility handling
          onCanPlayThrough={() => {
            debugLog("Video can play through (fully loaded)");
            setVideoLoaded(true);
          }}
          onError={(e) => {
            debugLog("Video error from video element", e);
            if (isVisible) {
              // Only set error when tab is visible
              setVideoError(true);
            }
          }}
        />
      ) : (
        // Fallback background if no video URL or error
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black w-full h-full" />
      )}

      {/* Dark overlay to ensure content is visible */}
      <div className={`absolute inset-0 bg-black/50 ${overlayClassName}`} />

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === "development" && videoError && (
        <div className="absolute bottom-4 right-4 bg-black/80 p-3 rounded-lg text-xs text-white z-30 max-w-md">
          <div className="font-bold mb-1">Video Debug Info:</div>
          <div className="text-red-400">Error loading video from URL:</div>
          <div className="truncate text-white/70 mb-1">{videoUrl}</div>
          <div className="text-white/70">
            Check browser console for detailed error information.
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default VideoBackground;
