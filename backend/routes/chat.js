import express from "express";
import { getChats, getChat, addChat, readChat } from "../controllers/chat_controller.js";
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router();

// Define routes
router.get('/getchats',verifyToken, getChats);
router.get('/getchat/:id', verifyToken, getChat);
router.post('/addChat',verifyToken, addChat);
router.put('/read/:id',verifyToken, readChat);

export default router;
