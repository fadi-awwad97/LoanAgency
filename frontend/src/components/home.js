import React, {useEffect, useState} from 'react';

import Toolbar from './toolbar/toolbar'
import HomeBody from './homeBody/homeBody';
import HomeFooter from './homeFooter/homeFooter';
import SecondHome from './secondHomeBody/secondHomeBody';
import Map from './map';

import { CometChat } from "@cometchat-pro/chat"
import {Widget, addResponseMessage, addUserMessage, dropMessages} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';


export default function Home() {


const authKey = "1f210b567aa2122a387b94a9accfc1588264d145";
// const uid = "ecommerce-agent4";
// const name = "Demo Agent4";
const name = "clients";
const apiKey = "31615a2157bbda00c08c39d3caba8d3a93f80e78";
const authToken="ecommerce-agent4_16088144179c9abe2183372669a2ac0a4c8eab85"
const uid= "user" +Math.floor(Math.random()*(999-100+1)+100);

const [messageRecieved, setMessageRecieved] = useState([]);





useEffect(() => {

  
    addResponseMessage("Hello Dear We Are Here to Help You")
  // 5ala2naaa l user hone 
    const user = new CometChat.User(uid);
  
    user.setName(name);
    
    CometChat.createUser(user, authKey).then(
      user => {
        console.log("user created", user);
      },error => {
        console.log("error", error);
      }
    );
    setTimeout(() => {
      CometChat.login(uid, apiKey).then(
        user => {
          console.log("Login Successful:", { user });    
        },
        error => {
          console.log("Login failed with exception:", { error });    
        }
      )
    }, 3000);

    return () => {
      
      CometChat.removeMessageListener(uid);
      CometChat.logout().then({
        //Logout completed successfully
    //   console.log("Logout completed successfully");
    },error=>{
      //Logout failed with exception
      console.log("Logout failed with exception:",{error});
    })
    dropMessages()
    }
    

  }, []);
  // window.onload = (event) => {
  //   // 5ala2naaa l user hone 
   
  //   const user = new CometChat.User(uid);
  
  //   user.setName(name);
    
  //   CometChat.createUser(user, authKey).then(
  //     user => {
  //       console.log("user created", user);
  //     },error => {
  //       console.log("error", error);
  //     }
  //   );
    // setTimeout(() => {
    //   CometChat.login(uid, apiKey).then(
    //     user => {
    //       console.log("Login Successful:", { user });    
    //     },
    //     error => {
    //       console.log("Login failed with exception:", { error });    
    //     }
    //   )
    // }, 3000);
 
// };

  useEffect(()=> {
    // console.log("hellooo")
    var listenerID = uid.toString();
    CometChat.addMessageListener(
      listenerID, 
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          // console.log("Message received successfully:", message);
          //  addResponseMessage(message.text)
          setMessageRecieved(...messageRecieved,message)
          // console.log(messageRecieved)
          addResponseMessage(message.text)
        }
      })
     );
    
  },[messageRecieved]);

  // CometChat.removeUserListener(listenerID);

function handleSendmessage(newMessage) {

    var receiverID = "SUPERHERO2";
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    
    var textMessage = new CometChat.TextMessage(receiverID, newMessage, receiverType);
    
    CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        // Do something with message
      },
      error => {
        console.log("Message sending failed with error:", error);
        // Handle any error
      }
    );
    
    }

    // function handletest() {
    //   console.log(messageRecieved);
    // }


//     window.addEventListener("beforeunload", (ev) => 
// {  
//     ev.preventDefault();
//     let listenerID=uid.toString();
//     CometChat.removeUserListener(listenerID);
  
// });
// window.onclose = closingCode;
// function closingCode(){
   
//   fetch("https://api-us.cometchat.io/v2.0/users/"+uid, {
//     "method": "DELETE",
//     "headers": {
//       "appId": "27600cf5c7008b6",
//       "apiKey": "31615a2157bbda00c08c39d3caba8d3a93f80e78",
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     "body": "{\"permanent\":true}"
//   })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.error(err);
//   });
//    return null;
// }


    return (
        <div> 
            <Toolbar />
            <HomeBody />
            {/* <HomeFooter listenerID={uid}/> */}
            <SecondHome />
            <Map />
            <Widget             
        handleNewUserMessage={handleSendmessage}
        title="Welcome To Fly Financial"
        subtitle="We Are Here To Help You"
        />
            </div>
    )
}
//