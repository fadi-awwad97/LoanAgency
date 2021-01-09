import React, { useEffect } from 'react';
import { askForPermissioToReceiveNotifications } from './pushnotification';
// class App extends Component {
//   render() {

 

//     return (
//       <div className="App">
       
//         <button onClick={askForPermissioToReceiveNotifications} >
//           Click here to receive notifications
//        </button>

//       </div>
//     );
//   }
// }
// export default App;



export default function Test() {

  // useEffect(()=>{
    function handle() {
    var key = 'AAAA10WWUxI:APA91bHlPzmRRieNQC2o-rt85i7zNa4Er35GIWbWTXnoPqxnooYY4TH7F34_3B2P2gN528BhNKYkGXeKtft44zfYvMT51x6N1KP-EYCUDLSrgNzwd8engzX8YLq3i9wqTW9Tqq_qnF8I';
var to = '  cHsEyq8wt5K2ERuvrgi75O:APA91bFlXQowRYOwoCPKlQhI5WUDmvs2cEsn4e4KoVxbYJiNhygWPqMobP-qGdPxL0NxOmkxavJ5ArUnVMKbXKkEEdgqCVSYCXT78TAnr4u63SZD9mhTMeqfAcN7ahJU5SbrMxzxZ1Vh';
var notification = {
  'title': 'Portugal vs. Denmark',
  'body': '5 to 1',
  'icon': 'firebase-logo.png',
  'click_action': 'http://localhost:8081'
};

fetch('https://fcm.googleapis.com/fcm/send', {
  'method': 'POST',
  'headers': {
    'Authorization': 'key=' + key,
    'Content-Type': 'application/json'
  },
  'body': JSON.stringify({
    'notification': notification,
    'to': to
  })
}).then(function(response) {
  console.log(response);
}).catch(function(error) {
  console.error(error);
})
  }

  return (
    <div>
         <button onClick={askForPermissioToReceiveNotifications} >
           Click here to receive notifications
          </button>

          <button onClick={handle} >
           jiba
          </button>
    </div>
  )
}




// var key = 'AAAA10WWUxI:APA91bHlPzmRRieNQC2o-rt85i7zNa4Er35GIWbWTXnoPqxnooYY4TH7F34_3B2P2gN528BhNKYkGXeKtft44zfYvMT51x6N1KP-EYCUDLSrgNzwd8engzX8YLq3i9wqTW9Tqq_qnF8I';
// var to = '924585448210';
// var notification = {
//   'title': 'Portugal vs. Denmark',
//   'body': '5 to 1',
//   'icon': 'firebase-logo.png',
//   'click_action': 'http://localhost:8081'
// };

// fetch('https://fcm.googleapis.com/fcm/send', {
//   'method': 'POST',
//   'headers': {
//     'Authorization': 'key=' + key,
//     'Content-Type': 'application/json'
//   },
//   'body': JSON.stringify({
//     'notification': notification,
//     'to': to
//   })
// }).then(function(response) {
//   console.log(response);
// }).catch(function(error) {
//   console.error(error);
// })