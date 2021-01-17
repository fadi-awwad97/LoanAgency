import React, { Fragment } from 'react';
import './applyHome.css';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaUserGraduate } from 'react-icons/fa';
import {useHistory} from 'react-router-dom';



export default function ApplyHome() {
  const history = useHistory();


  function handleApply() {
    history.push("/applyPg");
  }
  function handleApplyStudent() {
    history.push("/applyStudent");
  }
    return (
      
      <div className="contain">
      <div className="content"> 
      <div className="content-body">
      <h1 className="first-line">ARE YOU A STUDENT ?</h1>
          <div>---------------------------<h1> <FaUserGraduate /> </h1> --------------------------</div> 
          <h5>Searching for settling University Fees !! You are in the right place !</h5>
          <button className="applyStudent" onClick={handleApplyStudent}>APPLY HERE</button>
      </div>
       </div>
       <div className="content2">
       <div className="content-body2">
           <h1 className="first-line">Multiple Funding Options </h1>
           <h2> <GiReceiveMoney/> </h2>
          <h3>----------------------------------</h3>
          <h3>We Provide the Best Rates And Terms Possible</h3>        
          <h3>----------------------------------</h3>
          <h5> LONG TERM, SHORT TERM and WEDDING LOANS</h5>
          <h3>----------------------------------</h3>
          <button onClick={handleApply} className="applyStudent">APPLY HERE</button>
          </div>
          </div>
    
    <div className="diagonal-box1"></div>
    </div>
    
    )
}
