import { ChartValueAxisCrosshair } from '@progress/kendo-react-charts';
import React, { useContext } from 'react'
import { useEffect,useRef } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {Alert} from '@material-ui/lab';
import {AuthContext} from '../../context/AuthContext';
import './addFoods.css'
function AddFoods() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(PF)
  const {user}=useContext(AuthContext)
  const foodName=useRef();
  const price=useRef();
  const description=useRef();
  const data=[1,2,34,5,6,7,8,9,0,0]
  const imagesArray=[1,2,3,4,5,6,7,7,8,9,0,9,8,7,6,5]
  const [show,setShow]=useState(false)
  const handleClick=()=>{
    setShow(!show);
  }
  const handleSuccess=()=>{
    const inputs=document.getElementsByClassName('inputFood')
    for(let inputelement of inputs){
      inputelement.value=''
    }
    setStatus('')
    setFile([])
  }

  const [foods,setFoods]=useState([])
  const [file,setFile]=useState([''])
  const [category,setCategory]=useState('');
  const [categories,setCategories]=useState([])
  const [status,setStatus]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault();
    var files=[]
    for(let i=0;i<Object.keys(file).length;i++){
      files.push(Date.now()+''+i+''+file[i].name)
    }

    const food={
      foodName:foodName.current.value,
      category,
      userId:user._id,
      description:description.current.value,
      images:files,
      price:price.current.value
    }
    try{
      const res=await axios.post('foods/addFood',food)
      console.log('res:',res.status)
      setStatus(res.status)
    }catch(err){
      console.log(err)
    }
    if(files.length>0){
      let promises=[]
      for(let i=0;i<=Object.keys(file).length-1;i++){
        const data=new FormData();
        data.append('name',files[i])
        data.append('file',file[i])
        promises.push(
          axios.post('/upload',data).then((res)=>{
            console.log(res)
          })
        )
      }
      Promise.all(promises).then(()=>{
        console.log('pro:',promises)
      })
    }
   
  }
  const [deletes,setDeletes]=useState(false)
  const deleteFood=async(foodName,foodId)=>{
    try{
      const res=await axios.delete('foods/deleteFood/'+foodId)
      setDeletes(!deletes)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const getFoods=async()=>{
      const res=await axios.get('/foods/getFoods/'+user._id)
      setFoods(res.data)
    }
    getFoods();
  },[status,deletes])
  useEffect(()=>{
    const getCategories=async()=>{
      try{
        const categories1=await axios.get('/categories/getCategories/'+user._id)
        setCategories(categories1.data)
      }catch(err){
        console.log(err)
      }
    }
    getCategories()
  },[])
  return (
    <div className='orderContainer'>
      <div className="header-top">
        <h2>Add Foods</h2>
        <button onClick={handleClick}>add</button>
      </div>
      <div className="addFoodContainer" style={show?{display:'flex'}:{display:'none'}} >
          <div className="iconsAndLogo">
            {Object.keys(file).map((fil,index)=>(
              
              file[index]?<img src={URL.createObjectURL(file[index])} alt='' className='imagesFood' key={index}/>:''
    
            ))}
            {
              file[0]?<img src='/assets/images/x-button.png' className='iconAddPhoto' onClick={()=>setFile([])}/>
              :
              <>
                <label htmlFor='files' style={{display:'flex'}}>
                <img src="/assets/images/plus.png" alt="" className='iconAddPhoto'/>
                </label>
                <input hidden type="file" id='files' name='files' onChange={(e)=>setFile(e.target.files)} multiple/>
              </>
            }     
          </div>  
          <form className="dataFood" onSubmit={handleSubmit}>
            <input type="text" placeholder='Food Name' name='foodName' ref={foodName} className='inputFood' required/>
            <input type="number"placeholder='Price' ref={price} className="inputFood" required/>
            <select name="category" placeholder='Category' onChange={(e)=>setCategory(e.target.value)} className="inputFood" required>
              <option value={''} className='addCategoryFood'>Category</option>
              {categories.map((category,index)=>(
                <option value={category.categoryName} className='addCategoryFood' key={index}>{category.categoryName}</option>
              ))}
            </select>
            <textarea placeholder='Description' name='description' ref={description} maxLength={200} type="text" className="inputFood textareaFood" required/>
            <div className="buttonSubmitFood" style={{display:'block'}}>
              {status?
                <Alert severity="success" onClick={handleSuccess}>Success</Alert>
              :
                <button className='submitBtnAddFood'>submit</button>}
            </div>
          </form>
      </div>
      <div className="wopperOrders" >
        <div className="headerOrder-head">
          <h3 className='header'>Images</h3>
          <h3 className='header'>Food Name</h3>
          <h3 className='header'>Category</h3>
          <h3 className='header'>Price </h3>
          <h3 className='header'>Create At</h3>
          <h3 className='header'>Update</h3>
          <h3 className='header'>Delete</h3>
        </div>
        <div className="wopperOrder-body">
          {
            foods.map((food,index)=>(
                <div className="bodyOrders" key={index}>
                  <h4 className='header'><img src={PF+food.images[0]} alt="" className='imgfd'/></h4>
                  <h4 className='header'>{food.foodName}</h4>
                  <h4 className='header'>{food.category}</h4>
                  <h4 className='header'>{food.price} DA</h4>
                  <h4 className='header'>test </h4>
                  <h4 className='header'>
                    <img src="/assets/images/exChange.png" alt="" className="updateIcon" />
                  </h4>
                  <h4 className='header checkBoxContainer'>  
                    <img src="/assets/images/delete.png" alt="pas d'image" className="deleteIcon" onClick={()=>deleteFood(food.foodName,food._id)}/> 
                  </h4>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default AddFoods