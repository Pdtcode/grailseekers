"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import CircularTextSpinner from "@/components/circular-text-spinner";
import VideoPreloader from "@/components/video-preloader";
import { client } from "@/sanity/lib/client";
import { activeDropSettingsQuery, dropExclusiveProductsQuery } from "@/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Product } from "@/types";

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
  dropProducts?: Product[];
}

export default function DropPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropSettings, setDropSettings] = useState<DropSettings>({});
  const [dropExclusiveProducts, setDropExclusiveProducts] = useState<Product[]>([]);
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/check-drop-auth");
        const data = await res.json();

        setAuthenticated(res.ok && data.authenticated);

        // After checking auth, fetch drop settings and exclusive products
        try {
          // Use the predefined query from queries.ts
          const [settings, exclusiveProducts] = await Promise.all([
            client.fetch(activeDropSettingsQuery),
            client.fetch(dropExclusiveProductsQuery)
          ]);

          console.log("Drop page settings:", settings);
          console.log("Drop exclusive products:", exclusiveProducts);
          setDropSettings(settings || {});
          setDropExclusiveProducts(exclusiveProducts || []);
        } catch (err) {
          console.error("Error fetching drop data:", err);
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

      {/* Drop Products */}
      {(() => {
        // Combine drop products and drop-exclusive products
        const allDropProducts = [
          ...(dropSettings.dropProducts || []),
          ...dropExclusiveProducts,
        ];

        return allDropProducts.length > 0 ? (
          <div>
            {dropSettings.dropProducts && dropSettings.dropProducts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Featured Drop Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dropSettings.dropProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}
            
            {dropExclusiveProducts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {dropSettings.dropProducts && dropSettings.dropProducts.length > 0 ? 
                    "Drop Exclusive Items" : "Exclusive Products"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dropExclusiveProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No products available in this drop yet. Check back soon!
            </p>
          </div>
        );
      })()}
    </div>
  );
}

// Product Card Component for Drop Page
function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/store/products/${product.slug.current}`}
      className="group bg-black/50 border border-gray-700 rounded-lg overflow-hidden hover:border-white transition-colors"
    >
      <div className="relative aspect-square overflow-hidden">
        {product.mainImage && (
          <Image
            fill
            alt={product.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={urlForImage(product.mainImage).url() || ""}
          />
        )}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
            Sold Out
          </div>
        )}
        {product.dropExclusive && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs rounded">
            Exclusive
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <p className="font-bold text-lg">${product.price}</p>
          {product.comparePrice && product.comparePrice > product.price && (
            <p className="text-gray-400 line-through text-sm">
              ${product.comparePrice}
            </p>
          )}
        </div>
        {product.description && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
}
