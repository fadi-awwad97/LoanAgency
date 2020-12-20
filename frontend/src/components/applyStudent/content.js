import React, { useState , useEffect} from "react";
import SwipeableViews from "react-swipeable-views";
import axios from 'axios';
import {
  Paper,
  // Grid,
  Typography,
  withStyles,
  Button,
  Radio
} from "@material-ui/core";
import WizardHeader from "./wizardHeader";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import {useHistory} from 'react-router-dom';



const style = theme => ({
  root: {
    border: `8px solid ${theme.palette.common.white}`,
    margin: 36,
    padding: "36px 0 0",
    background: `rgba(255,255,255,0.9)`,
    boxShadow: `1px -1px 1px ${
      theme.palette.primary.light
    },1px -1px 1px 1px rgba(255,255,255,0.6),1px 2px 25px 2px rgba(0,0,0,0.6)
    } `
  },
  navigation: {
    boxShadow: theme.shadows[10],
    width: 110,
    fontSize: 12,
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      width: 90
    }
  },
  prevBtn: {
    color: theme.palette.grey[700],
    background: theme.palette.common.white,
    boxShadow: theme.shadows[5]
  }
});
const Content = ({ classes }) => {
  
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const handleChange = index => e => setActiveStep(index);
  const nandleNext = () => setActiveStep(activeStep + 1);
  const nandlePrev = () => setActiveStep(activeStep - 1);
  const tabs = ["Personal", "University", "LoanAmount"];


  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState(false);


  const [universitiesname,setUniversitiesName]=useState([]);
  const [universityname,setUniversityName]=useState("");
  const [universityid,setUniversityId]=useState("");
  const [universitymajor,setUniversityMajor]=useState("");
  const [expectedyears,setExpectedYears]=useState("");
  

  const [neededamount,setNeededAmount]=useState("");
  // console.log(expectedyears)


  useEffect(async () => {
    const result = await axios(
      'http://universities.hipolabs.com/search?country=lebanon',
    );
 
      setUniversitiesName(result.data)
    // console.log(result.data)
  },[]);

  
  let universityList = universitiesname.map((item, i) => {
		return (
			<option key={i} value={item.name}>{item.name}</option>
		)
	}, this);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    
        const applyInfo = { firstname, lastname,address, phone, email ,
           working , universityname , universityid, universitymajor , expectedyears ,neededamount};
         axios.post(
            "http://localhost:5000/user/applyStudent",
            applyInfo
          )  
          .then(function(response) {
            console.log(response.data)
            if (response.data==true) {
              alert(firstname + 'Your request been added!');
              history.push("/")
            }
          })
  }

  return (
    <Paper style={{}} elevation={1} className={classes.root}>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ padding: "0 8px" }}
      >
        Fill this Form 
      </Typography>
      <Typography gutterBottom>
        Please be honest with your info 
      </Typography>
      <WizardHeader
        tabs={tabs}
        activeStep={activeStep}
        handleChange={handleChange}
      />

      <form>
        <SwipeableViews index={activeStep} onChangeIndex={handleChange}>
          {/* <View1 handleName={handleName}/> */}
            <div>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        YOUR PERSONAL INFO
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
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
            label="Last name"
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
            label="Address line "
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
            label="email"
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
            label="phone"
            fullWidth
            autoComplete="phone"
            value={phone}
            onChange={(e)=> setPhone(e.target.value) }
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="working" value={working} />}
            label="Currently Working"
            onChange={(e)=> setWorking(!working) }
          />
        </Grid>
      </Grid>
    </React.Fragment>
            </div>


          <div>
          <React.Fragment>
          {/* <Grid container spacing={0.5}> */}
             <Grid >
               <Typography variant="h6" gutterBottom>
                 CHOOSE YOUR UNIVERSITY
                 </Typography>
             <select 
             value={universityname}
             onChange={(e)=>setUniversityName(e.target.value)}>
               {universityList}
               
               </select>
               </Grid>
      <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
          <TextField
            required
            id="universityid"
            name="universityid"
            label="ID"
            fullWidth
            autoComplete="universityid"
            value={universityid}
            onChange={(e)=> setUniversityId(e.target.value) }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="universitymajor"
            name="universitymajor"
            label="MAJOR"
            fullWidth
            autoComplete="universitymajor"
            value={universitymajor}
            onChange={(e)=> setUniversityMajor(e.target.value) }
          />
        </Grid>
        <Grid item xs={8}><Typography>EXPECTED YEARS TO GRADUATE</Typography></Grid>  
        <Grid item xs={12} > 
        
        <RadioGroup row aria-label="position" name="position" defaultValue="3 Years" onChange={(e)=>setExpectedYears(e.target.value)}>
        <FormControlLabel
          value="3 Years"
          control={<Radio color="primary" />}
          label="3 Years"
          labelPlacement="top"
        />
        <FormControlLabel
          value="4 Years"
          control={<Radio color="primary" />}
          label="4 Years"
          labelPlacement="top"
        />
        <FormControlLabel
          value="5 Years"
          control={<Radio color="primary" />}
          label="5 Years"
          labelPlacement="top"
        />
        <FormControlLabel
          value="above"
          control={<Radio color="primary" />}
          label="above"
          labelPlacement="top" />
      </RadioGroup>

      </Grid>
        </Grid>

 
      
        </React.Fragment>
          </div>
          

          <div>
            <React.Fragment>
            <Typography variant="h6" gutterBottom>
        YOUR Requested Loan Amount $
      </Typography>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="neededAmount"
            name="neededAmount"
            label="----$"
            fullWidth
            value={neededamount}
            autoComplete="given-name"
            onChange={(e)=> setNeededAmount(e.target.value) }
          />

        </Grid>
          <Grid >
          <Typography variant="h6" gutterBottom>
        
        </Typography>
          <Button fullWidth
                fullWidth
                color="primary"
                className={classes.navigation}
                variant="contained"
                onClick={handleSubmitData}
              >
                Submit
              </Button>
          </Grid>

            </React.Fragment>
          </div>
        </SwipeableViews>
        <Grid
          container
          justify="space-between"
          style={{ padding: "16px 16px" }}
        >
          <Grid item>
            <Button
              disabled={activeStep === 0}
              onClick={nandlePrev}
              variant="contained"
              color="default"
              className={`${classes.navigation} ${classes.prevBtn}`}
            >
              Back
            </Button>
          </Grid>
          {activeStep < tabs.length - 1 && (
            <Grid item>
              <Button
                color="primary"
                className={classes.navigation}
                variant="contained"
                onClick={nandleNext}
              >
                Next
              </Button>
            </Grid>
          )}
          {/* {activeStep === tabs.length - 1 && (
            <Grid item>
              <Button
                color="primary"
                className={classes.navigation}
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          )} */}
        </Grid>
      </form>
    </Paper>
  );
};
export default withStyles(style)(Content);
