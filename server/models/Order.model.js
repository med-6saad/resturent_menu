const mongoose=require('mongoose')
const OrderSchema=new mongoose.Schema({
    foodName:{
        type:String,
    },
    foodImages:{
        type:Array,
    },
    userId:{
        type:String
    },
    foodId:{
        type:String
    },
    tableId:{
        type:String
    },
    checked:{
        type:Boolean,
        default:false
    },
    foodNumber:{
        type:Number
    }
},{timestamps:true})
module.exports=mongoose.model('Order',OrderSchema)