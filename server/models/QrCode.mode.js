const mongoose=require('mongoose');
const QrCodeSchema=new mongoose.Schema({
    url:{
        type:Array
    },
    userId:{
        type:String
    },
    tableNumber:{
        type:Number,
        default:1
    },
    location:{
        type:String,
        default:''
    }
})
module.exports=mongoose.model('QrCode',QrCodeSchema);