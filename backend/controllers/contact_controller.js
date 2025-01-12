// controllers/contact_controller.js
import contactModel from "../models/contact.js";

const addContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new contactModel({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ success: true, message: 'Details submitted successfully!' });
  } catch (error) {
   
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};

export default addContact;
