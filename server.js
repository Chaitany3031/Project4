require('dotenv').config()
const { log } = require('console');
const app = require('./src/app')
// in socket.io we have two events conection events and disconnect event


const { createServer } = require("http");

const { Server } = require("socket.io");//event based communication

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {// io = whole server , socket = single server
  // ...
  console.log('user connected');

  socket.on('disconnect',()=>{
    console.log('A user disconnects');
    
  })

  socket.on('kaveri',(data)=>{
    console.log('A user exists');
    console.log(data);
    
    
  })
  
});

httpServer.listen(3000);