import express from "express";
import { addMessage} from "../controllers/message_controller.js";
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router();

// Define routes
router.post('/addMessage/:id',verifyToken, addMessage);

export default router;
