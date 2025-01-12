import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: false,
        trim: true,

    },
    message:{
        type: String,
        required: true,
        trim: true,
    },
  },
  
  { timestamps: true }
);

// Define the model
const contactModel = mongoose.model("Contact", contactSchema);

// Export the model
export default contactModel;
