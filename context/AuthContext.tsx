'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface DbUser {
  id: string;
  email: string;
  name: string | null;
  addresses?: Address[];
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  syncUser: (firebaseUser: User) => Promise<DbUser | null>;
  getUserAddresses: () => Promise<Address[]>;
  getDefaultAddress: () => Promise<Address | null>;
  saveAddress: (address: Omit<Address, 'id'>) => Promise<Address>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<Address>;
  deleteAddress: (id: string) => Promise<boolean>;
  setDefaultAddress: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressesCache, setAddressesCache] = useState<Address[]>([]);

  // Sync user with database
  const syncUser = async (firebaseUser: User): Promise<DbUser | null> => {
    try {
      if (!firebaseUser) return null;
      
      // Get Firebase ID token
      const token = await getIdToken(firebaseUser);
      
      // Call our API to create/update user in database
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        console.error('Failed to sync user with database');
        return null;
      }
      
      const dbUser = await response.json();
      return dbUser;
    } catch (error) {
      console.error('Error syncing user with database:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // If user is logged in, sync with database
        const syncedUser = await syncUser(firebaseUser);
        setDbUser(syncedUser);
      } else {
        setDbUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const signUp = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Sync new user with database
    await syncUser(result.user);
    return result.user;
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Sync Google user with database
    await syncUser(result.user);
    return result.user;
  };

  // Get user addresses
  const getUserAddresses = async (): Promise<Address[]> => {
    try {
      if (!user) {
        return [];
      }
      
      const token = await getIdToken(user);
      const response = await fetch('/api/user/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      
      const addresses = await response.json();
      setAddressesCache(addresses);
      return addresses;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
  };

  // Get default address
  const getDefaultAddress = async (): Promise<Address | null> => {
    try {
      const addresses = await getUserAddresses();
      const defaultAddress = addresses.find(addr => addr.isDefault);
      return defaultAddress || null;
    } catch (error) {
      console.error('Error getting default address:', error);
      return null;
    }
  };

  // Save a new address
  const saveAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const token = await getIdToken(user);
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(address)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save address');
      }
      
      const newAddress = await response.json();
      
      // Refresh the addresses cache
      getUserAddresses();
      
      return newAddress;
    } catch (error) {
      console.error('Error saving address:', error);
      throw error;
    }
  };

  // Update an address
  const updateAddress = async (id: string, address: Partial<Address>): Promise<Address> => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const token = await getIdToken(user);
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(address)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update address');
      }
      
      const updatedAddress = await response.json();
      
      // Refresh the addresses cache
      getUserAddresses();
      
      return updatedAddress;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  // Delete an address
  const deleteAddress = async (id: string): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const token = await getIdToken(user);
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete address');
      }
      
      // Refresh the addresses cache
      getUserAddresses();
      
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      return false;
    }
  };

  // Set default address
  const setDefaultAddress = async (id: string): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const token = await getIdToken(user);
      const response = await fetch(`/api/user/addresses/${id}/default`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to set default address');
      }
      
      // Refresh the addresses cache
      getUserAddresses();
      
      return true;
    } catch (error) {
      console.error('Error setting default address:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      dbUser, 
      loading, 
      signIn, 
      signUp, 
      logOut, 
      signInWithGoogle, 
      syncUser,
      getUserAddresses,
      getDefaultAddress,
      saveAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}