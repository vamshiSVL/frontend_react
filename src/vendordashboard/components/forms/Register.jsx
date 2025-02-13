import React,{useState} from 'react'
import { API_URL } from './data/apiPath';

const Register = ({showloginhandler}) => {

    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror] = useState("");

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
            const responce = await fetch(`${API_URL}/vendor/register`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({username, email, password})
            });
            const data = await responce.json();
            if(responce.ok){
                console.log("data : ",data);
                console.log("response : ",responce);
                alert("vendor register successfully");
                showloginhandler();
            }
        } catch (error) {
            console.log(error);
            alert("vendor registration failed");
        }
    }
    

  return (
        <div className='login-page'>
            <div className="box">
                <div className="name">
                   <h1 className='h1'>Vendor Register</h1>
                </div>
                <div className="form_div">
                    <form action="" className="page" onSubmit={handlesubmit}>
                        <label className='label-1'>User Name</label>
                        <input type="text" name="username" value={username} onChange={(e)=>setusername(e.target.value)} required/>
                        <label className='label-1' >Email</label>
                        <input type="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                        <label className='label-2'>Passowrd</label>
                        <input type="password"  value={password} onChange={(e)=>setpassword(e.target.value)} name="password" required/>
                        <input className='submit' type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Register
