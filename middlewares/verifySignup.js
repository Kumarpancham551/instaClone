/**
 This file will have the logic to validate the incomming request
 */
 const User = require("../models/userModel");
  
 validateSignUpRequestBody = async (req,res,next)=>{
     // validate if name is present
     if(!req.body.name){
         return res.status(400).send({
             message:"Failed! user name is not provided"
         })
     }
     if(!req.body.gender){
        return res.status(400).send({
            message:"Failed! user gender is not provided"
        })
     }
     if(!req.body.dob){
        return res.status(400).send({
            message:"Failed! user date of birth is not provided"
        })
     }
    
     if(!req.body.password){
         return res.status(400).send({
             message:"Failed! user password is not provided"
         })
     }
   if(!CheckPassword(req.body.password)){
    return res.status(400).send({
        message:"Failed! try password in this formate first char capital, alphanumeric,one special symbole and lengt should be 8 "
    })
   }
   if(!req.body.phone){
    return res.status(400).send({
        message:"Failed! user phone number is not provided"
    })
    }

    if(!phoneValidationWithCountryCode(req.body.phone)){
        return res.status(400).send({
            message:" Phone validation failed "
        })
       }
 
     if(!req.body.email){
         return res.status(400).send({
             message:"Failed! user email is not provided"
         })
     } 
     if(!isValidEmail(req.body.email)){
         return res.status(400).send({
             message:"Failed! provided email is not valid formate "
         }) 
     }    
     next();
 }
 function CheckPassword(inputtxt) 
 { 
 var passw= /^([A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{7,16}$/;  
 if(String(inputtxt).match(passw)) 
 { 
 console.log('Password validation successfully completed')
 return true;
 }
 else
 { 
 console.log('Password validation faild ')
 return false;
 }
 }

 function phoneValidationWithCountryCode(phone) 
 { 
   let pattern=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  
 if(String(phone).match(pattern)) 
 { 
 return true;
 }
 else
 { 
 return false;
 }
 }

 const isValidEmail = (email) => {
     return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
 }   

 
 validateSigninRequestBody = (req,res,next)=>{
     if(!req.body.email){
         return res.status(400).send({
             message:"Failed!  email id is not provided"
         })
     }
     if(!req.body.password){
         return res.status(400).send({
             message:"Failed! user password is not provided"
         })
     }
     next();
 }
 
 const verifyRequestBodiesForauth ={
     validateSignUpRequestBody:validateSignUpRequestBody,
     validateSigninRequestBody:validateSigninRequestBody
 }
 module.exports = verifyRequestBodiesForauth;