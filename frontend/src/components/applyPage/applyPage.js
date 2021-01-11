import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Image from '../../assets/apply-bg.jpg';
import './applyPage.css';
import {useHistory} from 'react-router-dom';





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    // overflow:'hidden',
    // height: '25vh',
    // width: 'calc(20vw * 0.54 - 2%)',
    // borderRadius: 8,
    display: 'flex',
    // marginLeft: '10px',
    // marginTop: '10px'

  },
  stepper: {
    backgroundColor:'rgba(140, 140, 140, 0.5)',
    // backgroundColor:'grey',
    
  },


  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    backgroundColor:'rgba(126, 118, 128, 0.3)',
    alignContent:'center',
    height:'580px',
    textAlign:'center'
    
  
  },
  button1: {
    marginTop: '200px',
    backgroundColor:'#3f51b5',
    width:'100%',
  }
}));




export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlySal, setMonthlySal] = useState("");
  const [howLong, setHowLong] = useState("");
  const [loanOption, setLoanOption] = useState("SHORT TERM LOAN");
  const history= useHistory();


  // useEffect(() => {
  //   askForPermissioToReceiveNotifications();
  // }, [])
  
  function getSteps() {
    return ['1', '2', '3','4','5','6'];
  }
    

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
        const applyInfo = { firstName, lastName, email, phone , monthlySal, howLong , loanOption };
         Axios.post(
            "http://localhost:5000/user/apply",
            applyInfo
          );  



          var key = 'AAAA10WWUxI:APA91bHlPzmRRieNQC2o-rt85i7zNa4Er35GIWbWTXnoPqxnooYY4TH7F34_3B2P2gN528BhNKYkGXeKtft44zfYvMT51x6N1KP-EYCUDLSrgNzwd8engzX8YLq3i9wqTW9Tqq_qnF8I';
          var to = ' cHsEyq8wt5K2ERuvrgi75O:APA91bFlXQowRYOwoCPKlQhI5WUDmvs2cEsn4e4KoVxbYJiNhygWPqMobP-qGdPxL0NxOmkxavJ5ArUnVMKbXKkEEdgqCVSYCXT78TAnr4u63SZD9mhTMeqfAcN7ahJU5SbrMxzxZ1Vh';
          // var to ="924585448210"
          var notification = {
            'title': 'A Client Applied To',
            'body': loanOption,
            
          };
          
          fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
              'Authorization': 'key=' + key,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
              'notification': notification,
              'to': to
            })
          }).then(function(response) {
            console.log(response);
          }).catch(function(error) {
            console.error(error);
          })
         
            



          history.push("/")
  }
  function handle() {
    // 'icon': 'firebase-logo.png',

  }



  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
        <div>
          <Form.Group className="formGroup" size="lg" >
          <Form.Label>Name</Form.Label>
          <Form.Control
              autoFocus
              type="text"
              value={firstName}
              placeholder="First Name"

              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control
              autoFocus
              type="text"
              value={lastName}
              placeholder="last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </div>)
      case 1:
        return    (<div>
        <Form.Group className="formGroup" size="lg" controlId="email">
        <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </div>)
      case 2:
        return (<div>
            <Form.Group className="formGroup" size="lg" >
            <Form.Label>Phone</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={phone}
                placeholder="+961-"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </div>
          )

    case 3:
            return (<div>
            <Form.Group className="formGroup" size="lg" >
            <Form.Label>MONTHLY SALARY</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={monthlySal}
                placeholder="Y000 $"
                onChange={(e) => setMonthlySal(e.target.value)}
              />
            </Form.Group>
          </div>
          )  
          case 4:
            return (<div>
            <Form.Group className="formGroup" size="lg" >
            <Form.Label >HAVE BEEN WORKING</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={howLong}
                placeholder="X years"
                onChange={(e) => setHowLong(e.target.value)}
              />
            </Form.Group>
          </div>
          ) 
          case 5:
            return (<div>
            <Form.Group className="formGroup" size="lg" >
            <Form.Label>Loan Option You are interested IN</Form.Label>
            <Form.Control 
            className="selectInput"
             value={loanOption} 
             onChange={(e) => setLoanOption(e.target.value)} as="select" custom>
              <option>SHORT TERM LOAN</option>
              <option>LONG TERM LOAN</option>
              <option>Wedding LOAN</option>
            </Form.Control>
            </Form.Group>
          </div>
          )   
      default:
        return 'Unknown step';
    }
  }

  return (
    
     <div className={classes.root}>
       {/* <button onClick={handle}>click me</button> */}
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper} >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography component={'span'}>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={3} className={classes.resetContainer}>
          <Typography>ALL STEPS COMPLETED - YOU&apos;RE FINISHED</Typography>
          <Typography>SUBMIT YOUR DATA PLEASE</Typography>
        <Button onClick={handleSubmit} className={classes.button1}>
            Submit
          </Button>
        </Paper>
      )}
          <Paper elevation={7}style={{opacity:0.8,height:'100%',margin:'200px',borderRadius:'30px',padding:'10px'}}>
          <Typography style={{backgroundColor:'rgb(35, 76, 165)'}} align="center">My Info</Typography>
        <Typography>My Name :{firstName}</Typography>
        <Typography>Sur Name :{lastName}</Typography>
        <Typography>Email :{email}</Typography>
        <Typography>Phone :{phone}</Typography>
        <Typography>Monthly Salary :{monthlySal}</Typography>
        <Typography>Working Years :{howLong}</Typography>
        <Typography>Loan Type:{loanOption}</Typography>
        </Paper>

    </div>

  );
}