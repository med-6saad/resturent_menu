const express=require('express');
const router=express.Router();
const Order=require('../models/Order.model');
router.post('/addOrder',async(req,res)=>{
    try{
        const newOrder=new Order(req.body);
        const order=await newOrder.save();
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/getOrders/:tableId',async(req,res)=>{
    console.log(req.params)
    try{
        const orders=await Order.find({tableId:req.params.tableId})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }

})
router.get('/getOrdersAdmin/:userId',async(req,res)=>{
    console.log(req.params.userId)
    try{
        const orders=await Order.find({userId:req.params.userId})
        res.status(200).json(orders)
    }catch(err){
        console.log(err)
    }
})
router.delete('/deleteOrder/:ordreId',async(req,res)=>{
    try{
        const res1=await Order.findOneAndDelete({_id:req.params.ordreId})
        res.status(200).json(res1)
    }catch(err){
        console.log(err)
    }
})
router.delete('/deleteOrders/:foodId',async(req,res)=>{
    try{
        const orders=await Order.deleteOne({foodId:req.params.foodId})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})
router.post('/check',async(req,res)=>{
    try{
        const order=await Order.find({_id:req.body.orderId})
        console.log('order:',!order[0].checked)
        const res1=await Order.updateOne({_id:req.body.orderId},{checked:!order[0].checked})
        res.status(200).json(res1)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router;