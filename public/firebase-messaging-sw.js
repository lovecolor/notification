
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBMbnoaA8epWIonNOmG8PsPECzQpknFyg4",
  authDomain: "push-notification-c78fc.firebaseapp.com",
  projectId: "push-notification-c78fc",
  storageBucket: "push-notification-c78fc.appspot.com",
  messagingSenderId: "944422895422",
  appId: "1:944422895422:web:2b3fc13589858211eff66f"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  
  // Customize notification here
  const notificationTitle = payload.notificatoin.title;
  const notificationOptions = {
    body: payload.notificatoin.body,
  
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

