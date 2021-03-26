import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Done from "@material-ui/icons/Mail";
import tableIcons from "./TableIcons.js";


export default function AdminHome(data0) {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
   
    useEffect(async () => {
        const result = await axios(
          'http://localhost:5000/user/getUserData',
        );     
        setData(result.data);
      },[data0]);

      //Send Email Function
      const sendEmail = async (email) => {
        const email1 = {email}
        axios.post('http://localhost:5000/user/sendEmail',email1)
        .then(function(response) {
           if (response.data ==='Email is sent') {
             alert("Email Is Sent")
           }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
     
    return (
             <div className="conta" >
        <MaterialTable
           title="Select row(s) to get the option to delete"
           onSelectionChange={rows => setChecked(rows)}

          columns={[
            { title: 'First Name', field: 'firstName'},
            { title: 'Last Name', field: 'lastName'},
            { title: 'Email', field: 'email'},
            { title: 'Phone', field: 'phone'},    
            { title: 'Client Salary', field: 'monthlySal'},
            { title: 'Working Experience', field: 'howLong'},
            { title: 'Loan Requested', field: 'loanOption'},                     
          ]}

        options={{
          selection: false,
          showSelectAllCheckbox: false,
          rowStyle: {
            backgroundColor: '#EEE',
          },
          headerStyle: {
            backgroundColor: '#4e89ae',
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
                   "http://localhost:5000/user/deleteUser",
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
              tooltip: "Send Email",
              onClick: (event, rowData) => (
              sendEmail(rowData.email)
              )
            },
        ]}
          data={data}
          title="CLIENTS APPLICATIONS"
        />
      </div>
     
    )
}