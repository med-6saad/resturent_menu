import React, { useContext, useEffect } from 'react'
import './orders.css'
import {Checkbox, setRef} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {io} from 'socket.io-client';
import {format} from 'timeago.js';
function Orders() {
  const {user} = useContext(AuthContext)
  const [orders,setOrders]=useState([])
  const [socket,setSocket]=useState(null)
  const [status,setStatus]=useState([])
  const handleChange=async(index,orderId,tableId,foodId)=>{
    try{
      const res=await axios.post('orders/check',{orderId})
      socket.emit('startKoken',{tableId,foodId})
      setStatus([...status,res.status])
    }catch(err){
      console.log(err)
    }
  }
  const [refresh,setRefresh]=useState([])
  useEffect(()=>{
    setSocket(io('http://localhost:8080'))
  },[])
  useEffect(()=>{
    socket?.on(user._id,data=>{
      setRefresh([...refresh,data])
      console.log(data)
    })
  },[socket,user])
  const deleteOrder=async(orderId)=>{
    try{
      const res=await axios.delete('/orders/deleteOrder/'+orderId)
      setStatus(res.data)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const getOrders=async()=>{
      try{
        const res=await axios.get('/orders/getOrdersAdmin/'+user._id);
        setOrders(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getOrders();
  },[status,refresh])
  return (
    <div className='orderContainer'>
      <div className="wopperOrders">
        <div className="headerOrder-head">
          <h3 className='header'>Images</h3>
          <h3 className='header'>food Name</h3>
          <h3 className='header'>number</h3>
          <h3 className='header'>create at</h3>
          <h3 className='header'>table Id</h3>
          <h3 className='header'>Unde_way</h3>
          <h3 className='header'>delete</h3>

        </div>
        <div className="wopperOrder-body">
          {
            orders.map((order,index)=>(
                <div className="bodyOrders" key={index}>
                  <h4 className='header'>img</h4>
                  <h4 className='header'>{order.foodName}</h4>
                  <h4 className='header'>{order.foodNumber}</h4>
                  <h4 className='header'>{format(order.createdAt)}</h4>
                  <h4 className='header'>{order.tableId}</h4>
                  <h4 className='header checkBoxContainer'>
                    <Checkbox
                      checked={order.checked}
                      onChange={()=>handleChange(index,order._id,order.tableId,order.foodId)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                      {'   '}
                    
                    <h4 className='header'>
                      <img src="/assets/images/delete.png" alt="pas d'image" className="deleteIcon" onClick={()=>deleteOrder(order.foodId)} /> 
                    </h4>

                  </h4>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Orders