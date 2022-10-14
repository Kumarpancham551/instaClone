const User = require("../models/userModel");
const Post = require('../models/postModel')


const follow = async (req, res) => {
    //follow api logic here
    const user = User.findById(req.params.curuserId);
    await user.updateOne({$push: {following: req.params.userId}})
    const otheruser = User.findById(req.params.userId);
    await otheruser.updateOne({$push: {followers: req.params.curuserId}})
    res.send(`start following${req.params.curuserId}`);

}
const unfollow = async (req, res) => {
    const user = User.findById(req.params.curuserId);
    await user.updateOne({$pull: {following: req.params.userId}})
    const otheruser = User.findById(req.params.userId);
    await otheruser.updateOne({$pull: {followers: req.params.curuserId}})
    res.send(` unfollow ${req.params.curuserId}`);
}

const getFollowing = async (req, res) => {
    const user = await User.findById(req.params.curuserId);
    const following = user.following;
    res.send(following);
}

const getFollowers = async (req, res) => {
    const user = await User.findById(req.params.curuserId);
    const followers = user.followers;
    res.send(followers);
}


const UserController = {
    follow,
    unfollow,
    getFollowing,
    getFollowers

};

module.exports = UserController;