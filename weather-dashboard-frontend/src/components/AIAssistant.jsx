import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askAI } from "../services/aiService";
import toast from "react-hot-toast";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await askAI(input);

      const aiMessage = { type: "ai", text: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      toast.error("AI failed to respond");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl z-50"
      >
        🤖
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white p-4 font-semibold">
              Weather AI Assistant
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    msg.type === "user"
                      ? "bg-indigo-100 text-right text-gray-700  ml-10"
                      : "bg-gray-100 mr-10 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="text-gray-900 text-sm">
                  Thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your cities..."
                className="flex-1 p-3 outline-none text-black text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;