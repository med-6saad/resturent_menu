import React, { useRef,useState,useEffect } from "react";
import './foods.css';
import axios from "axios";
import {Alert} from '@material-ui/lab';
function Foods({foods,userId,tableId,socket}){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [orders,setOrders]=useState([])
    const [request,setRequset]=useState([])
    const [checkeds,setCheckeds]=useState([])
    const foodNumber=useRef();
    const handleLikes=async(foodId)=>{
        try{
            const res=await axios.put('/foods/likes/'+tableId+'/'+foodId)
        }catch(err){
            console.log(err)
        }
    }
    const sendRequest=async(foodId,foodName,foodImages)=>{
        try{
            const res=await axios.post('/orders/addOrder',{userId,foodId,tableId,foodNumber:foodNumber.current.value,foodName,foodImages})
            socket.emit('newOrder',userId)
            setRequset(res.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        socket?.on(tableId,(foodId)=>{
            setRequset([...request,foodId])
        })
    },[socket])

    useEffect(()=>{
        const getOrders=async()=>{
            try{
                const res=await axios.get('/orders/getOrders/'+tableId)
                const orderT=[]
                const checkedsArray=[]
                for(let i=0;i<=res.data.length-1;i++){
                    orderT.push(res.data[i].foodId)
                    if(res.data[i].checked){
                        checkedsArray.push(res.data[i].foodId)
                    }
                }
                setOrders(orderT)
                setCheckeds(checkedsArray)
            }catch(err){
                console.log(err)
            }
           
        }
        getOrders();
    },[request])
    const handleSuccess=(foodId)=>{
        const deleteOrders=async()=>{
            try{
                const res=await axios.delete('/orders/deleteOrders/'+foodId)
                socket.emit('newOrder',userId)
                setRequset(res.data)
            }catch(err){
                console.log(err)
            }
        }
        deleteOrders()
    }
    const showImages=(index)=>{
        document.getElementById('test'+index).classList.add('test1')
    }

    return (
        <>
 
            {foods.map((food,index)=>(
                <div className="foods" key={index}>
                    {checkeds.includes(food._id)?'koken started':''}
                    <div className="topFoodBar">
                        <img src={PF+food.images[0]} alt="" className="foodBarImg" />
                        <h2 className="foodBarName">{food.foodName}</h2>
                        <h3>prix: {food.price} DA</h3>
                    </div>
                    <input type="number" className="numberInput" defaultValue={1} ref={foodNumber}/>
                    <div className="bottomFoodBar">
                        <img src="/assets/images/Thumbs.png" alt="" className="Thumbs" />
                        <span className="likeNumbers" onClick={()=>handleLikes(food._id)}>{food.likes} Likes</span>
                        {   
                            orders.includes(food._id)?
                                <Alert 
                                    severity="success" 
                                    style={{
                                        width:'70px',
                                        height:'20px',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        fontSize:'14px'
                                    }} onClick={checkeds.includes(food._id)?()=>alert('ckoken started'):()=>handleSuccess(food._id)}
                                >Cancle</Alert>
                            :
                                <button className="addToCard" onClick={()=>sendRequest(food._id,food.foodName,food.images)}>add to card</button>
                        }
                    </div>
                </div>
            ))}
        </>
    )
}
export default Foods;