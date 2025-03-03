import React, { useEffect, useState } from "react";
import { Search, Star, Trash2, MoreVertical,CheckCircle } from "lucide-react";
import { getMessages, deleteMessage } from "../services/messageService";
import { format } from "date-fns";
import { isToday, isYesterday, isThisWeek, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  if (isToday(date)) return format(date, "HH:mm");
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date)) return format(date, "EEEE");
  return format(date, "dd/MM/yy");
};

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const navigate = useNavigate();

  const fetchMessage = async () => {
    const messages = await getMessages();
    setMessages(messages);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const handleViewMessage = (email) => {
    navigate(`/message/${email}`);
  };

  const confirmDeleteMessage = (id) => {
    setOpenMenuId(null);
    setMessageToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteMessage = async () => {
    if (messageToDelete) {
      await deleteMessage(messageToDelete);
      setMessages(messages.filter((msg) => msg.id !== messageToDelete));
      setShowDeleteModal(false);
      setMessageToDelete(null);
    }
  };

  const confirmBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const handleDeleteSelected = async () => {
  try {
    // Send delete request for each selected message
    await Promise.all(selectedMessages.map((id) => deleteMessage(id)));

    // Remove deleted messages from state
    setMessages(messages.filter((msg) => !selectedMessages.includes(msg.id)));

    // Clear selected messages and close modal
    setSelectedMessages([]);
    setShowBulkDeleteModal(false);
  } catch (error) {
    console.error("Failed to delete messages:", error);
  }
};


  const handleMarkAsRead = () => {
    setMessages(
      messages.map((msg) =>
        selectedMessages.includes(msg.id) ? { ...msg, isRead: true } : msg
      )
    );
    setSelectedMessages([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {selectedMessages.length > 0 && (
  <div className="flex justify-end space-x-2 mb-4">
    <button
      onClick={handleMarkAsRead}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      <CheckCircle className="w-5 h-5" />
      <span>Mark as Read</span>
    </button>
    <button
      onClick={confirmBulkDelete}
      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
    >
      <Trash2 className="w-5 h-5" />
      <span>Delete</span>
    </button>
  </div>
)}


      <div className="bg-white rounded-lg shadow-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`border-b border-gray-100 p-4 hover:bg-gray-50 ${!message.isRead ? "bg-blue-50" : ""}`}
            onClick={() => handleViewMessage(message.email)}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedMessages.includes(message.id)}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setSelectedMessages((prev) =>
                    prev.includes(message.id)
                      ? prev.filter((msgId) => msgId !== message.id)
                      : [...prev, message.id]
                  );
                }}
                className="rounded text-blue-600 focus:ring-blue-500"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMessages(
                    messages.map((msg) =>
                      msg.id === message.id ? { ...msg, isStarred: !msg.isStarred } : msg
                    )
                  );
                }}
                className={`focus:outline-none ${message.isStarred ? "text-yellow-400" : "text-gray-300"}`}
              >
                <Star className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{message.name}</h3>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === message.id ? null : message.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-3"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenuId === message.id && (
                      <div className="absolute top-full right-0 bg-white shadow-md rounded-md py-2 w-36 z-10 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteMessage(message.id);
                          }}
                          className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{message.email}</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{message.subject}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm text-gray-600">Are you sure you want to delete this message?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={handleDeleteMessage} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showBulkDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Bulk Deletion</h2>
            <p className="text-sm text-gray-600">Are you sure you want to delete the selected messages?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowBulkDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={handleDeleteSelected} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
