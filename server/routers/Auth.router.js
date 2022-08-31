const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/User.model');
//register
router.post('/register',async(req,res)=>{
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //create new user
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        //save user and respond
        const user=await newUser.save();
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/login',async(req,res)=>{
    console.log('body:',req.body)
    try{
        const user=await User.findOne({
            email:req.body.email
        })
        !user&&res.status(404).json('user not found');
        console.log('user:',user)
        const validPassword=await bcrypt.compare(
            req.body.password,user.password
        )
        !validPassword&&res.status(404).json('password not correnct')
        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports=router;