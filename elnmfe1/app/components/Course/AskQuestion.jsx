import React, { useState } from "react"
import axios from "axios"
import "./AskQuestion.css"

const ChatUI = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentConversation, setCurrentConversation] = useState(0)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setIsLoading(true)
      // Thêm tin nhắn người dùng
      setMessages([...messages, { text: inputValue, sender: "user" }])
      setInputValue("")

      try {
        // Gọi OpenAI API thay cho API cũ, dùng GPT-4
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: inputValue }
            ]
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            }
          }
        )

        // Trích xuất phần nội dung trả lời của ChatGPT (GPT-4)
        const botResponse = response.data.choices[0].message.content

        // Thêm tin nhắn bot vào danh sách tin nhắn
        setMessages([
          ...messages,
          { text: inputValue, sender: "user" },
          { text: botResponse, sender: "bot" }
        ])
      } catch (error) {
        console.error("Error calling OpenAI API:", error)
        setMessages([
          ...messages,
          { text: "Đã xảy ra lỗi khi gọi OpenAI API", sender: "bot" }
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleNewConversation = () => {
    setMessages([])
    setCurrentConversation(currentConversation + 1)
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button onClick={handleNewConversation}>
          Create new conversation
        </button>
        <span>Number of conversation: {currentConversation}</span>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Input Messenger..."
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  )
}

export default ChatUI
