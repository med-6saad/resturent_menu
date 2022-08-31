import React from 'react'
import './adminSlideBar.css'
function AdminSlideBar({comp,setComp}) {
  return (
    <div className='adminSideBar'>
        <div className="total">
            <h2 className="totalNumber">32470.83 DA</h2>
            <span>Total</span>
        </div>
        <div className="comandNumber">
            <div className="comand">
                <h2>156</h2>
                <span>test</span>
            </div>
            <div className="comand">
                <h2>200</h2>
                <span>test</span>
            </div>
            <div className="comand">
                <h2>235</h2>
                <span>test</span>
            </div>
        </div>
        <div className="miniPages">
            <div className="routesIcon" onClick={()=>setComp('orders')}>
                <img src="/assets/images/orders.png" alt="" className="Icon" />
                <h4 className="orderName">ORDERS</h4>
            </div>
            <div className="routesIcon" onClick={()=>setComp('dashboards')}>
                <img src="/assets/images/dashboard.png" alt="" className="Icon" />
                <h4 className="dashbordName">DASHBORD</h4>
            </div>
            <div className="routesIcon" onClick={()=>setComp('addFoods')}>
                <img src="/assets/images/addFoods.png" alt="" className="Icon" />
                <h4 className="addFoodName">ADD_FOOD</h4>
            </div>
            
            <div className="routesIcon" onClick={()=>setComp('getQrCode')}>
                <img src="/assets/images/qr-code.png" alt="" className="Icon" />
                <h4 className="anatylicName">GET_QR-CODE</h4>
            </div>
            <div className="routesIcon" onClick={()=>setComp('categorys')}>
                <img src="/assets/images/category.png" alt="" className="Icon" />
                <h4 className="settingName">Category</h4>
            </div>
            <div className="routesIcon" onClick={()=>setComp('settings')}>
                <img src="/assets/images/settings.png" alt="" className="Icon" />
                <h4 className="settingName">SETTING</h4>
            </div>
        </div>
    </div>
  )
}

export default AdminSlideBar