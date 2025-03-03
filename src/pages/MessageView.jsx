import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  getMessageByEmail,
  sendReply,
  sendReplyEmail,
} from "../services/messageService";
import {
  ArrowLeft,
  MoreVertical,
  Send,
  Paperclip,
  Trash2,
} from "lucide-react";
import { getAuthToken } from "../services/serviceService";

const MessageView = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [replyMessage, setReplyMessage] =
    useState("");
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const data = await getMessageByEmail(email);
      setMessage(data);
    };
    fetchMessage();
    const token = getAuthToken();
    console.log(token);
  }, [email]);

  const handleReply = async () => {
    if (!replyMessage.trim()) return;
    await sendReply(message.email, replyMessage);

    // Update the conversation state with the new message
    setMessage((prevMessage) => ({
      ...prevMessage,
      conversation: [
        ...prevMessage.conversation,
        {
          email: message.email,
          sender: "ADMIN",
          content: replyMessage,
          date: new Date().toISOString(),
        },
      ],
    }));
    console.log(message.email, replyMessage);

    setReplyMessage("");
  };

  if (!message) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white p-4 rounded-t-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />{" "}
          Back
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold">
            {message.name}
          </h2>
          <p className="text-xs text-gray-200">
            {message.email}
          </p>
        </div>
        <button
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
        >
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 right-6 bg-white shadow-md rounded-md py-2 w-36">
          <button className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full">
            <Trash2 className="w-4 h-4 mr-2" />{" "}
            Delete
          </button>
        </div>
      )}

      {/* Customer Details */}
      <div className="p-4 bg-white shadow-md rounded-md mx-4 my-2">
        <h3 className="font-semibold text-lg">
          {message.subject}
        </h3>
        <p className="text-gray-600 mt-2">
          {message.message}
        </p>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-200">
        {message.conversation?.map(
          (msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "ADMIN"
                  ? "ml-auto bg-green-500 text-white text-right"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="text-sm">
                {msg.content}
              </p>
              <p className="text-xs mt-1 text-gray-500">
                {new Date(
                  msg.date
                ).toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>

      {/* Reply Box */}
      <div className="bg-white p-4 border-t shadow-sm">
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded-lg bg-gray-100"
          value="Reply From Shringara Decorators"
          disabled
        />
        <textarea
          className="w-full p-2 border rounded-lg"
          rows="3"
          placeholder="Write your message..."
          value={replyMessage}
          onChange={(e) =>
            setReplyMessage(e.target.value)
          }
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() =>
              fileInputRef.current.click()
            }
            className="text-gray-500 hover:text-gray-700"
          >
            <Paperclip className="w-6 h-6" />
          </button>
          <button
            onClick={handleReply}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Send className="w-5 h-5 mr-2" /> Send
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MessageView;
