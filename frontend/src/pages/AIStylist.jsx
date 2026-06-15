import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import api from "../services/api";

function AIStylist() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const suggestions = [
    "Suggest an outfit for a wedding",
    "What should I wear for an office meeting?",
    "Create a date night outfit",
    "Suggest a summer vacation look",
  ];

  const askAI = async (question = prompt) => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await api.post("/ai/fashion-chat", {
        prompt: question,
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't answer right now. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ora-page">
      <div className="ora-header">
        <h1>✨ Ask ORA</h1>
        <p>Your Personal AI Fashion Stylist</p>
      </div>

      <div className="ora-chat" ref={chatRef}>
        {messages.length === 0 && (
          <div className="ora-empty">
            <h2>How can I style you today?</h2>

            <p>
              Ask ORA about fashion trends, occasions, outfits and styling
              advice.
            </p>

            <div className="suggestions-grid">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  className="suggestion-card"
                  onClick={() => askAI(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="avatar">{msg.role === "user" ? "👤" : "✨"}</div>

            <div className="message-content">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="avatar">✨</div>

            <div className="message-content typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="ora-input-area">
        <input
          type="text"
          placeholder="Ask ORA anything about fashion..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
        />

        <button disabled={loading} onClick={() => askAI()}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default AIStylist;
