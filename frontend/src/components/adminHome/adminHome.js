import React,{useEffect,useState} from 'react';
import firebase from 'firebase';

import clsx from 'clsx';
import {  useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import './adminHome.css';
import User from "./clientsTable";
import ChatPage from './agentChat';
import RealUserForm from './realUsersForm';
import RealUserTable from './realUserTable';
import SwipeableViews from "react-swipeable-views";

import RealUserIcon from '@material-ui/icons/HowToReg';
import UniIcon from '@material-ui/icons/School';
import AppsIcons from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/QuestionAnswer';

import StudentTable from './studentsTable';
import BarChart from './barChart';
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
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import BarChartIcon from '@material-ui/icons/BarChart';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width:'70%'
  },
}));

export default function AdminHome() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [notficData,setnotficData]=useState([]);
  const [long,setLong]=useState([]);
  const [short,setShort]=useState([]);
  const [wedding,setWedding]=useState([]);
  const [student,setStudent]=useState([]);  
  const [activeStep, setActiveStep] = useState(0);
  const [open1, setOpen1] = useState(false);


     useEffect(() => {

       askForPermissioToReceiveNotifications()

     },[])
    
//Firebase Asks for permission to send notifications Once
     const askForPermissioToReceiveNotifications = async () => {
      try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('user token: ', token);
    
        //Once a request is sent , it is catched here (payload) 
        messaging.onMessage(function(payload){
          console.log('onMessage ', payload.notification.body)

          setnotficData(notficData => [...notficData, payload.notification.body]);

          if(payload.notification.title==="SHORT TERM LOAN"){
            setShort(short => [...short, payload.notification.body]);
          }
          if(payload.notification.title==="LONG TERM LOAN"){
            setLong(long => [...long, payload.notification.body]);
          }
          if(payload.notification.title==="Wedding LOAN"){
            setWedding(wedding => [...wedding,payload.notification.body])
            
          }
          if(payload.notification.title==="Loan"){
            setStudent(student =>[...student,payload.notification.body])
          }

        })
      }
      catch (error) {
        console.error(error);
      }
    }
  
  const handleChange = index => e => setActiveStep(index);

  const handleClickOpen = () => {
    setOpen1(true);
    console.log(notficData.length);
  };

  const handleClose = () => {
    setOpen1(false);
    setnotficData([])
    setShort([])
    setLong([])
    setWedding([])
    setStudent([])
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Fly Financial 
          </Typography>
          
        <IconButton style={{marginLeft:"80%"}} aria-label="show notifications" color="inherit">
        <Badge badgeContent={notficData.length} color="secondary">
        <NotificationsIcon onClick={handleClickOpen}/>
        <Dialog
        style={{marginLeft:'60%',marginTop:'-100px',width:'50%',height:'100%'}}
        open={open1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >{"New Applicantions !"}</DialogTitle>
        <DialogContent style={{marginLeft:'-17px'}}>
            {notficData.map((data,i)=>{
            return  <List  key={i}>
                      <ListItem style={{borderBottom:'1px solid blue'}}>
                        {data}
                      </ListItem>
                    </List>
            })}

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
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List >
       <ListItem autoFocus button onClick={(e)=>{setActiveStep(0)}} > <UniIcon fontSize="large" color="primary"/><Typography style={{marginLeft:"30px"}}>Students Table</Typography></ListItem>
       <ListItem button onClick={(e)=>{setActiveStep(1)}} style={{marginTop:"35px"}}> <AppsIcons fontSize="large" color="primary"/><Typography style={{marginLeft:"30px"}}>Clients Table</Typography> </ListItem>
       <ListItem button onClick={(e)=>{setActiveStep(2)}} style={{marginTop:"35px"}}> <ChatIcon fontSize="large" color="primary"/><Typography style={{marginLeft:"30px"}}>Chat Box</Typography></ListItem>
       <ListItem button onClick={(e)=>{setActiveStep(3)}} style={{marginTop:"35px"}}> <RealUserIcon fontSize="large" color="primary"/><Typography style={{marginLeft:"30px"}}>Daily Payments</Typography></ListItem>
       <ListItem button onClick={(e)=>{setActiveStep(4)}} style={{marginTop:"35px"}}> <BarChartIcon fontSize="large" color="primary"/><Typography style={{marginLeft:"30px"}}>Stats</Typography></ListItem>
        </List>
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SwipeableViews style={{width:"100%",height:"90%"}}  index={activeStep} onChangeIndex={handleChange}>
        
        <React.Fragment >
          <StudentTable student={student}/>
        </React.Fragment>

        <React.Fragment>
        <User short={short} long={long} wedding={wedding}/>
        </React.Fragment>

        <React.Fragment>         
        <ChatPage />      
        </React.Fragment>

        <React.Fragment>
        <RealUserForm />  <RealUserTable />
        </React.Fragment>
        
        <React.Fragment>
          <BarChart student={student} short={short} long={long} wedding={wedding}/>
        </React.Fragment>
        
        </SwipeableViews>

      </main>
    </div>
  );
}


