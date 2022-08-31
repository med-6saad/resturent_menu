const express=require('express');
const router=express.Router();
const body_parser=require('body-parser');
const CategoryModel = require('../models/Category.model');
router.post('/addCategory',async(req,res)=>{
    const cat=new CategoryModel(req.body)
    try{
        const res1=await cat.save();
        res.status(200).json(res1)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})
router.post('/deleteCategory/:categoryId',async(req,res)=>{
    try{
        const test=await CategoryModel.deleteOne({_id:req.params.categoryId})
        res.status(200).json(test)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})
router.get('/getCategories/:userId',async(req,res)=>{
    try{
        const categories=await CategoryModel.find({userId:req.params.userId}).populate('foods').exec()
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;