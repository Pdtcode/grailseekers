'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Note: This would require updating Firebase profile functionality
    // Currently we're just mocking the interface
    setIsEditing(false);
  };

  // Default avatar if user doesn't have a photo URL
  const defaultAvatar = '/default-avatar.svg';
  
  // Get user's display name or email for display
  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  
  // Get user's photo URL or use default
  const photoURL = user?.photoURL || defaultAvatar;

  return (
    <div className=" shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Account Information</h2>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden relative">
          <Image
            src={photoURL}
            alt={userDisplayName}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium">{userDisplayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Account type: {user?.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email'}
          </p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}