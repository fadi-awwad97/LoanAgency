import firebase from 'firebase';
import Alert from '@material-ui/lab/Alert';

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
    // return token;

    messaging.onMessage(function(payload){
      console.log('onMessage ', payload)
      // return <Alert severity="info">New Application — check it out!</Alert>
      // console.log("woslet message yaho")
    })
  }
  catch (error) {
    console.error(error);
  }
}