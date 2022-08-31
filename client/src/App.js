import React,{useContext} from 'react'
import Home from './pages/homePage/App';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import Admin from './pages/adminPage/Admin';
import {BrowserRouter,Switch,Routes,Route} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
function App() {
    const {user}=useContext(AuthContext)
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/admin' element={user?<Admin Comp={'addFoods'}/>:<Login/>}/>
                <Route path="/:userId/:tableId" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App