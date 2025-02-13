import React, { useState, useEffect } from 'react';
import { API_URL } from './forms/data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);  // state to store fetched products

  // Fetch the products from the API
  const AllProductshandler = async () => {
    const id = localStorage.getItem('firmid');
    console.log(id);
    
    try {
      const response = await fetch(`${API_URL}/vendor/${id}/products`);
      const data = await response.json();  // assume response is in JSON format

      // Check if the 'products' field exists in the response
      if (data && data.products) {
        setProducts(data.products);  // Update state with fetched products
        console.log(data.products);   // Log the fetched products
      } else {
        console.error('No products found');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products once the component is mounted
  useEffect(() => {
    console.log('Fetching products...');
    AllProductshandler();
  }, []);

  const deletehandle = async (prodelid) => {
    const firmid = localStorage.getItem('firmid');
    if (!firmid || !prodelid) {
      console.error("Missing firmid or productid");
      return;
    }
  
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`${API_URL}/vendor/products/delete/${firmid}/${prodelid}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log("Deleted product:", prodelid);
        setProducts((prevProducts) => prevProducts.filter(p => p._id !== prodelid));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const [t,sett] = useState("")

  useEffect(()=>{
    sett(localStorage.getItem('token'))
    console.log(t)
    console.log("products : ",products)
  },[])

  return (
    t?(
    <div className='box-p'>
      {products.length>0?
          ( products.map((item)=>{
          return (
          <div key={item._id} className='box-pro'>
              <div className="box1-pro">
                  <img src={`${API_URL}/uploads/${item.image}`} alt="photo" className='img-pro'/>
              </div>
              <div className="box2-pro">
                  <div className="name-pro">name:{item.productname}</div>
                  <div className="price-pro">price:{item.price}</div>
                  <button className="delete" onClick={()=>deletehandle(item._id)}>delete</button>
              </div>
          </div>
          )
      })):
            <div className='login-page'><h1>NO PRODUCTS</h1></div>
      }
    </div>):(<div className='login-page'><h1>login required</h1></div>)
  );
};

export default AllProducts;