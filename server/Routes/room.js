// Sa iyong router file (../Routes/room.js)
import express from "express";
import { createRoom, deleteRoom, roomMessages, setRoom} from '../Controllers/room.js';

const router = express.Router();

router.all('/:id', createRoom);

router.get('/setroom/:id',setRoom)

router.post('/deleteroom/:id',deleteRoom)

router.post('/messages/:id',roomMessages)

export default router;
