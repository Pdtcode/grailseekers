"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newReleases: true,
    newsletter: false,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    orderUpdates: false,
    promotions: false,
    newReleases: false,
  });

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setEmailNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSmsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setSmsNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save notification preferences (would be implemented in a real app)
    alert("Notification preferences saved!");
  };

  return (
    <div className=" shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-medium ">Email Notifications</h3>
          <p className="text-sm text-gray-500 mb-4">
            We&apos;ll send notifications to: {user?.email}
          </p>

          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={emailNotifications.orderUpdates}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="orderUpdates-email"
                  name="orderUpdates"
                  type="checkbox"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="orderUpdates-email"
                >
                  Order updates
                </label>
                <p className="text-gray-500">
                  Get notified about status changes to your orders
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={emailNotifications.promotions}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="promotions-email"
                  name="promotions"
                  type="checkbox"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="promotions-email"
                >
                  Promotions and sales
                </label>
                <p className="text-gray-500">
                  Receive emails about promotions, discounts, and sales events
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={emailNotifications.newReleases}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="newReleases-email"
                  name="newReleases"
                  type="checkbox"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="newReleases-email"
                >
                  New releases
                </label>
                <p className="text-gray-500">
                  Be the first to know about new product releases
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={emailNotifications.newsletter}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="newsletter-email"
                  name="newsletter"
                  type="checkbox"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="newsletter-email"
                >
                  Newsletter
                </label>
                <p className="text-gray-500">
                  Receive our monthly newsletter with news and articles
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium ">SMS Notifications</h3>

          <div className="mt-4 mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone number for SMS
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={smsNotifications.orderUpdates}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="orderUpdates-sms"
                  name="orderUpdates"
                  type="checkbox"
                  onChange={handleSmsChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="orderUpdates-sms"
                >
                  Order updates
                </label>
                <p className="text-gray-500">
                  Get SMS notifications about your order status
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={smsNotifications.promotions}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="promotions-sms"
                  name="promotions"
                  type="checkbox"
                  onChange={handleSmsChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="promotions-sms"
                >
                  Promotions and sales
                </label>
                <p className="text-gray-500">
                  Receive text messages about promotions and sales
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={smsNotifications.newReleases}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  id="newReleases-sms"
                  name="newReleases"
                  type="checkbox"
                  onChange={handleSmsChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-medium text-gray-700"
                  htmlFor="newReleases-sms"
                >
                  New releases
                </label>
                <p className="text-gray-500">
                  Get notified via SMS when new products are released
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Save preferences
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
