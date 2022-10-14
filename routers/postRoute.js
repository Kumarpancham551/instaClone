const postController = require("../controllers/postController");
const {authJWT} = require("../middlewares")
module.exports = function(app){
app.post("/insta/api/v1/post",[authJWT.verifyToken],postController.createPost);
app.put("/insta/api/v1/post/:id",[authJWT.verifyToken],postController.updatePost);
app.get("/insta/api/v1/post",[authJWT.verifyToken],postController.getPost);
app.delete("/insta/api/v1/post/:id",[authJWT.verifyToken],postController.deletePost);
app.patch("/insta/api/v1/post/:id",[authJWT.verifyToken],postController.likePost);

}
