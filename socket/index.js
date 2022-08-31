const io=require('socket.io')(8080,{
    cors:{
        origin:'http://localhost:3000'
    }
});
io.on("connection",(socket)=>{
    console.log('new user connected...')
    socket.on('newOrder',userId=>{
        io.emit(userId,'newOrder')
    })
    socket.on('startKoken',data=>{
        io.emit(data.tableId,data.foodId)
    })
})