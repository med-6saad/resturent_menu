import react, { useEffect } from "react";
import { useState,useRef } from "react";
import Foods from '../foods/Foods';
import {FoodsData} from '../../data';
import SVG from "./SvgBody";
import './body.css';
import Typed from 'react-typed';
import axios from "axios";
import  {useParams} from 'react-router-dom';
import {io} from 'socket.io-client';
function Body({foodsByCategory}){ 
    const {userId,tableId}=useParams();
    const [foods,setFoods]=useState([])
    const [socket,setSocket]=useState(null)
    useEffect(()=>{
        const getFoods=async()=>{
            try{
                const res=await axios.get('/foods/getFoods/'+userId+'/'+tableId)
                setFoods(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getFoods();
    },[])
    useEffect(()=>{
        setSocket(io("ws://localhost:8080"))
    },[])
    useEffect(()=>{
        socket?.on('test',message=>{
            console.log(message)
        })
    },[socket])
    return (
        <div className="body">
            <img src="/assets/images/aqua.jpg" alt="pas d'image" className="imgFoodCategory"/>
            <h2 className="categoryName">salad</h2>
            <p className="descCategory">
                <Typed
                    strings={['kslfj dsjfkds  jfsl fj dfljds flja; jdflksdj fkjhds ufdskf jdsfidsjoifjdsk fndsnf jflkjdslkfjds lkjfidsfjlkndsjf sid fisjf']}
                    typeSpeed={20}
                />
            </p>
            <div className="foodsContainer">
                <Foods userId={userId} tableId={tableId} foods={foodsByCategory.length===0?foods:foodsByCategory} socket={socket}/>
            </div>
            <div className="footerBody">
                <SVG/>
                <p className="text">
                    <Typed
                        strings={['kslfj dsjfkds  jfsl fj dfljds flja; jdflksdj fkjhds ufdskf jdsfidsjoifjdsk fndsnf jflkjdslkfjds lkjfidsfjlkndsjf sid fisjf']}
                        typeSpeed={20}
                    />
                </p>
            </div>
        </div>
    )
}
export default Body;