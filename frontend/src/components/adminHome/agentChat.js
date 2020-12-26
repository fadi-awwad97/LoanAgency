import React ,{useState, useEffect} from 'react';
import { CometChat } from "@cometchat-pro/chat"
// import {CometChatUnified } from "./CometChat";
// import {CometChatUserListScreen } from "./lib/CometChat";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MaterialTable from 'material-table';


export default function AgentChat() {
const authKey = "1f210b567aa2122a387b94a9accfc1588264d145";
const uid = "	SUPERHERO2";
const name = "Captain America";
const apiKey = "31615a2157bbda00c08c39d3caba8d3a93f80e78";
const authToken ="ecommerce-agent4_16088144179c9abe2183372669a2ac0a4c8eab85";

const [message, setMessage] = useState("");
const [messagetosend, setMessageToSend] = useState("");
const [arrmsg, setArrMsg] = useState([]);
const [time,setTime]= useState([])
const [loggedInUsers, setLoggedInUsers]= useState([])

const [recievedmessage, setRecievedMessage] = useState("");
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '90vh'
    },
    headBG: {
        backgroundColor: 'grey'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
  });
  
    const classes = useStyles();
  

useEffect(() => {


             
   CometChat.login(uid, apiKey).then(
    user => {
      console.log("Login Successful:", { user });    
    },
    error => {
      console.log("Login failed with exception:", { error });    
    }
  )
    },[]);



    useEffect(() => {
        var listenerID = "SUPERHERO2";
  
        CometChat.addMessageListener(
          listenerID, 
          new CometChat.MessageListener({
            onTextMessageReceived: message => {
              console.log("Message received successfully:", message);
              // Handle text message
              setRecievedMessage(message)
              setArrMsg([...arrmsg,message])
            //   setTime([...time,message.sentAt])
            var today = new Date(),
            time1 = today.getHours()-12 + ':' + today.getMinutes() + ':' + today.getSeconds();
            setTime([...time,time1]);         
            }
          })
         );


    });


function handleSendmessage() {
var receiverID = recievedmessage.sender.uid ;
// var receiverID = localStorage.getItem('user').toString();
var messageText = "ahla kifak";
var receiverType = CometChat.RECEIVER_TYPE.USER;

var textMessage = new CometChat.TextMessage(receiverID, messagetosend, receiverType);

CometChat.sendMessage(textMessage).then(
  message => {
    console.log("Message sent successfully:", message);
    // Do something with message
    // setMessage(message)
    setArrMsg([...arrmsg,message])
  },
  error => {
    console.log("Message sending failed with error:", error);
    // Handle any error
  }
);
}

function handleLoggedInUsers() {
let usersRequest = new CometChat.UsersRequestBuilder()
.setLimit(20)
.setStatus(CometChat.USER_STATUS.ONLINE)
.build()
    
    usersRequest.fetchNext().then(
      userList => {
        /* userList will be the list of User class. */
        console.log("User list received:", userList);
        setLoggedInUsers([...loggedInUsers,userList])
        /* retrived list can be used to display contact list. */
      },
      error => {
        console.log("User list fetching failed with error:", error);
      }
    );
}
function handles() {
    // console.log(loggedInUsers[[[0].uid]])
}


    return (
        <div>
          <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" align="center" className="header-message">Chat With Your Customers</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            {/* <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <button onClick={handleLoggedInUsers}>Get online users </button>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
            </Grid> */}
            <Grid item xs={3} className={classes.borderRight500}>
            <button onClick={handleLoggedInUsers}>Get online users </button>
            <button onClick={handles}>show me shaklo</button>
             <MaterialTable 
              title="USERS LIST HERE"

          columns={[
            { title: 'USERS LIST', field: 'uid'},
                     
          ]}
          data={loggedInUsers}
             
             />
             </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>

                            {arrmsg.map((x, i) => {
                               if(x.receiverId ==="superhero2"){ 
                                return  <ListItemText align="left" key={i} >{x.text} </ListItemText>                           
                               }
                               else 
                               return <ListItemText align="right" key={i} >{x.text}</ListItemText>
                            })}

                            {/* {time.map((hour, i) => {
                                
                            return <ListItemText align="left" key={i} >{hour}</ListItemText>

                            })} */}
                            
                               
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                    </ListItem>
                   
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic" label="Type Something" fullWidth onChange={(e) => setMessageToSend(e.target.value)}/>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={handleSendmessage}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  
</div>
    )
}
