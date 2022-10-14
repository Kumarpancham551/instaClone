const express = require("express");
const app = express();
const serverConfig = require("./config/serverConfig");
const bcrypt = require("bcryptjs");
const  dbConfig = require("./config/dbConfig");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const User = require("./models/userModel");

/**Register the body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Initialize the connection to the mongodb
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
   console.log("Error while connecting to MongoDB");
});
db.once("open",()=>{
   console.log("Connected to mongoDB");
   init();
  
})
 async function init(){
   try{
    await User.collection.drop();// drop the collection every time
   const  user =  await User.create({
        name:"pancham",
        username:"raj45",
        password:"Welcome1$6",
        email:"kankpancham@gmail.com",
        password:bcrypt.hashSync("testpurpose",8),
        phone:8873472148,
        gender:'Male',
        dob:"31/07/1997"
    })
    
   console.log(user); 
}catch(err){
    console.log("error in user registeration ", err.message);
}
 }

require("./routers/authRoute")(app);
require("./routers/postRoute")(app);
require('./routers/userRoute')(app);
app.listen(serverConfig.PORT, ()=>{
    console.log("Server is successfully started ",serverConfig.PORT)
})