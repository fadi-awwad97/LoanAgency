import React from 'react';
import './homeFooter.css';
import {useHistory} from 'react-router-dom';


export default function HomeFooter(data) {

    const history = useHistory();

    function handleApply() {
        history.push("/applyHome");
    }
   
    return (
    <div className="homeFooter">
        <div className="apply-header">
            <h3>
            Apply Here
            </h3>
        </div>
        <button onClick={handleApply} className="apply-button">APPLY</button>
    </div>
    )
}
