import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Use 'String' instead of 'string'
      required: true, // Use 'required' instead of 'require'
    },
    email: {
      type: String,
      required: true,
    },
    avatar:{

        type:String,
        default:'images/user.jpg'

    },
    role:{

        type:String,
        enum:['admin','user'],
        default:'user'

    },
    password: {
      type: String,
      required: true,
    },
    savedPosts: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Post' 
    }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    chatIds:{
      type:[String]
    },
  },
  
  { timestamps: true }
);

// Define the model
const userModel = mongoose.model("User", userSchema);

// Export the model
export default userModel;
