import React, { useCallback, useEffect, useState } from 'react';
import { logCrashlyticsError } from '../firebaseConfig';

// This demo focuses on the React + UI flow. To turn this into a
// fully working FCM integration, wire it to the Firebase SDK and
// your service worker once you have real credentials.

function hasNotificationSupport() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

const NotificationDemo = () => {
  const [permission, setPermission] = useState(() => {
    if (!hasNotificationSupport()) return 'unsupported';
    return Notification.permission;
  });
  const [status, setStatus] = useState('Idle');

  const requestPermission = useCallback(async () => {
    if (!hasNotificationSupport()) {
      setStatus('Notifications are not supported in this browser.');
      return;
    }

    try {
      setStatus('Requesting notification permission...');
      const result = await Notification.requestPermission();
      setPermission(result);
      setStatus(`Permission status: ${result}`);
    } catch (error) {
      setStatus('Failed to request permission.');
      logCrashlyticsError(error, 'requestPermission');
    }
  }, []);

  const sendTestNotification = useCallback(() => {
    if (!hasNotificationSupport()) {
      setStatus('Notifications are not supported in this browser.');
      return;
    }

    if (permission !== 'granted') {
      setStatus('Permission not granted yet. Please allow notifications first.');
      return;
    }

    try {
      setStatus('Sending test notification...');
      // Foreground demo notification. Background delivery will be handled
      // by a service worker once FCM is fully wired.
      new Notification('DigitalBuzz Test Notification', {
        body: 'This is a demo notification from the React component.',
        icon: '/logo192.png',
      });
      setStatus('Test notification sent. Check your system notification area.');
    } catch (error) {
      setStatus('Failed to send notification.');
      logCrashlyticsError(error, 'sendTestNotification');
    }
  }, [permission]);

  useEffect(() => {
    // Example crash capture for unexpected runtime errors.
    const handleError = (event) => {
      logCrashlyticsError(event.error || event.message, 'window.onerror');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={requestPermission}
          className="inline-flex items-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-medium text-sky-950 shadow hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors"
        >
          Request Permission
        </button>
        <button
          type="button"
          onClick={sendTestNotification}
          className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-emerald-950 shadow hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors"
        >
          Test Notification
        </button>
      </div>
      <p className="text-xs font-mono text-slate-400 border border-slate-800/80 rounded-lg px-3 py-2 bg-slate-950/60">
        {status}
      </p>
      <p className="text-[11px] leading-relaxed text-slate-500">
        To complete full Firebase Cloud Messaging support (foreground + background),
        connect this component to your Firebase project, initialize Messaging in
        a service worker, and listen for `onBackgroundMessage` events.
      </p>
    </div>
  );
};

export default NotificationDemo;
