import React, {
  useEffect,
  useState,
} from "react";
import { ChevronRight } from "lucide-react";
import { getMessages } from "../services/messageService";
import { useNavigate } from "react-router-dom";

const MessagesSection = () => {
  const [messages, setMessages] = useState();
  const navigate = useNavigate();
  const fetchMessages = async () => {
    const response = await getMessages();
    setMessages(response);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleViewMessage = (email) => {
    navigate(`/message/${email}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Recent Messages
        </h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() =>
              handleViewMessage(message.email)
            }
          >
            <div>
              <h3 className="font-medium">
                {message.name}
              </h3>
              <p className="text-sm text-gray-500">
                {message.subject}
              </p>
              <span className="text-xs text-gray-400">
                {message.date.split("T")[0]}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesSection;
