const Post = require('./postModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        lowercase:true,
        minLength:10,
        unique:true
    },
    phone:{
        type:String,
    },
    gender:{ 
        type:String,
        required:true,
        enum:["Male","Female","Other"] // gender value must be either male,female or other
    },
    dob:{
        type:String,
        required:true
    },
    publicProfile:{
        type:Boolean,
        default:true
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}]

},{timestamps:true,versionKey:false})

module.exports =  mongoose.model("User",userSchema);