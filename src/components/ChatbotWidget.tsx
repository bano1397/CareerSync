"use client";

import { useState } from "react";
import ChatBot from "@/components/Chatbot";
import { X } from "lucide-react";
import { FiMessageCircle } from "react-icons/fi";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl z-50 transition"
      >
        {isOpen ? <X size={20} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[560px] bg-white rounded-2xl shadow-xl z-50 border flex flex-col overflow-hidden">
          {/* Sticky Header */}
          <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-10">
            <span className="font-medium">CareerSync Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 hover:text-gray-200" />
            </button>
          </div>

          {/* Main chat area with scrolling */}
          <div className="flex-1 overflow-y-auto">
            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
}
