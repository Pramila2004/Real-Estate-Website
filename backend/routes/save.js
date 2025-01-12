import express from "express";
import { getSavedPosts, savePost } from "../controllers/save_controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Define routes
router.post('/savePost',verifyToken, savePost);
router.get('/getSavedPosts',verifyToken, getSavedPosts);


export default router;
