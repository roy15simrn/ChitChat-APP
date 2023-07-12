const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
//const path= require('path');

require("dotenv").config();

app.use(cors());
app.use(express.json()); // parses json data



//CONNECTING TO MONGODB ///////////////
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
/////////////////////////////////////


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


//--------------------DEPLOYMENT-----------------------------------
// const __dirname = path.resolve();
// if(process.env.NODE_ENV==='production')
// {
//   app.use(express.static(path.join(__dirname1, "/public/build")));
// }
// else{
//   app.get("/",(req,res)=>{
//     res.end("API  is running successfully");
//   })
// }


//-----------------------------------------------------------------

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);


//INITIALISING SOCKET.IO  INSTANCE: this fn takes 2 argument/////
const io = socket(server, {
  cors: {
   // origin: "http://localhost:3000",
    origin: true,
    credentials: true,
  },
});
////////////////////////////////////////////////////////////////

//SETTING UP SOCKET.IO SERVER: {For managing user and message}
global.onlineUsers = new Map();              // global map for  storing online users
io.on("connection", (socket) => {            //Event handler is triggered when a new client connects to the Socket.IO server. T

  global.chatSocket = socket;                //socket can be used globally
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

});
//////////////////////////////////////////////////////////////
