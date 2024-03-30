// Sa iyong router file (../Routes/room.js)
import express from "express";
import { createRoom, getRoom } from '../Controllers/room.js';

const router = express.Router();

router.all('/:id', createRoom);

router.get('/getroom/:id',getRoom)

export default router;
