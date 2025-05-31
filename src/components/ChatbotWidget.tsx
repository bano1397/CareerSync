// components/ChatbotWidget.tsx
"use client";

import { useState, useEffect } from "react";
import ChatBot from "@/components/Chatbot";
import { X } from "lucide-react";
import { FiMessageCircle } from "react-icons/fi";
import Player from "lottie-react"; // ✅ make sure this is included
import animationData from "../../public/chatanimation.json"; // ✅ JSON file

interface ChatbotWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMessage?: string;
  jobContext?: any;
}

export default function ChatbotWidget({
  isOpen: propIsOpen,
  onClose: propOnClose,
  initialMessage,
  jobContext,
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [hasUserStarted, setHasUserStarted] = useState(false);

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
      if (propIsOpen) setHasUserStarted(false);
    }
  }, [propIsOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasUserStarted(false);
    if (propOnClose) propOnClose();
  };

  const handleFirstMessage = () => {
    setHasUserStarted(true);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {propIsOpen === undefined && (
        <button
          onClick={() => {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            if (newIsOpen) setHasUserStarted(false);
          }}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl z-50 transition"
        >
          {isOpen ? <X size={20} /> : <FiMessageCircle size={24} />}
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[560px] bg-white rounded-2xl shadow-xl z-50 border flex flex-col overflow-hidden">
          <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-10">
            <span className="font-medium">CareerSync Assistant</span>
            <button onClick={handleClose}>
              <X className="w-5 h-5 hover:text-gray-200" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Message Area with possible GIF overlay */}
            <div className="flex-1 overflow-y-auto relative">
              {/* GIF Overlay */}
              {!hasUserStarted && (
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center">
                  <Player
                    animationData={animationData} // ✅ correct prop
                    loop
                    autoplay
                    style={{ height: 200, width: 200 }}
                  />

                  <p className="mt-4 font-semibold text-lg text-gray-800">
                    Hello, how can I assist you today?
                  </p>
                </div>
              )}

              {/* ChatBot component with messages */}
              <div className="h-full">
                <ChatBot
                  initialMessage={initialMessage}
                  jobContext={jobContext}
                  onFirstMessage={handleFirstMessage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
