"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Note: This would require updating Firebase profile functionality
    // Currently we're just mocking the interface
    setIsEditing(false);
  };

  // Default avatar if user doesn't have a photo URL
  const defaultAvatar = "/default-avatar.svg";

  // Get user's display name or email for display
  const userDisplayName =
    user?.displayName || user?.email?.split("@")[0] || "User";

  // Get user's photo URL or use default
  const photoURL = user?.photoURL || defaultAvatar;

  return (
    <div className=" shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Account Information</h2>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden relative">
          <Image
            alt={userDisplayName}
            className="object-cover w-full h-full"
            height={96}
            src={photoURL}
            width={96}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium">{userDisplayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Account type:{" "}
            {user?.providerData[0]?.providerId === "google.com"
              ? "Google"
              : "Email"}
          </p>
        </div>
      </div>

      {isEditing ? (
        <form className="space-y-4" onSubmit={handleUpdateProfile}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="displayName"
            >
              Display Name
            </label>
            <input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
