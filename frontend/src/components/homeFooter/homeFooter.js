import React from 'react';
import './homeFooter.css';
import {useHistory} from 'react-router-dom';
import { CometChat } from "@cometchat-pro/chat"
export default function HomeFooter(data) {

    const history = useHistory();

    function handleApply() {
        history.push("/applyHome");
        
        // console.log(data.listenerID)
        // CometChat.removeLoginListener("SUPERHERO2");
        // console.log("done cleaned"+ data.listenerID)
    // CometChat.removeMessageListener(data.listenerID);
    // CometChat.logout().then({
    //     //Logout completed successfully
    // //   console.log("Logout completed successfully");
    // },error=>{
    //   //Logout failed with exception
    //   console.log("Logout failed with exception:",{error});
    // })
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
