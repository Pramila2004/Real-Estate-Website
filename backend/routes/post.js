import express from "express";
import { createPost, getMyPosts, getPost, getPosts } from "../controllers/post_controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

// Define a route for the posts
router.post('/createPost',verifyToken,createPost );
router.get('/getPosts',getPosts );
router.get('/getPost/:id',getPost );
router.get('/getMyPosts/:id',verifyToken,getMyPosts );

export default router;
