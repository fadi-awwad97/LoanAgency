import React, {useState} from 'react'
import {
   Typography,
   Button
  } from "@material-ui/core"; 
  import Grid from '@material-ui/core/Grid';
  import TextField from '@material-ui/core/TextField';
  import './realUsersForm.css';
  import { makeStyles } from '@material-ui/core/styles';
  import axios from 'axios';
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  

export default function RealUsersForm({}) {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [startingDate, setStartingDate] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [totalPayment, setTotalPayment] = useState("");
  

    const classes = useStyles();
    console.log(startingDate);



    const handleSubmitData = async (e) => {
        e.preventDefault();
        
            const applyInfo = { firstname, lastname,address, phone, email ,startingDate,monthlyPayment,
                totalPayment   };
             axios.post(
                "http://localhost:5000/user/insertUser",
                applyInfo
              )  
              .then(function(response) {
                console.log(response.data)
                if (response.data==true) {
                  alert(firstname + 'Your request been added!');
                  // history.push("/")
                }
              })
      }






    return (
        <div className="realUserInputForm"> 
             <React.Fragment>
      <Typography variant="h6" color="primary" align="center" gutterBottom>
        Real User Entry
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            value={firstname}
            autoComplete="given-name"
            onChange={(e)=> setFirstName(e.target.value) }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            value={lastname}
            autoComplete="family-name"
            onChange={(e)=> setLastName(e.target.value) }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address Line "
            fullWidth
            value={address}
            autoComplete=" address-line"
            onChange={(e)=> setAddress(e.target.value) }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value) }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            value={phone}
            onChange={(e)=> setPhone(e.target.value) }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Starting Date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={startingDate}
        onChange={(e)=> setStartingDate(e.target.value) }
      />
    </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="onthlyPayment"
            name="monthlyPayment"
            label="Monthly Payment"
            fullWidth
            autoComplete="monthlyPayment"
            value={monthlyPayment}
            onChange={(e)=> setMonthlyPayment(e.target.value) }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="totalPayment"
            name="totalPayment"
            label="Total Payment"
            fullWidth
            autoComplete="totalPayment"
            value={totalPayment}
            onChange={(e)=> setTotalPayment(e.target.value) }
          />
        </Grid>
        <Grid>
            <div className="submitButton">
        <Button fullWidth
                color="primary"
                size="medium"
                variant="contained"
                onClick={handleSubmitData}
              >
                Submit
              </Button>
              </div>
            </Grid>
        </Grid>
       </React.Fragment>
        </div>
    )
}
