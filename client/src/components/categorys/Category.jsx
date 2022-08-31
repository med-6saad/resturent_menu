import React, { useState,useRef,useContext,useEffect } from "react";
import {AuthContext} from '../../context/AuthContext';
import './category.css';
import axios from 'axios';
import {VisibilityIcon} from '@material-ui/core';
const Category=()=>{
    const {user}=useContext(AuthContext);
    const [showFoods,setShowFoods]=useState([])
    const [categories,setCategries]=useState([])
    const [refresh,setRefresh]=useState([])
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const toggleFoods=(idx)=>{
        if(idx===showFoods){
            setShowFoods([])
        }else{
            setShowFoods(idx)
        }
    }
    const categoryName=useRef()
    const submitCategory=(e)=>{
        e.preventDefault();
        const postCategory=async()=>{
            const res=await axios.post('/categories/addCategory',{categoryName:categoryName.current.value,userId:user._id})
            console.log('res:',res)
            setRefresh(res.data)
        }
        postCategory();
    }
    useEffect(()=>{
        const getCategories=async()=>{
            try{
                const categories1=await axios.get('/categories/getCategories/'+user._id)
                setCategries(categories1.data)
            }catch(err){
                console.log(err)
            }
        }
        getCategories();
    },[refresh])
    const deleteCategory=(categoryId)=>{
        const test=async()=>{
            try{
                const res=await axios.post('/categories/deleteCategory/'+categoryId)
                console.log('test.....')
                console.log('res:',res.name)
            }catch(err){
                console.log(err)
            }
        }
        test()
    }
    return (
        <>
                    
            <div className="containerCategory">
                <form className="inputCat" onSubmit={submitCategory}>
                    <input type="tesxt" required placeholder="enter your category" className="addCatInput" ref={categoryName}/>
                    <button className='addCatName' type="submit">add category</button>
                </form>
                <div className="wopperCat">
                    {categories.map((category,idx)=>(
                            <div className="blockCat" key={idx}>
                                <div className="headerTable">
                                    <h3 className="categorys">{category.categoryName}</h3>
                                    <h3 className="showFoods" onClick={()=>toggleFoods(idx)}>
                                        {
                                            showFoods===idx?<img className="icons" src={PF+'top.png'}/>
                                            :
                                            <img className="icons" src={PF+'bottom.png'}/>
                                        }
                                    </h3>
                                    <div className="showFoods" onClick={()=>deleteCategory(category._id)}>
                                        <img className="icons" src={PF+'remove.png'} alt="" />
                                    </div>
                                </div>
                                {showFoods===idx&&<div className="bodyTable">
                                    {category.foods?.map((food,index)=>(
                                        <div className="foodsCat" key={index}>
                                            <h3>{food.foodName}</h3>
                                            <div className="descCat">{food.description}</div>
                                            <img src={PF+food.images[0]} className='imgFoodCat' alt="" />
                                        </div>
                                    ))}
                                </div>}
                            </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Category;