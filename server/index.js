import express from 'express';
const app = express();
import {createServer} from 'http';
//implement socket.io on top of http
const server = createServer(app);
// secure server using handshake
import {Server} from 'socket.io';
// socket.io's server instance is used for creating  a new connection
import cors from 'cors';

// socket server on top of http server
//along with implemetation of cors for server protaction
const  io = new Server(server, {
    cors:{
        origin:'*',  //allow all origins
        methods: ["GET", "POST"]
    }
});

// socket.io middlewear  for implement the handshake lisinging part client ka 
io.use((socket, next)=>{
    next();
});


// socket.io connection event client ko sunna h yaha se
io.on('connection', (socket)=>{
     console.log(`user has been connecting ${socket.id}`);

     // ye message humare server per aagya h 
     socket.on("message", (data)=>{
        console.log(data);
        socket.broadcast.emit("forward-message", {message:data});
     });
     
});

// app.use(cors());

//dot env
import dotenv from 'dotenv';
dotenv.config();

app.get("/", (req,res)=>{
    res.status(200).send("Wlcome to the AkChat");
});

// const port = process.env.PORT || 5000;

server.listen(process.env.PORT, ()=>{

    try{
    console.log(`server is running on that this port ${process.env.port}`);
    }
    catch(err){
        console.log(err);
    }
});