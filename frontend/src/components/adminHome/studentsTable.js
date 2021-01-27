
import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Done from "@material-ui/icons/Mail";
import tableIcons from "./TableIcons.js";
import './adminHome.css';


export default function StudentsTable(data0) {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    
  
 
    useEffect(async () => {
        const result = await axios(
          'http://localhost:5000/user/getStudentData',
        );
     
        setData(result.data);

      },[data0]);



      const sendEmail = async (email) => {
        // e.preventDefault();
        const email1 = {email}
        axios.post('http://localhost:5000/user/sendEmail',email1)
        .then(function(response) {
          // console.log(response.data);
           if (response.data ==='Email is sent') {
             alert("Email Is Sent")
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
                    { title: 'Last Name', field: 'lastname'},
                    { title: 'Phone', field: 'phone'},    
                    { title: 'Email', field: 'email'},
                    { title: 'Currently Working', field: 'working'},
                    { title: 'University Name', field: 'universityname' },
                    { title: 'University Id', field: 'universityid' },
                    { title: 'University Major', field: 'universitymajor'},
                    { title: 'Expected Years', field: 'expectedyears' },
                    { title: 'Needed Amount', field: 'neededamount' }, 
                            
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
                    tooltip: "Send Email",
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
