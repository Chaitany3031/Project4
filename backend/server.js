require("dotenv").config();
const app = require("./src/app");
// in socket.io we have two events conection events and disconnect event

const { createServer } = require("http");

const { Server } = require("socket.io"); //event based communication

const generateResponse = require("./src/services/ai.services");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors:{
    origin:"http://localhost:5173"
  }
});

const chatHistory = [
];

io.on("connection", (socket) => {
  // io = whole server , socket = single server
  // ...
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnects");
  });

  // socket.on('ai-message',async (data)=>{
  //   console.log("Received message: ",data.prompt)
  //   const respone = await generateResponse(data.prompt)
  //   console.log("AI response: ",respone);
  //   socket.emit("ai-message-reponse",{respone})
  // })

  socket.on("ai-message", async (data) => {
    console.log("Recieved message:", data);
    chatHistory.push({
      role:"user",
      parts:[{
        text:data
      }]
    })
    const res = await generateResponse(chatHistory);
    chatHistory.push({
      role:'model',
      parts:[{
        text:res
      }]
    })
    console.log("AI res:", res);
    socket.emit("ai-message-reponse", res);
  });

  socket.on("kaveri", (data) => {
    console.log("A user exists");
    console.log(data);
  });
});

httpServer.listen(3000);

// io - server
// socket - single user
// on - listen to an event
// emit - send an event
// socket io provides event driven communication
