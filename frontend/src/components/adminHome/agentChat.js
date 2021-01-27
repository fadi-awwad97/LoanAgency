import React ,{useState, useEffect} from 'react';
import { CometChat } from "@cometchat-pro/chat"
// import {CometChatUnified } from "./CometChat";
// import {CometChatUserListScreen } from "./lib/CometChat";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
import ChatIcon from '@material-ui/icons/Message';
import ChatIcon1 from '@material-ui/icons/Comment';
import Visibility from '@material-ui/icons/Visibility';
import './agentChat.css'
import MessageBox from './messageBox';
import Icon from '@material-ui/core/Icon';
// import backchat from '../../assets/backchat.jpg';


export default function AgentChat() {
// const authKey = "1f210b567aa2122a387b94a9accfc1588264d145";
const uid = "	SUPERHERO2";
const apiKey = "31615a2157bbda00c08c39d3caba8d3a93f80e78";
// const authToken ="ecommerce-agent4_16088144179c9abe2183372669a2ac0a4c8eab85";


const [messagetosend, setMessageToSend] = useState("");
const [arrmsg, setArrMsg] = useState([]);
const [loggedInUsers, setLoggedInUsers]= useState([]);
const [recieverClient,setRecieverClient]=useState("")
const [countUsers,setCountUsers]=useState("")

const [recievedmessage, setRecievedMessage] = useState("");
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '70vh',
      backgroundColor: 'white',
      borderRadius: "borderRadius",
      // marginBottom:'5px'
     
      
    },
    headBG: {
        backgroundColor: 'grey'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
        // backgroundColor:'#f2a365',
        backgroundColor:'rgb(124, 133, 216)',
        // backgroundImage: `url(${backchat})`,
        borderRadius: "2%"
    },
    messageArea: {
      height: '50vh',
      overflowY: 'auto',
      width:'100%',
      
      
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
              // handleLoggedInUsers();
              if(!loggedInUsers.includes(message.sender.uid))
              {
                setLoggedInUsers(loggedInUsers => [...loggedInUsers, message.sender.uid])
              }
                  
            }
          },[arrmsg])
         );


    });

    // useEffect(()=>{
    //   handleLoggedInUsers();
    // })


function handleSendmessage() {
  if(recieverClient === "")
  {
    var receiverID = recievedmessage.sender.uid ;
  }
  else{
    var receiverID=recieverClient;
  }
  
var receiverType = CometChat.RECEIVER_TYPE.USER;
var textMessage = new CometChat.TextMessage(receiverID, messagetosend, receiverType);

CometChat.sendMessage(textMessage).then(
  message => {
    console.log("Message sent successfully:", message);
    // Do something with message
    // setMessage(message)
    setArrMsg([...arrmsg,message]);
    setMessageToSend("");
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
          // setLoggedInUsers(userList)
          setCountUsers(userList.length)
        /* retrived list can be used to display contact list. */
        // console.log("honn " + loggedInUsers)
      },
      error => {
        console.log("User list fetching failed with error:", error);
      }
    );
}
function handleChooseUserToReply(users)  { 

    setRecieverClient(users)

}


    return (
        <div className="chattingComponent">
          <div className="chattingSection">
    
        <Grid  item xs={12}  container>
        <Grid  item  xs={3} >
          <Typography variant="h5" align="center" color="primary">Fly-Financial</Typography>
       
            </Grid>
            <Grid  item  xs={9} >
                <Typography variant="h5"  align="center" className="header-message">Chat With Your Customers</Typography>
            </Grid>
            <Grid  item  align="center" xs={3} >
            <Icon  color="primary">
          <ChatIcon/>
          </Icon>
            <Icon  color="primary">
          <ChatIcon1/>
          </Icon>
            </Grid>
            <Grid item xs={9} >
                <Typography variant="h5" align="center" className="header-message2">You Are Replying Now To {recieverClient}</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>       
            <Grid item xs={3} className={classes.borderRight500}>


               <Grid container>
                <List className="listofusers">
                {loggedInUsers.map((users, i) => {           
                       return   <ListItem selected button onClick={(event) => handleChooseUserToReply(users)}  key={i}>
                                <ListItemIcon>
                                <Avatar alt=" Sharp"  />
                                  </ListItemIcon>                                 
                                  <ListItemText align="left"> {users}</ListItemText>
                                  </ListItem>          
                     })}

                </List>
                </Grid>
               
                <Divider />
                <Divider />
                <Divider />
                <List>
                  <Typography style={{marginLeft:"20%"}}>Logged In Users : {countUsers} <Visibility onClick={handleLoggedInUsers}/></Typography>
                </List>
             </Grid>
              {/* <ListItemText > {users.uid}</ListItemText> */}

            <Grid item xs={9}>

                <List className={classes.messageArea}>
                <MessageBox data={arrmsg} reciever={recieverClient} />
                </List>

                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic" color="primary" value={messagetosend} label="Send a message" fullWidth onChange={(e) => setMessageToSend(e.target.value)}/>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"  onClick={handleSendmessage}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
 
      {/* <SnackBar reciever={recievedmessage}/> */}
      
</div>
    )
}
