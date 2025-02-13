import React,{useState} from 'react'
import { API_URL } from './data/apiPath';

const VendorLogin = ({showaddfirmhandler}) => {

  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");

  const loginhandler = async(e)=>{
    e.preventDefault();
    try {
      const responce = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      });
      const data = await responce.json();

      if(responce.ok){
        alert("vendor login successfully");
        console.log("data",data);
        localStorage.setItem('token',data.token);
        if(data.firms>0){
          localStorage.setItem('firmid',data.firms[0]._id);
        }
        setemail("");
        setpassword("");
        showaddfirmhandler();   
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  }

  return (
    <div className='login-page'>
        <div className="box">
          <div className="name">
           <h1 className='h1'>Vendor Login</h1>
          </div>
          <div className="form_div">
            <form action="" className="page" onSubmit={loginhandler}>
                  <label className='label-1'>Email</label>
                  <input type="email" value={email} name='email' onChange={(e)=>setemail(e.target.value)} required/>
                  <label className='label-2'>Passowrd</label>
                  <input type="password" name='password' value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                  <input className='submit' type="submit" value="submit"/>
            </form>
          </div>
        </div>
    </div>
  )
}

export default VendorLogin
