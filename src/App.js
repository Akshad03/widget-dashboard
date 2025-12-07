import React from 'react';
import './App.css';
import NotificationDemo from './components/NotificationDemo';
import AiImageWidget from './components/AiImageWidget';
import ChatWidget from './components/ChatWidget';
import { Toaster } from 'react-hot-toast';   // ← ADD THIS

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900">
      <Toaster position="top-center" /> {/* ⬅️ NOTIFICATION WILL COME FROM TOP */}

      <div className="max-w-4xl w-full px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40 col-span-2">
            <h2 className="text-lg font-semibold text-white mb-2">Mini AI Chat App (MERN Ready)</h2>
            <p className="text-sm text-slate-400 mb-4">
              Standalone, reusable chat widget with text, image upload, and local AI bot logic. Backend integration ready.
            </p>
            <ChatWidget />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
            <h2 className="text-lg font-semibold text-white mb-2">Notifications & Crashlytics</h2>
            <p className="text-sm text-slate-400 mb-4">
              Request permission, fire a test notification, and log demo errors
              as if they were sent to Crashlytics.
            </p>
            <NotificationDemo />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
            <h2 className="text-lg font-semibold text-white mb-2">AI Image Widget</h2>
            <p className="text-sm text-slate-400 mb-4">
              Type a prompt and generate a demo image using a pluggable
              AI backend.
            </p>
            <AiImageWidget />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
