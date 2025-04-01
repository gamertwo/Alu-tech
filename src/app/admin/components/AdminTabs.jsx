// app/admin/components/AdminTabs.jsx
'use client';

import React from 'react';
import { CalendarClock, MessageSquare, Home, Settings, Users } from 'lucide-react';

const AdminTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'meetings', label: 'Meeting Requests', icon: <CalendarClock className="h-5 w-5" /> },
    { id: 'messages', label: 'Contact Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-4 text-sm font-medium flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTabs;