
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    likes: {
        type:[{ type: Schema.Types.ObjectId, ref: "User" }],  

    },
    friendTag: {
        type:[{ type: Schema.Types.ObjectId, ref: "User" }],  

    },
    hashtag:{
        type:[String]
    },
    comment:[{username:{
        type:[{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    text:{
        type:String,
        required:true
    }}],
    date: {
        type: Date,
        default: Date.now(),
    },
    video:{
    type:[String]
  },
    image:{
         type:[String]

    },
    

})

module.exports = mongoose.model('Post', tweetSchema);