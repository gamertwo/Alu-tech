// app/admin/components/MeetingDetails.jsx
'use client';

import React from 'react';
import { User, Mail, Phone, Building, Calendar, Clock, MessageSquare, XCircle } from 'lucide-react';

const MeetingDetails = ({ meeting, updateMeetingStatus, deleteMeeting, toggleExpand }) => {
  return (
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
                onClick={(e) => {
                  e.stopPropagation();
                  updateMeetingStatus(meeting.id, 'pending');
                }}
                className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'pending' ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' : 'bg-gray-100 text-gray-800 hover:bg-amber-50'}`}
              >
                Pending
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateMeetingStatus(meeting.id, 'confirmed');
                }}
                className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'confirmed' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-gray-100 text-gray-800 hover:bg-green-50'}`}
              >
                Confirm
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateMeetingStatus(meeting.id, 'completed');
                }}
                className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'completed' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
              >
                Complete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateMeetingStatus(meeting.id, 'cancelled');
                }}
                className={`px-3 py-1 text-xs font-medium rounded ${meeting.status === 'cancelled' ? 'bg-red-100 text-red-800 border-2 border-red-300' : 'bg-gray-100 text-gray-800 hover:bg-red-50'}`}
              >
                Cancel
              </button>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteMeeting(meeting.id);
              }}
              className="mt-2 text-red-600 hover:text-red-800 text-xs flex items-center"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Delete Request
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MeetingDetails;