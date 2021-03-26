import React,{useState,useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './agentChat.css'
export default function MessageBox(data) {

    const [reciever, setReciever] = useState("");

    useEffect(() => {
        setReciever(data.reciever)       
    },[data,reciever]);

    return (
        <div>
            {data.data.map((users,i)=>{
                if(users.sender.uid == reciever)
               return <ListItem  className="bubble2 bubble-bottom-right" key={i}><ListItemText align="left" >{users.text}</ListItemText> </ListItem>
                if(users.conversationId == "superhero2_user_"+reciever)
                return <ListItem className="bubble bubble-bottom-left" key={i}><ListItemText align="right" >{users.text}</ListItemText></ListItem>
           })}  

        </div>
    )
}
