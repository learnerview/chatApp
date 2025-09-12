import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { FiSend, FiPlusCircle, FiUser, FiHash } from "react-icons/fi";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { roomId, userName, setRoomId, setCurrentUser, setConnected } =
    useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Successfully joined the room!");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error(error.response?.data || "Invalid room ID");
        } else {
          toast.error("Error joining room. Please try again.");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await createRoomApi(detail.roomId);
        toast.success("Room created successfully!");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        console.error(error);
        if (error.status === 400) {
          toast.error("Room already exists!");
        } else {
          toast.error("Error creating room. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
          <div className="w-20 h-20 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg mb-4">
            <img src={chatIcon} alt="Chat" className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to ChatApp</h1>
          <p className="text-blue-100 mt-1">Connect with your friends in real-time</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                onChange={handleFormInputChange}
                value={detail.userName}
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your name"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          {/* Room ID Field */}
          <div className="space-y-2">
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Room ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="roomId"
                onChange={handleFormInputChange}
                value={detail.roomId}
                type="text"
                id="roomId"
                placeholder="Enter room ID"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter an existing room ID or create a new one
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={joinChat}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:transform-none"
            >
              <FiSend className="w-5 h-5" />
              {isLoading ? 'Joining...' : 'Join Room'}
            </button>
            <button
              onClick={createRoom}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:transform-none"
            >
              <FiPlusCircle className="w-5 h-5" />
              {isLoading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
