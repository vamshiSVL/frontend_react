import React, { useEffect, useState } from 'react'
const Navbar = ({showloginhandler,showregisterhandler}) => {

const showlogouthandler = ()=>{
  if(confirm("are you sure to logout??")
  ){
    localStorage.removeItem('token')
    window.location.reload()
  }
}

const [tok,settok] = useState("")
  useEffect(()=>{
    const a = localStorage.getItem('token')
    settok(a)
  },[])

  return (
    <div className='navsec'>
      <div className="company">
        EATEASY
      </div>
      <div className="login">
        {
       tok?(
        <span onClick={showlogouthandler}>Logout</span>
      ): (
            <>
                <span onClick={showloginhandler}>Login</span>
                <span onClick={showregisterhandler}> / Register</span>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
