import './App.css';
import React,{useState,useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Body from '../../components/body/Body';
import axios from 'axios';

function App() {
  const [foodsByCategory,setFoodsByCategory]=useState([])
  const getFoodsByCategory=async(e)=>{
    try{
      const foodsByCat=await axios.get('/foods/getFoodsByCategory/'+e.value)
      setFoodsByCategory(foodsByCat.data);
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
      <Navbar getFoodsByCategory={getFoodsByCategory}/>
      <Body foodsByCategory={foodsByCategory}/>
      <Footer/>
    </>
  );
}

export default App;
