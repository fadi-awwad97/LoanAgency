import React from 'react';
import './homeFooter.css';
import {useHistory} from 'react-router-dom';

export default function HomeFooter() {

    const history = useHistory();

    function handleApply() {
        history.push("/applyHome");

    }

    return (
    <div className="homeFooter">
        <div className="apply-header">
            <h3>
            GET PRE-APPROVED
            </h3>
        </div>
        <button onClick={handleApply} className="apply-button">APPLY</button>
    </div>
    )
}
