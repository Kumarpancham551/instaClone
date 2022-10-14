const authcontroller = require("../controllers/authController");
const {verifySignUp,authJWT} = require("../middlewares");
module.exports = function(app){
app.post("/insta/api/v1/auth/signup",[verifySignUp.validateSignUpRequestBody],authcontroller.signup);

app.post("/insta/api/v1/auth/signin",authcontroller.signin);
app.put("/insta/api/v1/update",[authJWT.verifyToken],authcontroller.editProfile);
}
