import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import AllProducts from '../components/AllProducts'


const LandingPages = () => {

    const [showlogin,setshowlogin] = useState(false);
    const [showregister,setshowregister] = useState(false);
    const [addfirm,setaddfirm] = useState(false);
    const [addproduct,setaddproduct] = useState(false);
    const [allproduct,setallproduct] = useState(false);

  const showloginhandler = ()=>{
    setshowlogin(true);
    setshowregister(false);
    setaddfirm(false);
    setaddproduct(false);
    setallproduct(false);
  }
  
  const showregisterhandler = ()=>{
    setshowregister(true);
    setshowlogin(false);
    setaddfirm(false);
    setaddproduct(false);
    setallproduct(false);
  }


  const showaddfirmhandler = ()=>{
    setshowregister(false);
    setshowlogin(false);
    setaddfirm(true);
    setaddproduct(false);
    setallproduct(false);
  }


  const showaddproducthandler = ()=>{
    setshowregister(false);
    setshowlogin(false);
    setaddfirm(false);
    setaddproduct(true);
    setallproduct(false);
  }

  const showallproducthandler = ()=>{
    setshowregister(false);
    setshowlogin(false);
    setaddfirm(false);
    setaddproduct(false);
    setallproduct(true);
  }

  return (
    <>
        <section>
            <Navbar showloginhandler = {showloginhandler} showregisterhandler={showregisterhandler}/>
            <div className="collection">
                <Sidebar showaddfirmhandler = {showaddfirmhandler} showaddproducthandler = {showaddproducthandler} showallproducthandler={showallproducthandler}/>
                {showlogin && <Login showaddfirmhandler={showaddfirmhandler}/>}
                {showregister && <Register showloginhandler = {showloginhandler}/>}
                {addfirm && <AddFirm showaddproducthandler={showaddproducthandler}/>}
                {addproduct && <AddProduct/>}
                {allproduct && <AllProducts/>}
            </div>
        </section>
    </>
  )
}

export default LandingPages
