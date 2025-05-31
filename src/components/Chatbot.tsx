"use client";

import { useState, useEffect } from "react";
import { Send, Settings, X } from "lucide-react";
import MessageWindow from "@/components/ui/MessageWindow";
import SettingsModal from "@/components/ui/SettingsModal";
import { ChatHistory, ChatSettings, Message, MessageRole } from "@/types";

interface ChatBotProps {
  initialMessage?: string;
  jobContext?: any;
  onFirstMessage?: () => void; // Callback prop
}

export default function ChatBot({ 
  initialMessage, 
  jobContext,
  onFirstMessage
}: ChatBotProps) {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Added missing state
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: jobContext 
      ? `You are a career assistant specializing in helping with the "${jobContext.job_title}" position at ${jobContext.employer_name}. 
         
         Job Details:
         - Title: ${jobContext.job_title}
         - Company: ${jobContext.employer_name}
         - Location: ${jobContext.job_location}
         - Employment Type: ${jobContext.job_employment_type}
         ${jobContext.job_salary ? `- Salary Range: ${jobContext.job_salary.min_salary || 'Not specified'} - ${jobContext.job_salary.max_salary || 'Not specified'} ${jobContext.job_salary.salary_period || ''}` : ''}
         
         Focus on providing helpful guidance about:
         1. Salary expectations and negotiation tips for this specific role
         2. Interview preparation tailored to this position
         3. Resume optimization for this job application
         4. Related job opportunities in this field
         5. Company research and insights
         
         Keep responses professional, job-focused, and actionable. Avoid generic advice and tailor everything to this specific opportunity.`
      : "You are a helpful career assistant.",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialMessage && !history.length) {
      setHistory([{
        role: "model" as MessageRole,
        parts: [{ text: initialMessage }]
      }]);
    }
  }, [initialMessage]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    // Notify parent about first message
    if (!hasSentFirstMessage) {
      setHasSentFirstMessage(true);
      if (onFirstMessage) onFirstMessage();
    }

    // ... rest of handleSend remains the same ...
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message.trim() }],
    };

    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: message.trim(),
          history: updatedHistory,
          settings: {
            ...settings,
            jobContext
          },
        }),
      });

      const data = await response.json();

      // if (data.error) {
      //   console.error("AI Error:", data.error);
      //   const errorMessage: Message = {
      //     role: "model" as MessageRole,
      //     parts: [{ text: "Sorry, I encountered an error. Please try again." }],
      //   };
      //   setHistory((prev) => [...prev, errorMessage]);
      //   return;
      // }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
      const errorMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: "Sorry, I'm having trouble connecting. Please try again." }],
      };
      setHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="w-full px-4 pb-4">
        <div className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-full shadow-md">
          <div className="relative flex-1">
            <textarea
              className="w-full resize-none px-3 py-2 bg-transparent border-none focus:outline-none text-sm"
              placeholder={jobContext ? "Ask about this job opportunity..." : "Type a message..."}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
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
              message.trim() && !isLoading
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
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