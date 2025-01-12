import mongoose from 'mongoose';

// Define the SavedPost schema
const savedPostSchema = new mongoose.Schema(
  {
    user: {
        type: Object,
        require:true
    },
    post: {
        type: Object,
        require:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', 
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now, 
    },
  },
  { timestamps: true } 
);

// Define the SavedPost model
const savedPostModel = mongoose.model('SavedPost', savedPostSchema);

// Export the model
export default savedPostModel;
