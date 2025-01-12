import savedPostModel from "../models/save.js";
import postModel from '../models/post.js';
import userModel from '../models/user.js';


export const savePost = async(req, res) => {
    const { userId, postId } = req.body;
    const tokenUserId=req.userId;
    try {

      if (!tokenUserId) {
          return res.status(401).json({ message: 'Please login first.' }); // Token not found
      }

        if(userId!==tokenUserId){
            return res.status(404).json({ message: 'User not Authorized' });

        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        // Check if the post is already saved by the user
        const existingSavedPost = await savedPostModel.findOne({ userId:userId, postId:postId });

       if (existingSavedPost) {
            await Promise.all([
                savedPostModel.deleteOne({ _id: existingSavedPost._id }),
                userModel.updateOne({ _id: userId }, { $pull: { savedPosts: postId } }),
                postModel.updateOne({ _id: postId }, { $pull: { savedByUsers: userId } }),
            ]);
            
         
            
            return res.status(200).json({ message: 'Post unsaved successfully.', isSaved:false});
        }


        // Save the post
        const savedPost = new savedPostModel({
            user,
            post,
            userId,
            postId,
        });

        await savedPost.save();

        await Promise.all([
            userModel.updateOne({ _id: userId }, { $push: { savedPosts: postId } }),
            postModel.updateOne({ _id: postId }, { $push: { savedByUsers: userId } }),
          ]);

        return res.status(200).json({
        message: 'Post saved successfully.',
        savedPost,
        isSaved:true
        });
    } catch (error) {
        console.error('Error saving post:', error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
    
};




export const getSavedPosts = async (req, res) => {
    const tokenUserId = req.userId;
  
    try {

     
      
      const user = await userModel.findById(tokenUserId, 'savedPosts');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Fetch posts matching the saved post IDs
      const savedPosts = await postModel.find({ _id: { $in: user.savedPosts } });
  
      // Return full post details
      
      return res.status(200).json({
        message: 'Saved posts retrieved successfully.',
        savedPosts,
        isSaved:true
      });
    } catch (error) {

      return res.status(500).json({ message: 'Internal server error.', error });
    }
  };




