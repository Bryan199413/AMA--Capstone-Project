import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from './Routes/user.js'
import messageRoutes from './Routes/message.js'

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 4001;

dotenv.config();

app.use(express.json()); 
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/messages',messageRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`App running on port ${PORT}!`);
});

