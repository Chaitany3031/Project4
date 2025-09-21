import { useState, useEffect } from 'react'
import './App.css'
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message to chat history
    const userMessage = { role: 'user', content: message }
    setChatHistory(prev => [...prev, userMessage])

    // Send message to backend
    socket.emit("ai-message", message)
    setMessage('') // Clear input after sending
  }

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    
    // Listen for AI responses
    socketInstance.on("ai-message-reponse", (response) => {
      console.log("Received AI response:", response)
      const aiMessage = { role: 'ai', content: response }
      setChatHistory(prev => [...prev, aiMessage])
    })

    setSocket(socketInstance)

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

export default App
