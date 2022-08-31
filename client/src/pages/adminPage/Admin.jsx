import React,{useContext,useState} from "react";
import './admin.css'
import AdminNavbar from "../../components/adminNavBar/AdminNavbar";
import AdminSlideBar from "../../components/adminSlideBar/AdminSlideBar";
import AdminBody from "../../components/adminBody/AdminBody";
import AddFoods from '../../components/addFoods/AddFoods';
import Orders from "../../components/orders/Orders";
import GetQrCode from "../../components/getQrCode/GetQrCode";
import Category from "../../components/categorys/Category";
import Dashboard from "../../components/dashboroard/Dashboard";
import Settings from "../../components/settings/Settings";
import { AuthContext } from "../../context/AuthContext";

function Admin({Comp}){
    const {user}=useContext(AuthContext);
    const [comp,setComp]=useState('')
    const objectT=()=>{
        switch (comp){
            case "orders":return <Orders/>;
            case "getQrCode":return <GetQrCode/>;
            case "dashboards":return <Dashboard/>;
            case "settings":return <Settings/>;
            case "addFoods":return <AddFoods/>;
            case "categorys":return <Category/>;
            default: return <Orders/>;
        }
    }
    return (
        <div className="adminContainer">
            <div className="adminWrapper">
                <div className="a-navbar">
                    <AdminNavbar/>
                </div>
                <div className="a-sideBar-body">
                    <AdminSlideBar comp={comp} setComp={setComp}/> 
                    {((objectT()))}                   
                </div>
            </div>
        </div>
    )
}
export default Admin;