
/**
 * Logic to accept the registration/signup
 */
 const bcrypt = require("bcryptjs");
 const User = require("../models/userModel");
 const jwt = require("jsonwebtoken");
 const authConfig = require("../config/authConfig");

 
 exports.signup = async (req,res)=>{
     
 
   /**
    * Convert that into the js object for inserting in the mongodb
    */
      const userObj={
        name:req.body.name,
        username:req.body.username,
        email : req.body.email,
        phone : req.body.phone,
        password:bcrypt.hashSync(req.body.password,8),
        gender :req.body.gender,
        dob : req.body.dob
      }
   /**
    * Insert the data and return the response
    */
      try{
          const userCreated = await User.create(userObj);
         
            const response = {
              name:userCreated.name,
              email:userCreated.email,
              gender:userCreated.gender,
              dob:userCreated.dob
           }
          res.status(201).send(response);
        
      }catch(err){
         console.log("Some error Happend",err.message);
         res.status(500).send({
             message:"Some internal  server error "
         })
      }
  
 }
 
 
/**
 * Logic for sign in
 */

exports.signin= async (req,res)=>{
    /**
     * If the userId passed is correct
     */
    try{
        
      const  user = await User.findOne({email:req.body.email});
      
      if(user == null){
        return res.status(400).send({
            message:"Failed ! email id doesn't exist"
        });
      }
    
    /**
     * If the password passed is correct
     */
     const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
     if(!passwordIsValid){
        return res.status(401).send({
            message:"Wrong password"
        });
     }
    /**
     * Create the JWT token
     */
      const token = jwt.sign({
        id:user.username
      },
      authConfig.secret,{
        expiresIn:6000
      }
      )
    /**
     * Send the successfull login response
     */
    res.status(200).send({
        name:user.name,
        email:user.email,
        accessToken:token
    });
    }catch(err){
        console.log("Internal error",err.message);
        res.status(500).send({
            message:"Some Internal error while signin"
        })
    }
    }

    
exports.editProfile = async (req,res)=>{
  try{

      const user = await User.findOne({username : req.username})

      user.name = req.body.name ? req.body.name : user.name
      user.username = req.body.username ? req.body.username : user.username
      user.email = req.body.email ? req.body.email : user.email
      user.phone = req.body.phone ? req.body.phone : user.phone
      user.dob = req.body.dob ? req.body.dob : user.dob
      user.password = req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password


      const updatedUser = await user.save();

      res.status(200).send("profile updated successfully");

  }catch(err){
      res.status(500).send({
          message : "Internal server error while updating user data"
      });
  }
}