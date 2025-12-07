import React, { useState, useRef, useEffect } from "react";

function getSmartReply(message, history) {
  const text = message.toLowerCase();

  if (/hello|hi|hey/.test(text)) return "Hello! 👋 How can I assist you today?";
  if (/help|support|assist/.test(text)) return "Sure! Tell me what you need help with.";
  if (/bye|goodbye|see you/.test(text)) return "Goodbye! Come back anytime 😊";

  if (/image|photo|picture|pic/.test(text)) {
    return "You can upload an image using the Upload button below.";
  }

  if (history.length > 1) {
    const lastUserMsg = history
      .filter((m) => m.sender === "user")
      .map((m) => m.text)
      .slice(-1)[0];

    if (lastUserMsg && text.includes("why")) {
      return `You said: "${lastUserMsg}". Can you clarify what exactly you want to know?`;
    }
  }

  const faq = {
    "your name": "I am your AI assistant — a smart mini bot.",
    "what can you do": "I can chat, answer questions, and process images!",
    "who made you": "I was created as part of the DigitalBuzz project.",
    "time": `The current time is ${new Date().toLocaleTimeString()}.`,
  };

  for (let key in faq) {
    if (text.includes(key)) return faq[key];
  }

  if (/how are you/.test(text)) return "I'm doing great! Thanks for asking 😊";

  if (/love/.test(text))
    return "Aww ❤️ That's sweet! I’m always here for you.";

  if (/joke/.test(text))
    return "Why don’t programmers like nature? Too many bugs 🐞😂";

  return "That's interesting! Tell me more...";
}

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to the Smart AI Chat! Ask me anything or upload an image.",
    },
  ]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef();
  const chatEndRef = useRef();

  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  
  const currentScroll = window.scrollY;
  window.scrollTo(0, currentScroll);
}, [messages]);


  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const newMsg = { sender: "user", text: input, image };
    setMessages((msgs) => [...msgs, newMsg]);
    setInput("");
    setImage(null);

    setIsTyping(true);

    setTimeout(() => {
      const botReply = image
        ? "Nice image! I can process it if connected to an AI backend."
        : getSmartReply(input, messages);

      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 800);
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
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-emerald-500 text-emerald-950"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              {msg.text && <span>{msg.text}</span>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="upload"
                  className="mt-2 rounded-lg max-h-32 border border-slate-700"
                />
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

      <form
        onSubmit={handleSend}
        className="p-3 border-t border-slate-800 flex gap-2 bg-slate-950/80"
      >
        <input
          type="text"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

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
          <img
            src={image}
            alt="preview"
            className="h-10 w-10 rounded-lg border border-slate-700"
          />
          <span className="text-xs text-slate-300">Image ready to send</span>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
