'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, Mail, Phone, Building, 
  MessageSquare, CheckCircle2, XCircle, AlertCircle, Search, 
  RefreshCw, ChevronDown, ChevronUp, Filter 
} from 'lucide-react';

// Import components
import AdminHeader from './components/AdminHeader';
import AdminTabs from './components/AdminTabs';
import DashboardStats from './components/DashboardStats';
import ProductStats from './components/ProductStats';
import SearchFilters from './components/SearchFilters';
import MeetingList from './components/MeetingList';
import ContactMessages from './components/ContactMessages';

export default function AdminPage() {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    byProduct: {}
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/meeting-requests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch meeting requests');
      }
      
      const data = await response.json();
      setMeetings(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setError('Failed to load meeting requests. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data) => {
    const newStats = {
      total: data.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      byProduct: {}
    };
    
    data.forEach(meeting => {
      // Count by status
      newStats[meeting.status] = (newStats[meeting.status] || 0) + 1;
      
      // Count by product
      if (!newStats.byProduct[meeting.productId]) {
        newStats.byProduct[meeting.productId] = {
          name: meeting.productName,
          count: 0
        };
      }
      
      newStats.byProduct[meeting.productId].count += 1;
    });
    
    setStats(newStats);
  };

  const updateMeetingStatus = async (meetingId, newStatus) => {
    try {
      const response = await fetch('/api/meeting-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: meetingId,
          status: newStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update meeting status');
      }
      
      // Get updated data
      const result = await response.json();
      
      // Update local state
      setMeetings(prev => 
        prev.map(meeting => 
          meeting.id === meetingId 
            ? result.request 
            : meeting
        )
      );
      
      // Recalculate stats
      calculateStats(meetings.map(meeting => 
        meeting.id === meetingId 
          ? { ...meeting, status: newStatus } 
          : meeting
      ));
      
    } catch (error) {
      console.error('Error updating meeting status:', error);
      setError('Failed to update meeting status. Please try again.');
    }
  };

  const deleteMeeting = async (meetingId) => {
    if (!confirm('Are you sure you want to delete this meeting request?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/meeting-requests?id=${meetingId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete meeting request');
      }
      
      // Update local state
      const updatedMeetings = meetings.filter(meeting => meeting.id !== meetingId);
      setMeetings(updatedMeetings);
      
      // Recalculate stats
      calculateStats(updatedMeetings);
      
      // Close expanded view if this meeting was expanded
      if (expandedMeeting === meetingId) {
        setExpandedMeeting(null);
      }
      
    } catch (error) {
      console.error('Error deleting meeting:', error);
      setError('Failed to delete meeting request. Please try again.');
    }
  };

  const toggleExpand = (meetingId) => {
    setExpandedMeeting(expandedMeeting === meetingId ? null : meetingId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'confirmed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter and sort meetings
  const filteredMeetings = meetings
    .filter(meeting => {
      // Status filter
      if (statusFilter !== 'all' && meeting.status !== statusFilter) {
        return false;
      }
      
      // Search query
      const searchLower = searchQuery.toLowerCase();
      return (
        meeting.name.toLowerCase().includes(searchLower) ||
        meeting.email.toLowerCase().includes(searchLower) ||
        meeting.productName.toLowerCase().includes(searchLower) ||
        (meeting.company && meeting.company.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      // Date sorting
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardStats stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1">
                <ProductStats productStats={stats.byProduct} totalRequests={stats.total} />
              </div>
              
              <div className="lg:col-span-2">
                <SearchFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  dateSort={dateSort}
                  setDateSort={setDateSort}
                  refreshData={fetchMeetings}
                  totalItems={meetings.length}
                  filteredItems={filteredMeetings.length}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <MeetingList 
                isLoading={isLoading}
                error={error}
                filteredMeetings={filteredMeetings.slice(0, 5)} // Show only 5 most recent meetings on dashboard
                expandedMeeting={expandedMeeting}
                toggleExpand={toggleExpand}
                updateMeetingStatus={updateMeetingStatus}
                deleteMeeting={deleteMeeting}
                formatDate={formatDate}
                getStatusClass={getStatusClass}
                getStatusIcon={getStatusIcon}
              />
            </div>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setActiveTab('meetings')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All Meeting Requests →
              </button>
            </div>
            
            <ContactMessages />
          </>
        );
        
      case 'meetings':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1">
                <ProductStats productStats={stats.byProduct} totalRequests={stats.total} />
              </div>
              
              <div className="lg:col-span-2">
                <SearchFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  dateSort={dateSort}
                  setDateSort={setDateSort}
                  refreshData={fetchMeetings}
                  totalItems={meetings.length}
                  filteredItems={filteredMeetings.length}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <MeetingList 
                isLoading={isLoading}
                error={error}
                filteredMeetings={filteredMeetings}
                expandedMeeting={expandedMeeting}
                toggleExpand={toggleExpand}
                updateMeetingStatus={updateMeetingStatus}
                deleteMeeting={deleteMeeting}
                formatDate={formatDate}
                getStatusClass={getStatusClass}
                getStatusIcon={getStatusIcon}
              />
            </div>
          </>
        );
        
      case 'messages':
        return <ContactMessages />;
        
      case 'customers':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Management</h3>
            <p className="text-gray-600">
              Customer management features will be available in a future update.
            </p>
          </div>
        );
        
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">
              Admin settings will be available in a future update.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activeTab === 'dashboard' && 'Admin Dashboard'}
            {activeTab === 'meetings' && 'Meeting Requests'}
            {activeTab === 'messages' && 'Contact Messages'}
            {activeTab === 'customers' && 'Customer Management'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'dashboard' && 'Overview of your White Gold Aluminium business'}
            {activeTab === 'meetings' && 'Manage and track product consultation requests'}
            {activeTab === 'messages' && 'Manage messages from the contact form'}
            {activeTab === 'customers' && 'Manage your customer database'}
            {activeTab === 'settings' && 'Customize your admin preferences'}
          </p>
        </div>
        
        {renderTabContent()}
      </div>
    </div>
  );
}