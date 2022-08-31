const mongoose=require('mongoose');
const CategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        index:true,
        unique:true
    },
    userId:{
        type:String,
        default:''
    },
    foods:[{type:mongoose.Schema.Types.ObjectId,ref:'Foods'}]
},{timestamps:true})
module.exports=mongoose.model('Category',CategorySchema);