'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, Mail, Phone, Building, 
  MessageSquare, CheckCircle2, XCircle, AlertCircle, Search, 
  RefreshCw, ChevronDown, ChevronUp, Filter 
} from 'lucide-react';

export default function AdminPage() {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  
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
      
      // Update local state
      setMeetings(prev => 
        prev.map(meeting => 
          meeting.id === meetingId 
            ? { ...meeting, status: newStatus } 
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

  // Find top products
  const topProducts = Object.values(stats.byProduct)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Request Dashboard</h1>
          <p className="text-gray-600">Manage and track all product consultation requests</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">Pending</h3>
            <p className="text-3xl font-bold text-amber-500">{stats.pending || 0}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">Confirmed</h3>
            <p className="text-3xl font-bold text-green-500">{stats.confirmed || 0}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">Completed</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.completed || 0}</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Product Stats */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Requested Products</h3>
              
              {topProducts.length > 0 ? (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full bg-gray-100 rounded-full h-4 mr-2">
                        <div 
                          className="bg-blue-600 h-4 rounded-full" 
                          style={{ width: `${(product.count / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 min-w-[30px] text-right">{product.count}</span>
                      <span className="ml-2 text-sm text-gray-800 truncate">{product.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No product data available</p>
              )}
            </motion.div>
          </div>
          
          {/* Filter and Search */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Meeting Requests</h3>
                
                <button 
                  onClick={fetchMeetings} 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, email, or product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-9 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      value={dateSort}
                      onChange={(e) => setDateSort(e.target.value)}
                      className="pl-9 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Results Summary */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredMeetings.length} of {meetings.length} requests
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Meeting Requests List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading meeting requests...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <p className="text-gray-800 font-medium mb-2">Error Loading Data</p>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : filteredMeetings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-gray-100 rounded-full p-3 inline-block mb-4">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-800 font-medium mb-2">No Meeting Requests Found</p>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all' 
                  ? "Try adjusting your filters or search terms"
                  : "When customers request meetings, they'll appear here"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMeetings.map((meeting) => (
                    <React.Fragment key={meeting.id}>
                      <tr 
                        className={`hover:bg-gray-50 cursor-pointer ${expandedMeeting === meeting.id ? 'bg-blue-50' : ''}`}
                        onClick={() => toggleExpand(meeting.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{meeting.name}</div>
                              <div className="text-sm text-gray-500">{meeting.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{meeting.productName}</div>
                          <div className="text-xs text-gray-500">{formatDate(meeting.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-1.5" />
                            <div>
                              <div className="text-sm text-gray-900">{meeting.preferredDate}</div>
                              <div className="text-xs text-gray-500">{meeting.preferredTime}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(meeting.status)}`}>
                            {getStatusIcon(meeting.status)}
                            <span className="ml-1 capitalize">{meeting.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(meeting.id);
                            }}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            {expandedMeeting === meeting.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                      
                      {/* Expanded Details */}
                      {expandedMeeting === meeting.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="5" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Customer Details */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-800 mb-3">Customer Information</h4>
                                <div className="space-y-3">
                                  <div className="flex items-start">
                                    <User className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                    <div>
                                      <div className="text-sm font-medium">{meeting.name}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Mail className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                    <div>
                                      <div className="text-sm">{meeting.email}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Phone className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                    <div>
                                      <div className="text-sm">{meeting.phone}</div>
                                    </div>
                                  </div>
                                  {meeting.company && (
                                    <div className="flex items-start">
                                      <Building className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                      <div>
                                        <div className="text-sm">{meeting.company}</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Meeting Details */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-800 mb-3">Meeting Details</h4>
                                <div className="space-y-3">
                                  <div className="flex items-start">
                                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                    <div>
                                      <div className="text-sm font-medium">Preferred Date</div>
                                      <div className="text-sm text-gray-600">{meeting.preferredDate}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Clock className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                    <div>
                                      <div className="text-sm font-medium">Preferred Time</div>
                                      <div className="text-sm text-gray-600">{meeting.preferredTime}</div>
                                    </div>
                                  </div>
                                  {meeting.message && (
                                    <div className="flex items-start">
                                      <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium">Additional Message</div>
                                        <div className="text-sm text-gray-600">{meeting.message}</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-800 mb-3">Update Status</h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <button
                                    onClick={() => updateMeetingStatus(meeting.id, 'pending')}
                                    className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'pending' ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' : 'bg-gray-100 text-gray-800 hover:bg-amber-50'}`}
                                  >
                                    Pending
                                  </button>
                                  <button
                                    onClick={() => updateMeetingStatus(meeting.id, 'confirmed')}
                                    className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'confirmed' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-gray-100 text-gray-800 hover:bg-green-50'}`}
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => updateMeetingStatus(meeting.id, 'completed')}
                                    className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'completed' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
                                  >
                                    Complete
                                  </button>
                                  <button
                                    onClick={() => updateMeetingStatus(meeting.id, 'cancelled')}
                                    className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'cancelled' ? 'bg-red-100 text-red-800 border-2 border-red-300' : 'bg-gray-100 text-gray-800 hover:bg-red-50'}`}
                                  >
                                    Cancel
                                  </button>
                                </div>
                                
                                <button
                                  onClick={() => deleteMeeting(meeting.id)}
                                  className="mt-2 text-red-600 hover:text-red-800 text-xs flex items-center"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Delete Request
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}