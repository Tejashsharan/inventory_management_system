import React, { useState } from 'react'
import pic from './Screenshot (68).png'

const AddInventory = ({clicked,setclicked,notes,setnotes}) => {

  const [inventory,setInventory]=useState({name:"",tag:"",price:"",quantity:"",product_id:"",image:""})
  
  const handleOnSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/inventory/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ name: inventory.name, price: inventory.price,image:inventory.image,itemcode:inventory.product_id,tag:inventory.tag,quantity:inventory.quantity }),
    });

    const json= await response.json();
    console.log(json);

    setnotes([...notes,json]);
    setclicked(!clicked)

  };

  const handleOnChange = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  }

  const handleOnClick=()=>{
    setclicked(!clicked)
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 1000
    }}>

      <form onSubmit={handleOnSubmit} style={{color:"white",height:"auto", backgroundColor:"rgb(56, 95, 177 , 0.9)" , fontWeight:"600"}
      }>
        <div style={{display:"flex"}}>

          {/* /////////////////////////////// */}


          <img className='large' alt="out of stokes" src={pic} style={{width:"50%"}}/>
          <div style={{display:"flex", flexDirection:"column",padding:"10px",justifyContent:"center",alignItems:"flexStart",width:"100%"}}>

            <div style={{display:"flex",
              alignItems:"center",
              justifyContent:"space-between"
            }}>
            <h1 style={{color:'white'}}>Add Inventory ?</h1>
            <div style={{
              height:"28px",
              width:"30px",
              backgroundColor:"red",
              padding:"2px 9px",
              cursor:"pointer"
            }} onClick={handleOnClick}>X</div>
            </div>

            <label htmlFor='image'>Image</label>
            <input id='image' name='image' type='text' onChange={handleOnChange} value={inventory.image} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the url of the image"/>

            <label htmlFor='name'>Name</label>
            <input id='name' name='name' type='text' onChange={handleOnChange} value={inventory.name} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the name"/>

            <label htmlFor='tag'>Tag</label>
            <input id='tag' name='tag' type='text' onChange={handleOnChange} value={inventory.tag} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the tag"/>

            <label htmlFor='price'>Price</label>
            <input id='price' name='price' type='text' onChange={handleOnChange} value={inventory.price} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the price"/>
            
            <label htmlFor='quantity'>Quantity</label>
            <input id='quantity' name='quantity' type='text' onChange={handleOnChange} value={inventory.quantity} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the quantity"/>

            <label htmlFor='product_id'>Product Id</label>
            <input id='product_id' name='product_id' type='text' onChange={handleOnChange} value={inventory.product_id} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the id"/>


            <input type='submit' style={{backgroundColor:"green", color:"white",height:"60px", width:"200px",fontSize:"22",fontWeight:"600"}}/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddInventory
