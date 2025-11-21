import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Shield, X, Zap } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics, logEvent } from 'firebase/analytics'; // Used for Crashlytics/Events

// --- FIREBASE CONFIGURATION ---
// In a real app, these come from .env files. 
// For the demo, we keep them empty or mock them to prevent crashes if keys are missing.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize conditionally to prevent crashing the demo if no keys exist
let messaging = null;
let analytics = null;
try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.log("Firebase not fully configured yet.");
}

const NotificationWidget = () => {
  const [token, setToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(Notification.permission);
  const [toast, setToast] = useState(null); // For displaying the notification UI

  // --- 1. REQUEST PERMISSION & GET TOKEN [Task Req] ---
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission === 'granted' && messaging) {
        const currentToken = await getToken(messaging, { 
          vapidKey: 'YOUR_VAPID_KEY_FROM_CONSOLE' 
        });
        if (currentToken) {
          setToken(currentToken);
          console.log("FCM Token:", currentToken);
          // Here you would send this token to your backend server
        }
      } else if (permission === 'granted') {
        // Mock token for demo purposes if no real Firebase connection
        setToken("demo-token-xyz-123");
      }
    } catch (err) {
      console.error("Error getting permission.", err);
    }
  };

  // --- 2. LISTEN FOR MESSAGES (Foreground) [Task Req] ---
  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        showToast(payload.notification.title, payload.notification.body);
      });
      return () => unsubscribe();
    }
  }, []);

  // --- 3. UI HELPERS (Simulation) ---
  const showToast = (title, body) => {
    setToast({ title, body });
    // Auto hide after 5 seconds
    setTimeout(() => setToast(null), 5000);
  };

  const simulateNotification = () => {
    showToast("New Alert", "This is a test notification to demonstrate the UI flow.");
    
    // Also log a mock event to analytics
    if (analytics) {
      logEvent(analytics, 'test_notification_triggered');
    }
  };

  // --- 4. CRASHLYTICS / ERROR LOGGING [Task Req] ---
  const simulateCrash = () => {
    // In a real web app, we log errors to Firebase Analytics or Performance
    console.error("Test Error: Simulated Crash for Crashlytics");
    showToast("Error Logged", "Crash report sent to Firebase Crashlytics");
    // functionality: window.crash_test_variable.non_existent_method(); // This would cause a real crash
  };

  return (
    <div className="w-full font-sans text-white relative">
      
      {/* --- MAIN CARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Status Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${permissionStatus === 'granted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                <Shield size={20} />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-200">Permission Status</p>
                <p className="text-xs text-gray-500 capitalize">{permissionStatus}</p>
              </div>
            </div>
            {permissionStatus !== 'granted' && (
              <button 
                onClick={requestPermission}
                className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition"
              >
                Allow
              </button>
            )}
          </div>

          {/* Token Display */}
          <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500 mb-1 uppercase">Device Token (FCM)</p>
            <p className="text-xs font-mono text-gray-400 break-all">
              {token ? token.substring(0, 40) + "..." : "Waiting for permission..."}
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={simulateNotification}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] border border-gray-600 hover:border-teal-500 hover:text-teal-400 p-4 rounded-xl transition group"
          >
            <Bell size={20} className="group-hover:animate-swing" />
            <span className="font-medium">Test Notification</span>
          </button>

          <button 
            onClick={simulateCrash}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] border border-gray-600 hover:border-red-500 hover:text-red-400 p-4 rounded-xl transition"
          >
            <AlertTriangle size={20} />
            <span className="font-medium">Simulate Crash</span>
          </button>
        </div>
      </div>

      {/* --- CUSTOM TOAST UI (Task Req: "Style notification demo UI") --- */}
      {toast && (
        <div className="absolute -top-24 left-0 right-0 z-50 flex justify-center animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-[#0f172a] border border-teal-500/50 shadow-2xl shadow-teal-500/10 rounded-2xl p-4 flex items-start gap-4 w-full max-w-sm backdrop-blur-xl">
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-2 rounded-lg text-white mt-1">
              <Zap size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{toast.title}</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{toast.body}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-gray-500 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default NotificationWidget;