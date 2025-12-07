import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900">
      <div className="max-w-4xl w-full px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
          DigitalBuzz Lab
        </h1>
        <p className="text-slate-300 mb-8 max-w-xl">
          Firebase push notifications, Crashlytics logging, and an AI image widget
          built as reusable React components with Tailwind CSS.
        </p>

        {/* Components will be wired here */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
            <h2 className="text-lg font-semibold text-white mb-2">Notifications & Crashlytics</h2>
            <p className="text-sm text-slate-400 mb-4">
              Demo area for Firebase Cloud Messaging and Crashlytics integration.
            </p>
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 shadow hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors"
            >
              Test Notification
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
            <h2 className="text-lg font-semibold text-white mb-2">AI Image Widget</h2>
            <p className="text-sm text-slate-400 mb-4">
              This card will host an AI-powered image generation & display tool.
            </p>
            <div className="h-32 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-xs text-slate-500">
              AI image preview area
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
