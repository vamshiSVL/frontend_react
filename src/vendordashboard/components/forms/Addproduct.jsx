import React,{useEffect, useState} from 'react'
import { API_URL } from './data/apiPath';

const AddProduct = () => {

  const [productname,setproductname] = useState('');
  const [price,setprice] = useState('');
  const [category,setcategory] = useState([]);
  const [image,setimage] = useState(null);
  const [description,setdescription] = useState('');

  const categoryhandler = (e) => {
    const v1 = e.target.value;
    setcategory(prevCategory => {
        if (prevCategory.includes(v1)) {
            return prevCategory.filter(item => item !== v1);
        } else {
            return [...prevCategory, v1];
        }
    });
  };

  const formData = new FormData();
  formData.append('productname', productname);
  formData.append('price', price);
  formData.append('category',category); // Convert array to JSON string
  formData.append('description', description);
  formData.append('image', image);

  const addproducthandler = async(e)=>{
    e.preventDefault();
    try{
      const firmid = localStorage.getItem('firmid');
      console.log("firmid : ",firmid)
      console.log( productname,
        price,
        category,
        image,
        description)
      const responce = await fetch(`${API_URL}/vendor/add-products/${firmid}`,{
      method:'POST',
      body:formData
      });
      const data = await responce.json();

      if(responce.ok){
        console.log({"data-product" : data});
        alert("product added successfully");
      }
    } catch (error) {
      console.log(error);
      alert("product added failed");
    }
  }

  const [t,sett] = useState("")

  useEffect(()=>{
    sett(localStorage.getItem('token'))
  })

  return (
    t?(<div className='login-page'>
       <div className="box-add">
            <div className="name">
               <h1 className='h1'>ADD PRODUCT</h1>
            </div>
            <div className="form_div-add">
                <form action="" className="page" onSubmit={addproducthandler}>
                    <label className='label-1'>Product Name</label>
                    <input type="text" name='productname' value={productname} onChange={(e)=>setproductname(e.target.value)} required/>
                    <label className='label-1'>Price</label>
                    <input type="text" name='price' value={price} onChange={(e)=>setprice(e.target.value)} required/>
                    <label className='label-1'>Category</label>
                    <div className="check">
                        <label>Veg</label>
                        <input className='check-1' type="checkbox" onChange={categoryhandler} value="veg"/>
                        <label>Non-Veg</label>
                        <input className='check-2' type="checkbox" onChange={categoryhandler} value="non-veg" />
                    </div>
                    <label className='label-1'>Discription</label>
                    <input type="text" name='discription' value={description} onChange={(e)=>setdescription(e.target.value)} required/>
                    <label className='label-1'>Firm Image</label>
                    <input type="file" onChange={(e)=>setimage(e.target.files[0])} required/>
                    <input className='submit' type="submit" value="submit"/>
                </form>
            </div>
        </div>
    </div>):<div className='login-page'><h1>login required</h1></div>
  )
}

export default AddProduct