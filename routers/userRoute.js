const userRoute = require("../controllers/user.controller");

module.exports = function(app){
app.post("/insta/api/v1/follow/:curuserId/:userId",userRoute.follow);
app.post("/insta/api/v1/unfollow/:curuserId/:userId",userRoute.unfollow);
app.get("/insta/api/v1/follower/:curuserId",userRoute.getFollowers);
app.get("/insta/api/v1/following/:curuserId",userRoute.getFollowing);


}
