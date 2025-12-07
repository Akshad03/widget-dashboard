import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { logCrashlyticsError } from '../firebaseConfig';

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
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      toast.info(`Permission: ${result}`);
    } catch (error) {
      toast.error('Failed to request permission');
    }
  }, []);

  const sendTestNotification = useCallback(() => {
    toast.success("DigitalBuzz test notification!");
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={requestPermission}
          className="inline-flex items-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-medium text-sky-950 shadow hover:bg-sky-400"
        >
          Request Permission
        </button>

        <button
          type="button"
          onClick={sendTestNotification}
          className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-emerald-950 shadow hover:bg-emerald-400"
        >
          Test Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationDemo;
