"use client"

import { useRef, useEffect } from "react"
import { ChatHistory } from "@/types"
import { User, Bot } from "lucide-react"

interface MessageWindowProps {
  history: ChatHistory
}

export default function MessageWindow({ history }: MessageWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  return (
    <div className="p-4 overflow-y-auto h-full space-y-4">
      {history.map((msg, index) => {
        const isUser = msg.role === "user"

        return (
          <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
              <div className="mr-2 mt-auto">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
                  <Bot size={16} className="text-gray-700" />
                </div>
              </div>
            )}

            <div
              className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg text-sm shadow-sm whitespace-pre-wrap break-words ${
                isUser
                  ? "bg-purple-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}
            >
              {msg.parts.map((part, i) => (
                <span key={i}>{part.text}</span>
              ))}
            </div>

            {isUser && (
              <div className="ml-2 mt-auto">
                <div className="w-8 h-8 flex items-center justify-center bg-purple-500 rounded-full">
                  <User size={16} className="text-white" />
                </div>
              </div>
            )}
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
