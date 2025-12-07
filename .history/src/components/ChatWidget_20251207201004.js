import React, { useState, useRef, useEffect } from 'react';

// Simple local AI bot logic
function getBotReply(message) {
  const text = message.toLowerCase();
  if (/hello|hi|hey/.test(text)) return 'Hello! How can I help you today?';
  if (/image|photo|pic/.test(text)) return 'You can upload an image using the button below.';
  if (/bye|goodbye/.test(text)) return 'Goodbye! Have a great day!';
  if (/help|support/.test(text)) return 'I am a simple AI bot. Try saying hello or upload an image!';
  return "I'm not sure how to respond to that, but I'm learning!";
}

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the Mini AI Chat! Say hello or upload an image.' }
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef();
  const chatEndRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;
    const newMsg = { sender: 'user', text: input, image };
    setMessages((msgs) => [...msgs, newMsg]);
    setInput('');
    setImage(null);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: getBotReply(input) }
      ]);
      setIsTyping(false);
    }, 700);
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
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-lg flex flex-col h-[32rem]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${msg.sender === 'user' ? 'bg-emerald-500 text-emerald-950' : 'bg-slate-800 text-slate-100'}`}>
              {msg.text && <span>{msg.text}</span>}
              {msg.image && (
                <img src={msg.image} alt="upload" className="mt-2 rounded-lg max-h-32 border border-slate-700" />
              )}
              <div className="text-[10px] text-right text-slate-400 mt-1">{msg.sender === 'user' ? 'You' : 'AI Bot'}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-400 text-sm animate-pulse">AI is typing...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex gap-2 bg-slate-950/80">
        <input
          type="text"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-transparent"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
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
          className="rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-sky-950 shadow hover:bg-sky-400 transition-colors"
        >
          Upload
        </button>
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-emerald-950 shadow hover:bg-emerald-400 transition-colors"
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
