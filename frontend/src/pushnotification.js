import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyB7_M9CcVenXbxv9IplfVSGEPAIr2wMOQs",
    authDomain: "loanagencyproject.firebaseapp.com",
    projectId: "loanagencyproject",
    storageBucket: "loanagencyproject.appspot.com",
    messagingSenderId: "924585448210",
    appId: "1:924585448210:web:9690fe6f1fbd4133a6d9cb",
    measurementId: "G-RY3XQNT3JP"
  });
}
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}