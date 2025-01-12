import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
    },
    price: {
      type: String, 
      required: true,
      min: 0, 
    },
    images: {
      type: [String], 
      default: [], 
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    bedroom: {
      type: String, 
      min: 0,
      default: 0, 
    },
    bathroom: {
      type: String, 
      min: 0,
      default: 0, 
    },
    type: {
      type: String, 
      default:'Any'
    },
    property: {
      type: String, 
      default:'Any'
    },
    description:{
      type:String,
      require:true,
    },
    latitude: {
      type: String, 
      required: false, 
    },
    longitude: {
      type: String, 
      required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User collection
        required: true,
    },
    user: {
        type: Object,
        require:true
    },
    savedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

// Define the model
const postModel = mongoose.model("Post", postSchema);

// Export the model
export default postModel;
