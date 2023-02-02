const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const verifyToken = require("../utils/verifyToken")
const Authenticate = async(req,res,next)=>{
  
    if(!req.headers.authorization){
        return res.status(400).send({message:"Please provide the authorization token" });

    }
    if(!req.headers.authorization.startsWith("Bearer")){
        return res.status(400).send({message:"Please provide the authorization token"});
    }

    const token = req.headers.authorization.split(" ")[1];
   
    let user;
    try {
        user = await verifyToken(token)
    } catch (error) {
        return res.status(400).send({
            message:"dPlease provide the valid authorization token or not valid",
        })
    }
    req.user = user.user;
    next();
}




module.exports=Authenticate;