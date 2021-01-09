
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
import { askForPermissioToReceiveNotifications } from '../../pushnotification';


export default function AdminHome() {
     useEffect(() => {
      askForPermissioToReceiveNotifications()

     },[])

    return (
        <div className="cont">
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

