import React,{useState} from 'react';
import './homeBody.css';
import { useHistory } from "react-router-dom";
import { Button,Modal } from 'react-bootstrap';
import Calculator from '../calculator/Calculator';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


export default function HomeBody() {
    const history = useHistory();
    const [showHide, setShowHide] = useState(false);

    function handleFeature() {
        history.push("/calculator");
    }
    function handleModalShowHide() {
       setShowHide(!showHide)
    }
    return (
<div className="body">
    <div  className="container">
           
        <div className="main-block" >
          <h1 className="first-line">Know Your Payment ! Expect It</h1>
          <h3>----------------------------------</h3>
          <h5>Calculate Your Monthly Payment Using Our Loan Calculator !</h5>
          <h5 onClick={handleModalShowHide} className="last-line"><ArrowForwardIcon /> Click Here For More  <ArrowBackIcon/></h5>
      </div>
        <div className="side-block" >
            <h1 className="first-line">GET APPROVED For $5,000 – $5,000,000</h1>
            <br></br><br></br>
            <h5>Applying Takes Minutes. Very Fast Response.</h5>
            <h5>No Obligations.</h5>
            <h5 className="last-line2"> *Must Be A Lebanese Resident</h5>

        </div>


        <Modal show={showHide}>
                    <Modal.Header closeButton onClick={handleModalShowHide}>
                    <Modal.Title>Loan Calculator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                       
                       <Calculator />

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalShowHide}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleModalShowHide}>
                        Save Changes
                    </Button> */}
                    </Modal.Footer>
         </Modal>

    </div>
</div>
    )
}
