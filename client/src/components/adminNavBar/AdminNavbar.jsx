import React ,{useContext} from 'react'
import './adminNavBar.css'
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import { useEffect } from 'react';
function AdminNavbar() {
    const {user}=useContext(AuthContext);
    const handleClick=()=>{
        localStorage.clear();
        window.location.reload()
    }
    useEffect(()=>{
        console.log('user:',user.username)
    },[])
  return (
    <div className='adminNavBar'>
        <div className="GlobalCompany">
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="logo">
                    <img src="/assets/images/medTicno.png" alt="pas d'images" className="logoImg" />
                    <h3 className='logoName'>MedTicno</h3>
                </div>
            </Link>
        </div>
        <button className="logOutBtn" onClick={handleClick}>
            Log Out
        </button>
        <div className="search">
            <input type="text" placeholder='Search Orders' className="searshInput" />
            <img src="/assets/images/search.png" alt="pas d'image" className="searchIcon" />
        </div>
        
        <div className="profile">
            <img src="/assets/images/aqua.jpg" alt="pas d'images" className="profileImg" />
            <h3 className="profileName">{user.username}</h3>
        </div>
        
    </div>
  )
}

export default AdminNavbar