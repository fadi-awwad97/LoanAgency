
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyB7_M9CcVenXbxv9IplfVSGEPAIr2wMOQs",
  authDomain: "loanagencyproject.firebaseapp.com",
  projectId: "loanagencyproject",
  storageBucket: "loanagencyproject.appspot.com",
  messagingSenderId: "924585448210",
  appId: "1:924585448210:web:9690fe6f1fbd4133a6d9cb",
  measurementId: "G-RY3XQNT3JP"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });