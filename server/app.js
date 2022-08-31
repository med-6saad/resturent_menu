const express=require('express');
const app=express();
const AuthRouter=require('./routers/Auth.router');
const FoodRouter=require('./routers/Food.router');
const OrderRouter=require('./routers/Order.router');
const CategoryRouter=require('./routers/Category.router');
const QrCode=require('./routers/QrCode.router');
const body_parser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path')
const multer=require('multer');
const DB_URL="mongodb://localhost:27017/MedTicno";
app.use(cors())
app.use(body_parser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}));
app.use(body_parser.json({limit:'50mb'}));
mongoose.connect(DB_URL).then(()=>{
    console.log('data base connected...')
})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(req.body)
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})
const upload=multer({storage:storage})
app.post('/server/upload',upload.single('file'),(req,res)=>{
    try{
        res.status(200).json('folder uploads..')
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    res.status(200).json()
    console.log('yes..')
})
app.use("/images",express.static(path.join(__dirname,'public/images')))
app.use('/server/auth',AuthRouter)
app.use('/server/foods',FoodRouter)
app.use('/server/orders',OrderRouter)
app.use('/server/qrcodes',QrCode)
app.use('/server/categories',CategoryRouter)
app.use(morgan('tiny'))
app.listen(3001,()=>{
    console.log('server runing in port 3001...')
})