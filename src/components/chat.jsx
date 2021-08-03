import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './../styles/chat.css';
const Chat = (props) => {
    const socket = io("https://minhaj-bloodbank.herokuapp.com")
    var {dataEmail , dataName , userEmail , userName } = props.location.state;
   dataEmail = dataEmail.split('.')[0] + dataEmail.split('.')[1];
   userEmail = userEmail.split('.')[0] + userEmail.split('.')[1];
   const [merge,setMerged] = useState('');
   const [msg,setMsg] = useState('');
   const [allMsg,setAllMsg] = useState([]);
   useEffect(()=>{
    const merged =async ()=>{
        if(dataEmail > userEmail){
            setMerged(dataEmail+userEmail)
        }
        else{
            setMerged(userEmail+dataEmail)
        }
        socket.emit('RoomJoin',{merge})
        socket.on('getMsgs',(data)=>{
            setAllMsg(data)
        })
    }
    merged();
},[merge])

   const sendMsg=()=>{
        socket.emit("sendMsg",{merge , msg , sender:userName , senderEmail : userEmail})
        setMsg('');
    }

    const deleteThis=key=>{
        console.log(key)
        socket.emit('deleteThis',{key,merge})
    }

    return ( 
        <div className="msg_main">
            <div className="msg_box">
                <div className="allMsgs">
            {
                allMsg &&
                allMsg.map(v=>{
                    return(
                        <div key={v._id}
                        className={userEmail==v.senderEmail ? "selfMsg" : "othersMsg"}
                        ><p>
                            {v.msg}
                        {
                            userEmail==v.senderEmail &&
                            <button className="DltBtn"
                            onClick={()=>deleteThis(v._id)}>-</button>
                        }
                        </p>
                            </div>
                        )
                    })
                }
                </div>
            <div className="input_btn">
            <input type="text" value={msg} onChange={e=>setMsg(e.target.value)}/>
            <button onClick={()=>sendMsg()}>Send</button>
            </div>
            </div>
        </div>
     );
}
 
export default Chat;