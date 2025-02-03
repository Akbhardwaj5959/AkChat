import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { io } from "socket.io-client";
// ye socket name of client k liyye h
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000/"), []);

  const [sokectId, setsocketId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(""); //ye ek spesific room m msg bhejne k liye h


  const joinRoom = (e)=>{
    e.preventDefault()
    console.log({room}, "joined");
    socket.emit("join-room", {room});
    setRoom("");

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ message, room });
    //in order to send  a message to use emit
    socket.emit("message", { message, room });
    console.log("message sent");
    setMessage("");
  };

  // server exectly kaha per live h
  useEffect(() => {
    socket.on("connect", () => {
      setsocketId(socket.id);
      console.log(`connected  ${socket.id}`);
    });

    socket.on("forward-message", (data) => {
      // console.log(data.message);
      setMessages((messages) => [...messages, data.message]);
    });

    return ()=>{
      socket.disconnect();
    }
  }, []);
  return (
    <>
      <Container>

        


        <Typography variant="h3" component="h2">
          Welcome to the AkChat Client App
        </Typography>
        <Typography variant="h4" component="h5">
          socket Id {socket.id}
        </Typography>

        <form onSubmit={joinRoom}>
          <TextField onChange={(e)=>setRoom(e.target.value)}
            label= "Room Name"
            variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Join Room
            </Button>
        </form>

        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            id="outline-basic"
            label="Type a message"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            label="Room"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>

        <Stack>
          {messages.map((message, index) => (
            <Typography key={index} variant="h6" component="div" gutterBottom>
              {message}
            </Typography>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default App;
