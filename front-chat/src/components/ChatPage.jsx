import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiPaperclip, FiLogOut, FiUser, FiMessageSquare } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  // Load messages on component mount
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // WebSocket connection and subscription
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  function handleLogout() {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <FiMessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {roomId}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {messages.length} messages
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {currentUser?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentUser}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              Leave Room
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div 
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-4xl mx-auto w-full space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-2 ${
                  message.sender === currentUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none shadow"
                }`}
              >
                <div className="flex flex-col">
                  {message.sender !== currentUser && (
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      {message.sender}
                    </span>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className={`text-xs ${
                      message.sender === currentUser 
                        ? "text-blue-200" 
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {timeAgo(message.timeStamp)}
                    </span>
                    {message.sender === currentUser && (
                      <BsCheck2All className="h-3.5 w-3.5 text-blue-200" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="block w-full pl-10 pr-16 py-3 border-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="button"
                className="inline-flex items-center p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPaperclip className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim()}
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FiSend className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </div>
          {isTyping && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Someone is typing...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
