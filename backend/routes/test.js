import express from "express";
import {shouldBeLoggedIn,shouldBeAdmin} from '../controllers/test_controller.js'
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();



router.get('/should-be-admin', verifyToken, shouldBeLoggedIn);

router.get('/should-be-logged-in', shouldBeAdmin);

export default router;
