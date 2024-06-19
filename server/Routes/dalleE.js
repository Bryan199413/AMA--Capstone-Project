import express from "express";
import { imageGenarate } from "../Controllers/dallE.js";

const router = express.Router();

router.post("/",imageGenarate);


export default router;
