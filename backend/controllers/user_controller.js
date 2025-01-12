import userModel from '../models/user.js';
import bcryptjs from 'bcryptjs'


export const getUsers = async(req, res) => {
    
    try {
        
        const users=await userModel.findMany()
        res.status(200).json(users)


    } catch (error) {
        res.status(500).json({success:false,message:"Fail to get Users"})
        console.log(error);
    }   
};

export const getUser = async (req, res) => {
    try {

        const id=req.params.id;
        const user=userModel.findOne({id:id})
        if(!user){
            res.status(404).json({success:false,message:"Fail to get User"}) 
        }

        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Fail to get User" });
        console.error(error);
    }
};


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId  // Corrected variable name


    if (id !== tokenUserId) {
        console.error("Authorization failed: IDs do not match");
        return res.status(403).json({ success: false, message: "Not Authorized" });
    }

    try {
        
        const { username, email, password ,avatar} = req.body;

        const user = await userModel.findById(id);
        if (!user) {
            console.error(`User with ID ${id} not found`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcryptjs.hash(password, 10);
        if (avatar) user.avatar = avatar;

        // Save updated user
        const updatedUser = await user.save();

        const { password: userPassword, ...safeUser } = user._doc;

        res.status(200).json({
            message: "User updated successfully",
            user: safeUser,
        });
    } catch (error) {
       
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};





export const deleteUser = async(req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId; 

    
    if (id !== tokenUserId) {
        return res.status(403).json({ success: false, message: "Not Authorized" });
    }
   
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        
        await userModel.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
       
        
     } catch (error) {
         res.status(500).json({success:false,message:"Fail to delete User"})
         console.log(error)
     }
};


