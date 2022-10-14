const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const User = require("../models/userModel");

const verifyToken = (req,res,next)=>{


let token = req.headers["x-access-token"];
     
    /**
     * Check if the token is provided or not
     */
    if(!token){
        return res.status(401).send({
            message :"No token provided"
        })
    }

    /**
     * Go and validate the token
     */
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message :"Unauthorized"
            })
        }
        req.username = decoded.id;
       
        next();
    })
   
   
}




 
 const authJwt= {
    verifyToken:verifyToken,
}
module.exports =  authJwt