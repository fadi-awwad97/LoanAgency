
import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Done from "@material-ui/icons/Mail";
import tableIcons from "./TableIcons.js";
import './adminHome.css';
import User from "./clientsTable";
import ChatPage from './agentChat';
import RealUserForm from './realUsersForm';
import RealUserTable from './realUserTable';

import RealUserIcon from '@material-ui/icons/HowToReg';
import UniIcon from '@material-ui/icons/School';
import AppsIcons from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import {Link} from 'react-scroll';
import StudentTable from './studentsTable';
import BarChart from './barChart';
// import { askForPermissioToReceiveNotifications } from '../../pushnotification';
// import { initializeFirebase } from '../../pushnotification';//mesh 3atol
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'rgb(214, 214, 214)'
  },
  title: {
    flexGrow: 1,
    marginLeft:'10%'
  },
}));

export default function AdminHome() {
  const [notficData,setnotficData]=useState([]);
  const [long,setLong]=useState([]);
  const [short,setShort]=useState([]);
  const [wedding,setWedding]=useState([]);
  const [student,setStudent]=useState([]);
  const classes = useStyles();

     useEffect(() => {
      // initializeFirebase();
       askForPermissioToReceiveNotifications()
  
      

     },[])
    

     const askForPermissioToReceiveNotifications = async () => {
      try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('user token: ', token);
        // return token;
    
        messaging.onMessage(function(payload){
          console.log('onMessage ', payload.notification.body)

          
          setnotficData([...notficData,payload.notification.body])

          if(payload.notification.body==="SHORT TERM LOAN"){
            setShort([...short,payload.notification.body])
          }
          if(payload.notification.body==="LONG TERM LOAN"){
            setLong([...long,payload.notification.body])
          }
          if(payload.notification.body==="Wedding LOAN"){
            setWedding([...wedding,payload.notification.body])
          }
          if(payload.notification.body==="Loan"){
            setStudent([...student,payload.notification.body])
          }

        })
      }
      catch (error) {
        console.error(error);
      }
    }

  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setnotficData([])
    setShort([])
    setLong([])
    setWedding([])
  };
  // const handleGetnotificationInfo = (data) =>{

  // }

    return (
        <div className="cont">
      <AppBar position="static" style={{backgroundColor:'rgb(35, 76, 165)'}}>
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            FLY FINANCIAL 
          </Typography>
          <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={notficData.length} color="secondary">
                <NotificationsIcon onClick={handleClickOpen}/>
                <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >{"New Applicants Just Arrived !"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText > */}
            {/* {notficData.map((data,i)=>{
            return  <List key={i}>
                      <ListItem>

                      </ListItem>
                    </List>
            })} */}
                   <List >
                      <ListItem>Short Term Loan : {short.length}</ListItem>   
                      <ListItem>Long Term Loan : {long.length}</ListItem>
                      <ListItem>Wedding Loan : {wedding.length}</ListItem>
                      <ListItem>Student Loan : {student.length}</ListItem>
                    </List>
              
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
              </Badge>
            </IconButton>
        </Toolbar>
      </AppBar>
           <div className="sidebar">
 

            <li>
              <Link activeClass="active" to="StudentApp" spy={true} smooth={true}> <UniIcon fontSize="large"/> </Link>
            </li>

            <li>
            <Link  to="Apps" spy={true} smooth={true}><AppsIcons fontSize="large"/></Link>
            </li>


            <li>
            <Link  to="Chat" spy={true} smooth={true}>< ChatIcon fontSize="large"/></Link>
            </li>

            <li>
            <Link  to="realUser" spy={true} smooth={true}><RealUserIcon fontSize="large" /></Link>
            </li>

            </div>
            
      <div id="StudentApp">
        <StudentTable/>
      </div>
      <div id="Apps">
      <User />
      </div>
      <div id="Chat">
      <ChatPage />
      </div>
      <div id="realUser">
      <RealUserForm />
      </div>
      <div>
      <RealUserTable />
      </div>
      <br></br>
      <div >
        <BarChart />
      </div>
      
        
        </div>
    )
}

