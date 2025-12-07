import React, { useState, useRef, useEffect } from "react";

function getSmartReply(message, history) {
  const text = message.toLowerCase();
  const emojis = ["😊", "👍", "💡", "😎", "🤖"];

  if (/hello|hi|hey/.test(text))
    return `Hello! ${emojis[Math.floor(Math.random() * emojis.length)]} How can I help you today?`;
  if (/help|support|assist/.test(text))
    return `Sure! Tell me what you need help with. ${emojis[Math.floor(Math.random() * emojis.length)]}`;
  if (/bye|goodbye|see you/.test(text)) return "Goodbye! Come back anytime! 😊";
  if (/image|photo|picture|pic/.test(text)) return "You can upload an image using the Upload button below.";

  const faq = {
    "your name": "I am your Smart AI Assistant 🤖",
    "what can you do": "I can chat, answer questions, and process images!",
    "who made you": "I was created as part of the DigitalBuzz project.",
    "time": `The current time is ${new Date().toLocaleTimeString()}.`,
    "date": `Today's date is ${new Date().toLocaleDateString()}.`,
    "day": `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long' })}.`,
    "weather": "I don't have real-time weather data, but I hope it's nice where you are!",
    "joke": "Why are chickens so funny? Bec 😂",

  };

  for (let key in faq) if (text.includes(key)) return faq[key];

  if (/how are you/.test(text)) return "I'm doing great! Thanks for asking! 😎";
  if (/joke/.test(text)) return "Why don’t programmers like nature? Too many bugs 🐞😂";

  // default dynamic reply
  return `Interesting! ${emojis[Math.floor(Math.random() * emojis.length)]} Tell me more...`;
}

// Function to simulate typing one character at a time
async function typeReply(text, addCharCallback, delay = 30) {
  for (let char of text) {
    addCharCallback(char);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to the Smart AI Chat! Ask me anything or upload an image." },
  ]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef();
  const chatEndRef = useRef();

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); const currentScroll = window.scrollY; window.scrollTo(0, currentScroll); }, [messages]);

 const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim() && !image) return;

  const newMsg = { sender: "user", text: input, image };
  setMessages((msgs) => [...msgs, newMsg]);
  setInput("");
  setImage(null);
  setIsTyping(true);

  const botText = image
    ? "Nice image! I can process it if connected to an AI backend."
    : getSmartReply(input, messages);

  // Add empty bot message first
  setMessages((msgs) => [...msgs, { sender: "bot", text: "" }]);

  // Typing effect
  let currentText = "";
  for (let char of botText) {
    currentText += char;
    setMessages((msgs) => {
      const updated = [...msgs];
      updated[updated.length - 1] = { sender: "bot", text: currentText };
      return updated;
    });
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  setIsTyping(false);
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[32rem] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-emerald-500 text-emerald-950"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              {msg.text && <span>{msg.text}</span>}
              {msg.image && (
                <img src={msg.image} alt="upload" className="mt-2 rounded-lg max-h-32 border border-slate-700" />
              )}
              <div className="text-[10px] text-right text-slate-400 mt-1">
                {msg.sender === "user" ? "You" : "AI Bot"}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-400 text-sm animate-pulse">
              AI is typing…
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex gap-2 bg-slate-950/80">
        <input
          type="text"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-sky-950 hover:bg-sky-400"
        >
          Upload
        </button>

        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-400"
        >
          Send
        </button>
      </form>

      {image && (
        <div className="p-2 border-t border-slate-800 bg-slate-950/90 flex items-center gap-2">
          <img src={image} alt="preview" className="h-10 w-10 rounded-lg border border-slate-700" />
          <span className="text-xs text-slate-300">Image ready to send</span>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
