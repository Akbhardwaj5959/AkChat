import { Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import {io} from 'socket.io-client';
// ye socket name of client k liyye h 
const App= ()=> {

  const socket = useMemo(()=>io('http://localhost:3000/'), []);

  const [sokectId, setsocketId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit= (e)=>{
    e.preventDefault();
    console.log(message);
    //in order to send  a message to use emit
    socket.emit("message", message);
    console.log("message sent")
    setMessage("");
  }


// server exectly kaha per live h 
  useEffect(()=>{
    socket.on("connect", ()=>{
      setsocketId(socket.id);
      console.log(`connected  ${socket.id}`);
    })

    socket.on("forward-message", (data)=>{
      console.log(data.message);
   });

  }, [])
  return (
    <>
     <Container>

      <Typography variant = "h3" component="h2">
        Welcome to the AkChat Client App
      </Typography>
      <Typography variant = "h4" component="h5">
        socket Id {socket.id}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField onChange={(e)=>setMessage(e.target.value)} id="outline-basic" label="Type a message" variant = "outlined" />
        <Button type="submit" variant="contained" color="primary" >
          Send
        </Button>
      </form>



     </Container>
     
    
    </>
  )
}

export default App
