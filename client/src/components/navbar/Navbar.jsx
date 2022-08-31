import React,{useContext} from "react";
import './navbar.css';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import { useEffect,useState } from "react";
import axios from 'axios';
import Select from 'react-select';
function Navbar({getFoodsByCategory}){
    const {user}=useContext(AuthContext);
    const userId=window.location.pathname.split('/')[1];
    const [categories,setCategories]=useState([]);
    const Optoins=[{value:'all',label:'All'}];
    for(let category of categories){
        let a={
            value:category.categoryName,
            label:category.categoryName
        }
        Optoins.push(a)
    }
    useEffect(()=>{
        const getCategories=async()=>{
            try{
                const categories=await axios.get('/categories/getCategories/'+userId)
                setCategories(categories.data)
            }catch(err){
                console.log(err)
            }
        }
        getCategories();
    },[])
    return (
        <div className="navbar">
            <div className="logo">
                <img src="/assets/images/aqua.jpg" alt="" className="logImg" />
                <h3 className="logoText">{user.username}</h3>
            </div>
            <div className="categorys">
                <Select 
                    options={Optoins}
                    isLoading={true}
                    placeholder={'Select category...'}
                    onChange={getFoodsByCategory}
                />
            </div>
            <div className="adminRouter" >
                <Link to={user?'/admin':'/login'} style={{textDecoration:"none"}}>
                    <h3>I'm Admin</h3>
                </Link>
            </div>
        </div>
    )
}
export default Navbar;