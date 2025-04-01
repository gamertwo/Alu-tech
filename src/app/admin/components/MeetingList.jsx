// app/admin/components/MeetingList.jsx
'use client';

import React from 'react';
import { Calendar, User, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import MeetingDetails from './MeetingDetails';

const MeetingList = ({ 
  isLoading, 
  error, 
  filteredMeetings, 
  expandedMeeting, 
  toggleExpand,
  updateMeetingStatus,
  deleteMeeting,
  formatDate,
  getStatusClass,
  getStatusIcon
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading meeting requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
        <p className="text-gray-800 font-medium mb-2">Error Loading Data</p>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (filteredMeetings.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="bg-gray-100 rounded-full p-3 inline-block mb-4">
          <Calendar className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-gray-800 font-medium mb-2">No Meeting Requests Found</p>
        <p className="text-gray-600">
          Try adjusting your filters or search terms, or check back later when customers have submitted requests.
        </p>
      </div>
    );
  }

  return (
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
                <MeetingDetails 
                  meeting={meeting}
                  updateMeetingStatus={updateMeetingStatus}
                  deleteMeeting={deleteMeeting}
                  toggleExpand={toggleExpand}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingList;