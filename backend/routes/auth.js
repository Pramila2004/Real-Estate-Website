import express from "express";
import { register, login, logout } from "../controllers/auth_controllers.js";

const router = express.Router();

// Define routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
