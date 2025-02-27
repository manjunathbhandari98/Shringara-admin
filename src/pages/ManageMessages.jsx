import React, { useState } from "react";
import {
  Search,
  Star,
  Trash2,
  MoreVertical,
} from "lucide-react";

const ManageMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      subject:
        "Inquiry about wedding decoration packages",
      message: `Hi, I'm interested in your wedding decoration services. Could you please provide more details about your packages and pricing? We're planning our wedding for next summer.`,
      date: "2024-03-15 14:30",
      isStarred: true,
      isRead: false,
    },
    {
      id: "2",
      name: "David Chen",
      email: "david.chen@example.com",
      subject: "Corporate event setup inquiry",
      message: `We're organizing a corporate event next month and would like to discuss your decoration services. Please share your corporate event portfolio.`,
      date: "2024-03-14 09:15",
      isStarred: false,
      isRead: true,
    },
    {
      id: "3",
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      subject:
        "Birthday party decoration availability",
      message: `Hello, I'm planning my daughter's sweet sixteen party and would love to know about your birthday decoration services and availability for April 15th.`,
      date: "2024-03-13 16:45",
      isStarred: false,
      isRead: true,
    },
  ]);

  const [searchTerm, setSearchTerm] =
    useState("");
  const [selectedMessages, setSelectedMessages] =
    useState([]);

  const toggleStar = (id) => {
    setMessages(
      messages.map((message) =>
        message.id === id
          ? {
              ...message,
              isStarred: !message.isStarred,
            }
          : message
      )
    );
  };

  const toggleMessageSelection = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((msgId) => msgId !== id)
        : [...prev, id]
    );
  };

  const deleteMessages = () => {
    setMessages(
      messages.filter(
        (message) =>
          !selectedMessages.includes(message.id)
      )
    );
    setSelectedMessages([]);
  };

  const markAsRead = () => {
    setMessages(
      messages.map((message) =>
        selectedMessages.includes(message.id)
          ? { ...message, isRead: true }
          : message
      )
    );
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      message.subject
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      message.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Messages
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
      </div>

      {selectedMessages.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 rounded-lg mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedMessages.length} message(s)
            selected
          </div>
          <div className="flex space-x-2">
            <button
              onClick={markAsRead}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              Mark as read
            </button>
            <button
              onClick={deleteMessages}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`border-b border-gray-100 p-4 hover:bg-gray-50 ${
              !message.isRead ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedMessages.includes(
                  message.id
                )}
                onChange={() =>
                  toggleMessageSelection(
                    message.id
                  )
                }
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <button
                onClick={() =>
                  toggleStar(message.id)
                }
                className={`focus:outline-none ${
                  message.isStarred
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {message.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {message.date}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {message.email}
                </p>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {message.subject}
                </p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMessages;
