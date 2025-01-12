import chatModel from '../models/chat.js';
import userModel from '../models/user.js';

export const getChats = async(req, res) => {

    const tokenId=req.userId

    
    try {

        const chats=await chatModel.find({
            userIds: { $in: [tokenId] },
        })

        const receiverIds = chats.map(chat => chat.userIds.find(id => id !== tokenId));

        // Fetch all receivers' details in one query
        const receivers = await userModel.find(
        { _id: { $in: receiverIds } },
        { _id: true, username: true, avatar: true }
        );

        const receiverMap = receivers.reduce((map, receiver) => {
            map[receiver._id] = receiver;
            return map;
        }, {});
      
          // Add the receiver details to each chat
        const chatsWithReceivers = chats.map(chat => ({
            ...chat.toObject(), // Convert Mongoose Document to plain object
            receiver: receiverMap[chat.userIds.find(id => id !== tokenId)],
        }));
      
            
        return res.status(200).json({chats:chatsWithReceivers})

    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
        
    }   
};

export const getChat = async (req, res) => {
    const tokenId=req.userId
    const chatId=req.params.id
    try {

        const chat=await chatModel.findOne({
            _id:chatId,
            userIds: { $in: [tokenId] },
            include:{
                message:{
                    orderBy:{
                        createdAt:'asc',
                    }
                }
            }
        })

        if (!chat) {
            return res.status(404).json({
              success: false,
              message: "Chat not found or access denied",
            });
        }
        
        await chatModel.updateMany(
            { _id: chatId },
            { $addToSet: { seenBy: tokenId }
        })

        return res.status(200).json({chat});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
       
    }
};


export const addChat = async(req, res) => {
    const tokenId=req.userId
    
    try {
        
        const newChat=await chatModel.create({
            userIds: [tokenId, req.body.receiverId],
        })
        
        res.status(200).json({newChat})
     } catch (error) {
         res.status(500).json({success:false,message:"Internal server error"})
        
     }
};


export const readChat = async(req, res) => {
    const tokenId=req.userId
    const chatId=req.params.id
    try {
        
        const chat=await chatModel.findOneAndUpdate(
            {
                _id: chatId,
                userIds: { $in: [tokenId] }, // Ensure the user is a participant in the chat
            },
            {
                $addToSet: { seenBy: tokenId }, // Use $addToSet to avoid duplicates in the seenBy array
            },
            { new: true }
        );
        
        if (!chat) {
            return res.status(404).json({
              success: false,
              message: "Chat not found or access denied",
            });
          }
      
          // Respond with the updated chat
          return res.status(200).json({
            success: true,
            chat,
          });

     } catch (error) {
         res.status(500).json({success:false,message:"Internal server error"})
        
     }
};


