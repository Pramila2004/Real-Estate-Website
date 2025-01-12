import chatModel from '../models/chat.js';
import messageModel from '../models/message.js';

export const addMessage = async(req, res) => {

    const tokenId=req.userId
    const chatId=req.params.id 
    const text=req.body.text
    
    try {

        const chat = await chatModel.findOne({
            _id: chatId,
            userIds: { $in: [tokenId] }, // Ensure the user is part of the chat
        });

        if (!chat) {
            return res.status(404).json({
              success: false,
              message: "Chat not found or access denied",
            });
        }

        const message = await messageModel.create({
            text,
            chat: chatId, 
            userId: tokenId, 
          });

        await chatModel.findByIdAndUpdate(
            chatId,
            {
              $addToSet: { seenBy: tokenId }, // Ensure the user is added to the seenBy array without duplicates
              lastMessage: text, // Update the last message
            },
            { new: true } // Return the updated document
        );
        
        return res.status(200).json({
            success: true,
            message,
        });

    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
      
    }   
};

