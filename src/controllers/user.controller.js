const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const register = async(req,res)=>{
    let {name,email,password}=req.body; 
    try {
        let user = await User.findOne({email}).lean().exec();
        if(user){
            return res.status(400).send({message:"User already exist"})
        }
        user = await User.create(req.body);
        const token = generateToken(user);
        res.send({user,token})

    } catch (error) {
        res.status(500).send(error.message)
    }
}
const Login = async(req,res)=>{
    let {email,password}= req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send({message:"User account does not exist"});
        }
        const match = user.checkPassword(password);
        if(!match){
            return res.status(400).send({message:"Please try another email or password"})
        }
        const token = generateToken(user);
        res.send({user,token})
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const getUserProfile = async(req,res)=>{
   
const user = await User.findById(req.user._id);
  try { 
    if(user){
        res.status(200).send(user);
    }else{
      res.status(404);
      throw new Error("User Not Found")  
    }
  } catch (error) {
      return res.status(500).send(error.message)
  }
}
const updateUserProfile = async(req,res)=>{
    try {
    const user =  await User.findById(req.user._id);
    if(user){
       user.name=req.body.name|| user.name;
       user.email=req.body.email|| user.email;
       if(req.body.password){
           user.password=req.body.password;

       }
       const updateUser = await user.save();
       res.json({
           _id:updateUser._id,
           name:updateUser.name,
           email:updateUser.email,
           isAdmin:updateUser.isAdmin,
           token:generateToken(updateUser._id)
       });

    }else{
        res.status(404);
        throw new Error("User not found")
    }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}
module.exports={register,Login,getUserProfile,updateUserProfile};

