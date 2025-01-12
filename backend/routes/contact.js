import express from "express";
import addContact from '../controllers/contact_controller.js'

const router = express.Router();

router.post('/addContact', addContact);


export default router;
