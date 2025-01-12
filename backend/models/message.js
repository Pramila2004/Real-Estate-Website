import mongoose from "mongoose";

// Define the message schema
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userIds: {
      type: [String],
    },
    seenBy: {
      type: [String],
    },
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    chatIds: {
      type: String,
    },
  },
  { timestamps: true }
);

// Define the model using messageSchema
const messageModel = mongoose.model("Message", messageSchema);

// Export the model
export default messageModel;
