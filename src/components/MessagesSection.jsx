import React from "react";
import { ChevronRight } from "lucide-react";

const MessagesSection = () => {
  const messages = [
    {
      name: "Emily Wilson",
      message:
        "Inquiry about wedding decoration packages",
      time: "2 hours ago",
    },
    {
      name: "David Chen",
      message:
        "Question regarding corporate event setup",
      time: "5 hours ago",
    },
    {
      name: "Lisa Anderson",
      message:
        "Birthday party decoration availability",
      time: "1 day ago",
    },
  ];

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
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="font-medium">
                {message.name}
              </h3>
              <p className="text-sm text-gray-500">
                {message.message}
              </p>
              <span className="text-xs text-gray-400">
                {message.time}
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
