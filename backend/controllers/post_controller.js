import postModel from '../models/post.js';


export const createPost = async(req, res) => {
    
    try {
        const {title,price,images,address,city,bedroom,bathroom,type,property,latitude,longitude,description,userId,user}=req.body;

     
        const newPost=new postModel({
            title:title,
            price:price,
            images:images,
            address:address,
            city:city,
            bedroom:bedroom,
            bathroom:bathroom,
            type:type,
            property:property,
            latitude:latitude,
            longitude:longitude,
            userId:userId,
            user:user,
            description:description,

        })

        await newPost.save()
        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            post: newPost,
          });

    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
        
    }   
};


export const getPosts = async(req, res) => {
    
    try {
        
        const posts = await postModel.find();
        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            posts,
        });

    } catch (error) {

     
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve posts",
        });
    }   
};
export const getMyPosts = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate the id parameter
    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const posts = await postModel.find({ userId: id }); // Query for posts by userId

    // Check if posts are found
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found" });
    }

    return res.status(200).json({ success: true, posts }); // Return posts if found
  } catch (error) {

    return res.status(500).json({ success: false, message: "Failed to get posts" }); // Handle any server errors
  }
};

  

export const getPost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id); 
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      return res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };



