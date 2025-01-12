import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user_controller.js";
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router();

// Define routes
router.get('/getUsers', getUsers);
router.get('/getuser/:id', verifyToken, getUser);
router.put('/updateUser/:id',verifyToken, updateUser);
router.delete('/deleteUser/:id',verifyToken, deleteUser);

export default router;
