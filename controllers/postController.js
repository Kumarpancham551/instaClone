const Post = require('../models/postModel')
const User = require("../models/userModel");

const createPost = async (req,res)=>{
    // creating post
    try{
        const data = {
            body : req.body.body,
            username : req.username,
            friendTag:[req.body.friendTag],
            hashtag:req.body.hashtag,
            video:req.body.video,
            image:req.body.image

        }
    
        const post = await Post.create(data);
        const user = await User.findOne({username : req.username});
        if(!user.posts){
            user.posts =[];
        }
        user.posts.push(post._id)
        await user.save();
        res.status(201).send(post);
       }catch(err){
        console.log( err);
        res.status(500).send({
            message : "Internal server error while posting post"
        });
    }
}

const updatePost = async (req,res)=>{
    // Update  post logic
    try{
            
        const post = await Post.findOne({ "_id": req.params.id });

        /**
         * Update this post object based on the request body
         * passed
         */

        post.body = req.body.body != undefined ? req.body.body : post.body;
        post.hashtag = req.body.hashtag != undefined ? req.body.hashtag : post.hashtag;
        post.video = req.body.video != undefined ? req.body.video : post.video;
        post.image = req.body.image != undefined ? req.body.image : post.image;

        const updatePostData = await post.save();
        res.status(201).send(updatePostData);
       }catch(err){
        console.log( err);
        res.status(500).send({
            message : "Internal server error while posting post"
        });
    }
}


const getPost = async(req, res) => {
    const user = req.params.username;
     // Adding Pagination
    const limitValue = req.query.limit || 10;
    const skipValue = req.query.skip || 0;
    const posts = await Post.find({}).sort({date: 'desc'}).limit(limitValue).skip(skipValue);
    const users = await User.find({});
    res.send(posts, users, user);
}

const deletePost = async(req, res) => {
    // delete post logic api here
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    const user = User.findById(req.user);
    await user.updateOne({$pull: {posts: req.params.id}});
    res.send('Post deleted successfully');
}

const likePost = async(req, res) => {
    //likePost api logic here
    const { id } = req.params;
    const username = req.username; 
    const post = await Post.findById(id);
    const user = await User.find({username:username});
   // console.log("user=",user);
    if(post.likes.includes(user[0]._id)){
        return res.send("already liked by this user")
    }else{
        post.likes.push(user[0]._id);
       // console.log("post like ",user[0]._id);
    }
    await post.save();
    return res.send("This post is liked by the current user and total likes are ");
    
};



const postController = {
    deletePost,
    updatePost,
    likePost,
    getPost,
    createPost
};

module.exports = postController;