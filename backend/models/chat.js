import mongoose from "mongoose";

// Define the schema
const chatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    userIds: {
      type: [String], // Array of strings for user IDs
    },
    seenBy: {
      type: [String], // Array of user IDs who have seen the chat
    },
    lastMessage: {
      type: String, // The last message in the chat
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Define the model
const chatModel = mongoose.model("Chat", chatSchema);

// Export the model
export default chatModel;
