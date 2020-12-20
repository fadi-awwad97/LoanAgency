import React from 'react'
import './secondHomeBody.css';
import shortTerm from '../../assets/short.png';
import student from '../../assets/student.jpg';
import wedding from '../../assets/wedding.jpg';
import longTerm from '../../assets/longTerm1.jpg';
export default function secondHomeBody() {
    return (
    <div>

        <div className="first-icon">
            <img
            className="shortTerm-icon"
            alt="short"
            src={shortTerm} />
            <h4>SHORT-TERM LOAN</h4>
        </div>

        <div className="second-icon">
            <img
            className="shortTerm-icon"
            alt="short"
            src={student} />
            <h4>STUDENT LOAN</h4>
        </div>
        <br></br>

        <div className="third-icon">
            <img
            className="shortTerm-icon"
            alt="short"
            src={wedding} />
            <h4 style={{marginLeft:"20px"}}>WEDDING LOAN</h4>
        </div>

        <div className="fourth-icon">
            <img
            className="shortTerm-icon"
            alt="short"
            src={longTerm} />
            <h4>LONG-TERM LOAN</h4>
        </div>

    </div>
    )
}
