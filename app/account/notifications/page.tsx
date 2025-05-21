'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newReleases: true,
    newsletter: false
  });
  
  const [smsNotifications, setSmsNotifications] = useState({
    orderUpdates: false,
    promotions: false,
    newReleases: false
  });
  
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setEmailNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSmsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSmsNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save notification preferences (would be implemented in a real app)
    alert('Notification preferences saved!');
  };

  return (
    <div className=" shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium ">Email Notifications</h3>
          <p className="text-sm text-gray-500 mb-4">We'll send notifications to: {user?.email}</p>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="orderUpdates-email"
                  name="orderUpdates"
                  type="checkbox"
                  checked={emailNotifications.orderUpdates}
                  onChange={handleEmailChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="orderUpdates-email" className="font-medium text-gray-700">Order updates</label>
                <p className="text-gray-500">Get notified about status changes to your orders</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="promotions-email"
                  name="promotions"
                  type="checkbox"
                  checked={emailNotifications.promotions}
                  onChange={handleEmailChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="promotions-email" className="font-medium text-gray-700">Promotions and sales</label>
                <p className="text-gray-500">Receive emails about promotions, discounts, and sales events</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newReleases-email"
                  name="newReleases"
                  type="checkbox"
                  checked={emailNotifications.newReleases}
                  onChange={handleEmailChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newReleases-email" className="font-medium text-gray-700">New releases</label>
                <p className="text-gray-500">Be the first to know about new product releases</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter-email"
                  name="newsletter"
                  type="checkbox"
                  checked={emailNotifications.newsletter}
                  onChange={handleEmailChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newsletter-email" className="font-medium text-gray-700">Newsletter</label>
                <p className="text-gray-500">Receive our monthly newsletter with news and articles</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium ">SMS Notifications</h3>
          
          <div className="mt-4 mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number for SMS</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+1 (555) 123-4567"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="orderUpdates-sms"
                  name="orderUpdates"
                  type="checkbox"
                  checked={smsNotifications.orderUpdates}
                  onChange={handleSmsChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="orderUpdates-sms" className="font-medium text-gray-700">Order updates</label>
                <p className="text-gray-500">Get SMS notifications about your order status</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="promotions-sms"
                  name="promotions"
                  type="checkbox"
                  checked={smsNotifications.promotions}
                  onChange={handleSmsChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="promotions-sms" className="font-medium text-gray-700">Promotions and sales</label>
                <p className="text-gray-500">Receive text messages about promotions and sales</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newReleases-sms"
                  name="newReleases"
                  type="checkbox"
                  checked={smsNotifications.newReleases}
                  onChange={handleSmsChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newReleases-sms" className="font-medium text-gray-700">New releases</label>
                <p className="text-gray-500">Get notified via SMS when new products are released</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save preferences
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}