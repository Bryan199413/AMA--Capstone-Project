import  path  from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from './Routes/user.js'
import messageRoutes from './Routes/message.js'
import roomRoutes from './Routes/room.js'
import friendRequestRoutes from './Routes/friendRequest.js'
import friendRoutes from './Routes/friend.js'
import dallERoutes from './Routes/dalleE.js'
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 4001;

dotenv.config();

const __dirname = path.resolve();

app.use(express.json()); 
app.use(cookieParser());

app.use(cors());
  
app.use('/api/users',userRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/rooms',roomRoutes)
app.use('/api/friendRequests',friendRequestRoutes);
app.use('/api/friends',friendRoutes);
app.use('/api/dallE',dallERoutes);

app.use(express.static(path.join(__dirname,"../client/dist")));

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../client","dist","index.html"))
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`App running on port ${PORT}!`);
});

