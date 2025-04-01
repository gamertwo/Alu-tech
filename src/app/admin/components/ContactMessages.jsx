// app/admin/components/ContactMessages.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, User, MessageSquare, Check, Archive, XCircle, AlertCircle } from 'lucide-react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      setError('Failed to load contact messages. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: messageId,
          status: newStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update message status');
      }
      
      // Get updated data
      const result = await response.json();
      
      // Update local state
      setMessages(prev => 
        prev.map(message => 
          message.id === messageId 
            ? result.message 
            : message
        )
      );
      
    } catch (error) {
      console.error('Error updating message status:', error);
      setError('Failed to update message status. Please try again.');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/contact?id=${messageId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      
      // Update local state
      setMessages(prev => prev.filter(message => message.id !== messageId));
      
      // Close expanded view if this message was expanded
      if (expandedMessage === messageId) {
        setExpandedMessage(null);
      }
      
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message. Please try again.');
    }
  };

  const toggleExpand = (messageId) => {
    setExpandedMessage(expandedMessage === messageId ? null : messageId);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter messages based on active tab
  const filteredMessages = messages.filter(message => {
    switch (activeTab) {
      case 'new':
        return message.status === 'new';
      case 'read':
        return message.status === 'read';
      case 'replied':
        return message.status === 'replied';
      case 'archived':
        return message.status === 'archived';
      default:
        return true;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'replied':
        return 'bg-purple-100 text-purple-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabCounts = {
    new: messages.filter(msg => msg.status === 'new').length,
    read: messages.filter(msg => msg.status === 'read').length,
    replied: messages.filter(msg => msg.status === 'replied').length,
    archived: messages.filter(msg => msg.status === 'archived').length,
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200">
        <div className="flex flex-wrap">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'new' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('new')}
          >
            New <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{tabCounts.new}</span>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'read' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('read')}
          >
            Read <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{tabCounts.read}</span>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'replied' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('replied')}
          >
            Replied <span className="ml-1 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">{tabCounts.replied}</span>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'archived' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('archived')}
          >
            Archived <span className="ml-1 bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">{tabCounts.archived}</span>
          </button>
          <div className="ml-auto px-4 py-2">
            <button
              onClick={fetchMessages}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading contact messages...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium mb-2">Error Loading Data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-8 text-center">
          <div className="bg-gray-100 rounded-full p-3 inline-block mb-4">
            <Mail className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-800 font-medium mb-2">No Messages Found</p>
          <p className="text-gray-600">
            There are currently no messages in this category.
          </p>
        </div>
      ) : (
        <div>
          {filteredMessages.map((message) => (
            <div key={message.id} className="border-b border-gray-200 last:border-0">
              <div 
                className={`p-4 cursor-pointer hover:bg-gray-50 ${expandedMessage === message.id ? 'bg-blue-50' : ''}`}
                onClick={() => toggleExpand(message.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                        {message.name}
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 mr-2">
                          {message.inquiryType}
                        </span>
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {message.status === 'new' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateMessageStatus(message.id, 'read');
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Mark as Read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    {(message.status === 'new' || message.status === 'read') && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateMessageStatus(message.id, 'replied');
                        }}
                        className="text-purple-600 hover:text-purple-800 p-1"
                        title="Mark as Replied"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                    )}
                    {message.status !== 'archived' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateMessageStatus(message.id, 'archived');
                        }}
                        className="text-gray-600 hover:text-gray-800 p-1"
                        title="Archive"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.id);
                      }}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Expanded message content */}
                {expandedMessage === message.id && (
                  <div className="mt-4 pl-12">
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                        <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                        Message
                      </h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <a 
                        href={`mailto:${message.email}?subject=Re: ${message.inquiryType} Inquiry - White Gold Aluminium`}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (message.status === 'new' || message.status === 'read') {
                            updateMessageStatus(message.id, 'replied');
                          }
                        }}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ContactMessages;