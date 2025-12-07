import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

function hasNotificationSupport() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

const NotificationDemo = () => {
  const [permission, setPermission] = useState(() => {
    if (!hasNotificationSupport()) return 'unsupported';
    return Notification.permission;
  });

  const requestPermission = useCallback(async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      toast(result === "granted" ? "Permission granted" : "Permission denied");
    } catch (error) {
      toast.error("Error requesting notification permission");
    }
  }, []);

  const sendTestNotification = useCallback(() => {
    toast.success("DigitalBuzz Test Notification!");
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
