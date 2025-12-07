// Firebase configuration placeholder. Replace with your actual Firebase project settings.
// You can get these from the Firebase console under Project Settings > General > Your apps.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Small helper to show where Crashlytics logging would go.
export function logCrashlyticsError(error, context) {
  // TODO: Replace this with actual Firebase Crashlytics SDK calls when integrating for real.
  // For now, this keeps the demo self-contained without external keys.
  // Example (once Crashlytics is wired): crashlytics().recordError(error);
  // eslint-disable-next-line no-console
  console.error("[Crashlytics demo]", context || "Unhandled", error);
}
