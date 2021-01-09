import React,{useState,useEffect} from 'react';
import './realUserTable.css';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles({

  root: {
    width: '45%',
    float:'right',
    marginRight:'3.6%',
    marginTop:'2%',
    border:'1px solid red',
    height:'400px'
    
    
  
  },
});


export default function RealUserTable() {
  const classes = useStyles();

  const [data, setData] = useState([]);


  useEffect(async () => {
    const result = await axios(
      'http://localhost:5000/user/getRealUserData',
    );
        

    setData(result.data);
    
  }, []);

  function handleSetPaid(user) {
      console.log(user)
   
    

    axios.put('http://localhost:5000/user/updateRealUserData',user)
    .then(function(response) {
      // console.log(response.data);
    //    if (response.data ==='Email is sent') {
    //      alert("email is sent")
    //    }
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  
  return (

    <div className={classes.root}>
      <h1 style={{textAlign:"center", color:"blue",borderRadius:"15%"}}>Today Due Payments</h1>
        {data.map((user,i)=>{           
return   <Accordion key={i}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={user.firstname}
            // label={user.lastname }
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'} color="textSecondary">
            <List style={{float:'left'}}>
                <ListItem>firstName: {user.firstname}</ListItem>
                <ListItem>lastName: {user.lastname}</ListItem>
                <ListItem>MonthlyPayment: {user.monthlyPayment}</ListItem>
            </List>   
            <List style={{float:'right'}}> 
                <ListItem>Phone Number: {user.phone}</ListItem>
                <ListItem>Total Payment: {user.totalPayment}</ListItem>
                <button onClick={(e)=>{handleSetPaid(user)}} style={{width:'250px'}}>Paid</button>
            </List> 
          </Typography>
        </AccordionDetails>
      </Accordion> 
     
     })}
    </div>
  );
}
