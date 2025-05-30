"use client";

import { useState } from "react";
import { Send, Settings, X } from "lucide-react";
import MessageWindow from "@/components/ui/MessageWindow";
import SettingsModal from "@/components/ui/SettingsModal";
import { ChatHistory, ChatSettings, Message, MessageRole } from "@/types";

export default function ChatBot() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: "You are a helpful assistant.",
  });

  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message.trim() }],
    };

    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: message.trim(),
          history: updatedHistory,
          settings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("AI Error:", data.error);
        return;
      }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => setMessage("");

  return (
    <div className="flex flex-col h-full bg-gray-50">
  <div className="flex-1 overflow-y-auto px-4 pt-4">
    <MessageWindow history={history} />
  </div>

      {/* Input Bar */}
      <div className="w-full px-4 pb-4">
        <div className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-full shadow-md">
          <div className="relative flex-1">
            <textarea
              className="w-full resize-none px-3 py-2 bg-transparent border-none focus:outline-none text-sm"
              placeholder="Type a message..."
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {message && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                onClick={handleClear}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            className="ml-2 p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={20} />
          </button>
          <button
            className={`ml-1 p-2 rounded-full transition-all ${
              message.trim()
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(newSettings) => setSettings(newSettings)}
        currentSettings={settings}
      />
    </div>
  );
}
