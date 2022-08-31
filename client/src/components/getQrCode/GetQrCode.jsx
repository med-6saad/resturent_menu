import React from 'react'
import './getQrCode.css'
import QrCode from 'qrcode'
import { useState,useContext } from 'react'
import { useRef } from 'react'
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
function GetQrCode() {
  const {user} = useContext(AuthContext)
  const numberTables=useRef();
  const [urls,setUrls]=useState([])
  const getQrCode=async()=>{
    let a=[]
    for(let i=1;i<=numberTables.current.value;i++){
      QrCode.toDataURL(window.location.origin+'/'+user._id+'/'+i,(err,qrcode1)=>{
        if(err){
          return console.log(err)
        }
        a.push(qrcode1)
      }) 
    }
    setUrls(a)
    // axios
 
  }

  return (
    <div className='qrCodeContainer'>
      <div className="qrCodeHead">
        <h1 className="qrheader">QR-generate</h1>
        <input type="number" className='qrCodeInput' ref={numberTables} placeholder='How many tables do you have ?'/>
        <button onClick={getQrCode} className='qrCodeBtn'>get Qr Code</button>
      </div>
      <div className="qrCodeWapper">

          {
            urls.map((url,index)=>(
              <div className="qrCodeCard" key={index}>
                <img src={url} alt=''/>
                <div className="qrCodeHeader">
                  <h1>table number {index+1}</h1>
                  <a href={url} download='qrcode.png'>Download</a>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default GetQrCode;










