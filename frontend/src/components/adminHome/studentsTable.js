
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
import { askForPermissioToReceiveNotifications } from '../../pushnotification';

export default function StudentsTable() {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [items, setItems] = useState([]);
  
 
    useEffect(async () => {
        const result = await axios(
          'http://localhost:5000/user/getStudentData',
        );
     
        setData(result.data);
        // askForPermissioToReceiveNotifications();
        // console.log(data)
      },[]);



      const sendEmail = async (email) => {
        // e.preventDefault();
        const email1 = {email}
        axios.post('http://localhost:5000/user/sendEmail',email1)
        .then(function(response) {
          // console.log(response.data);
           if (response.data ==='Email is sent') {
             alert("email is sent")
           }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
     
    return (
        <div>
            

                    <div className="conta" id="StudentApp" >
                    <MaterialTable
                    title="Select row(s) to get the option to delete"
                    onSelectionChange={rows => setChecked(rows)}

                    columns={[
                    { title: 'First Name', field: 'firstname'},
                    { title: 'last Name', field: 'lastname'},
                    { title: 'Phone', field: 'phone'},    
                    { title: 'Email', field: 'email'},
                    { title: 'working', field: 'working'},
                    { title: 'universityname', field: 'universityname' },
                    { title: 'universityid', field: 'universityid' },
                    { title: 'universitymajor', field: 'universitymajor'},
                    { title: 'expectedyears', field: 'expectedyears' },
                    { title: 'neededamount', field: 'neededamount' }, 
                            
                    ]}

                    options={{
                    selection: false,
                    showSelectAllCheckbox: false,
                    // actionsColumnIndex: -1
                    rowStyle: {
                    backgroundColor: '#EEE',
                    },
                    headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                    }

                    }}
                    icons={tableIcons}

                    editable={{

                    onRowDelete: (oldData) =>
                    
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;

                        const deleteInfo = { oldData };
                        axios.post(
                        "http://localhost:5000/user/deleteStudent",
                        deleteInfo
                        )  
                        .then(res => console.log(res.data))
                        dataDelete.splice(index, 1);
                        setData([...dataDelete]);

                        resolve()
                    }, 1000)
                    }),

                    }}

                    actions={[
                    {
                    icon: () => <Done />,
                    tooltip: "Send EMAIL",
                    onClick: (event, rowData) => (
                    sendEmail(rowData.email)
                    )
                    },
                    ]}
                    data={data}
                    title="STUDENTS APPLICATIONS"
                    />
                    </div>


        </div>
    )
}