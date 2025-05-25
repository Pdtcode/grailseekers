/* eslint-disable no-console */
"use client";

import { useState, useEffect } from "react";
import { getIdToken } from "firebase/auth";

import { useAuth } from "@/context/AuthContext";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emptyAddress = {
    id: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    isDefault: false,
  };

  const [currentAddress, setCurrentAddress] = useState<Address>(emptyAddress);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await getIdToken(user);

      const response = await fetch("/api/user/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to fetch addresses");
      }

      const data = await response.json();

      setAddresses(data);
    } catch (err: any) {
      console.error("Error fetching addresses:", err);
      setError(
        `Failed to load your saved addresses: ${err.message || "Please try again."}`,
      );
    } finally {
      setLoading(false);
    }
  };

  // This will retrigger whenever user changes
  useEffect(() => {
    if (user) {
      fetchAddresses();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setCurrentAddress({
      ...currentAddress,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const token = await getIdToken(user);

      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentAddress),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      setIsAdding(false);
      setCurrentAddress(emptyAddress);
      fetchAddresses();
    } catch (err) {
      console.error("Error adding address:", err);
      setError("Failed to save address. Please try again.");
    }
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !isEditing) return;

    try {
      const token = await getIdToken(user);

      const response = await fetch(`/api/user/addresses/${isEditing}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentAddress),
      });

      if (!response.ok) {
        throw new Error("Failed to update address");
      }

      setIsEditing(null);
      setCurrentAddress(emptyAddress);
      fetchAddresses();
    } catch (err) {
      console.error("Error updating address:", err);
      setError("Failed to update address. Please try again.");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!user) return;

    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const token = await getIdToken(user);

      const response = await fetch(`/api/user/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
      setError("Failed to delete address. Please try again.");
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!user) return;

    try {
      const token = await getIdToken(user);

      const response = await fetch(`/api/user/addresses/${id}/default`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to set default address");
      }

      fetchAddresses();
    } catch (err) {
      console.error("Error setting default address:", err);
      setError("Failed to set default address. Please try again.");
    }
  };

  const startEditing = (address: Address) => {
    setCurrentAddress(address);
    setIsEditing(address.id);
    setIsAdding(false);
  };

  const startAdding = () => {
    setCurrentAddress(emptyAddress);
    setIsAdding(true);
    setIsEditing(null);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setIsEditing(null);
    setCurrentAddress(emptyAddress);
  };

  return (
    <div className=" shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Shipping Addresses</h2>
        {!isAdding && !isEditing && (
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={startAdding}
          >
            Add New Address
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading && <p>Loading addresses...</p>}

      {/* Add/Edit Address Form */}
      {(isAdding || isEditing) && (
        <form
          className="mb-8 border p-4 rounded-md"
          onSubmit={isEditing ? handleUpdateAddress : handleAddAddress}
        >
          <h3 className="text-lg font-medium mb-4">
            {isEditing ? "Edit Address" : "Add New Address"}
          </h3>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="street"
            >
              Street Address
            </label>
            <input
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              id="street"
              name="street"
              type="text"
              value={currentAddress.street}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="city"
              >
                City
              </label>
              <input
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                id="city"
                name="city"
                type="text"
                value={currentAddress.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="state"
              >
                State / Province
              </label>
              <input
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                id="state"
                name="state"
                type="text"
                value={currentAddress.state}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="postalCode"
              >
                ZIP / Postal Code
              </label>
              <input
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                id="postalCode"
                name="postalCode"
                type="text"
                value={currentAddress.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="country"
              >
                Country
              </label>
              <select
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                id="country"
                name="country"
                value={currentAddress.country}
                onChange={handleInputChange}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                checked={currentAddress.isDefault}
                className="form-checkbox h-5 w-5 text-indigo-600"
                name="isDefault"
                type="checkbox"
                onChange={handleInputChange}
              />
              <span className="ml-2 text-sm">
                Set as default shipping address
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              {isEditing ? "Update Address" : "Save Address"}
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={cancelForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Address List */}
      {!loading && !isAdding && !isEditing && (
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <p className="text-gray-500 py-4">
              No shipping addresses saved yet.
            </p>
          ) : (
            addresses.map((address) => (
              <div key={address.id} className="border rounded-md p-4 relative">
                {address.isDefault && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 absolute top-2 right-2">
                    Default
                  </span>
                )}
                <div className="mb-2">
                  <p className="font-medium">{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                    onClick={() => startEditing(address)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                  {!address.isDefault && (
                    <button
                      className="text-sm text-gray-600 hover:text-gray-800"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
