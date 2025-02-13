import React, { useState } from 'react'

const Sidebar = ({showaddfirmhandler,showaddproducthandler,showallproducthandler}) => {

  const [select,setselect] = useState('')

  return (
    <div className='sidesec'>
      <ul className='list'>
        <li className={select=='addfirm'?'cset':''} onClick={()=>{
          showaddfirmhandler()
          setselect('addfirm')
        }}>Add Firm</li>
        <li className={select=='addpro'?'cset':''} onClick={()=>{
          showaddproducthandler()
          setselect('addpro')
          }}>Add product</li>
        <li className={select=='allpro'?'cset':''} onClick={()=>{
          showallproducthandler()
          setselect('allpro')
        }}>All products</li>
      </ul>
    </div>
    )
}

export default Sidebar