const express=require('express');
const router=express.Router();
const body_parser=require('body-parser')
const Foods=require('../models/Food.model');
const Categories=require('../models/Category.model');
const { findOneAndDelete } = require('../models/User.model');
router.post('/addFood',async(req,res)=>{
    try{
        const newFood=new Foods(req.body)
        const food=await newFood.save();
        const category=await Categories.findOne({categoryName:food.category})
        const category1=await category.updateOne({$push:{foods:food._id}})
        res.status(200).json(food)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.put('/likes/:tableId/:foodId',async(req,res)=>{
    console.log('params:',req.params)
    const food=await Foods.findById(req.params.foodId);
    try{
        const food1=await food.updateOne({$push:{likes:req.params.tableId}})
        res.status(200).json(food1)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/getFoods/:userId',async(req,res)=>{
    try{
        const foods=await Foods.find({userId:req.params.userId})
        res.status(200).json(foods)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/getFoods/:userId/:tableId',async(req,res)=>{
    try{
        const foods=await Foods.find({userId:req.params.userId})
        res.status(200).json(foods)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/getFoodsByCategory/:categoryName',async(req,res)=>{
    try{
        const foods=await Foods.find({category:req.params.categoryName})
        res.status(200).json(foods)
    }catch(err){
        res.status(500).json(err)
    }
    console.log(req.params)
})
router.delete('/deletefood/:foodId',async(req,res,next)=>{
    try{
        console.log(req.params.foodId)
        const food=await Foods.findOneAndDelete({_id:req.params.foodId})
        res.status(200).json('food:'+food.foodName+" is deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router;