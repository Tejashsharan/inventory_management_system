import React, { useState, useEffect } from 'react';
import pic from './inventory-update.jpg';

const UpdateInventory = ({ update, setUpdate, notes, setnotes, product_id, data }) => {
  const [inventory, setInventory] = useState({ name: "", tag: "", price: "", quantity: "", product_id: "", image: "" });

  useEffect(() => {
    if (data) {
      setInventory({
        name: data.name || "",
        tag: data.tag || "",
        price: data.price || "",
        quantity: data.quantity || "",
        image: data.image || "",
        product_id:data.itemcode || ""
      });
    }
  }, [data]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the auth-token from localStorage
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("No auth-token found in localStorage");
      return;
    }

    console.log("Auth-token:", authToken);

    try {
      const response = await fetch(`http://localhost:5000/inventory/update/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ 
          name: inventory.name, 
          price: inventory.price, 
          image: inventory.image, 
          itemcode: inventory.product_id, 
          tag: inventory.tag, 
          quantity: inventory.quantity 
        }),
      });

      if (response.status === 401) {
        console.error("Unauthorized request. Please check the auth-token.");
        const errorJson = await response.json();
        console.error("Error details:", errorJson);
        return;
      }

      const json = await response.json();
      console.log("Response JSON:", json);

      const updatedNotes = notes.map(note => note._id === json._id ? json : note);
      setnotes(updatedNotes);
      
      setUpdate(!update);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleOnChange = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
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
      <form onSubmit={handleOnSubmit} style={{ color: "white", height: "auto", maxWidth:"855px",backgroundColor: "rgb(56, 95, 177 , 0.9)", fontWeight: "600" }}>

        <div style={{ display: "flex" }}>
          <img alt="out of stock" src={pic} style={{ width: "50%" }} />
          <div style={{ display: "flex", flexDirection: "column", padding: "10px", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
            <h1 style={{ color: 'white' }}>Upadate Inventory?</h1>

            <label htmlFor='image'>Image</label>
            <input id='image' name='image' type='text' onChange={handleOnChange} value={inventory.image} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the URL of the image" />

            <label htmlFor='name'>Name</label>
            <input id='name' name='name' type='text' onChange={handleOnChange} value={inventory.name} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the name" />

            <label htmlFor='tag'>Tag</label>
            <input id='tag' name='tag' type='text' onChange={handleOnChange} value={inventory.tag} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the tag" />

            <label htmlFor='price'>Price</label>
            <input id='price' name='price' type='text' onChange={handleOnChange} value={inventory.price} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the price" />

            <label htmlFor='quantity'>Quantity</label>
            <input id='quantity' name='quantity' type='text' onChange={handleOnChange} value={inventory.quantity} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the quantity" />

            <label htmlFor='product_id'>Product Id</label>
            <input id='product_id' name='product_id' type='text' onChange={handleOnChange} value={inventory.product_id} style={{marginBottom:"10px",width:"100%",paddingLeft:"15px"}} placeholder="Enter the id"/>

            <input type='submit' style={{ backgroundColor: "green", color: "white", height: "60px", width: "200px", fontSize: "22px", fontWeight: "600" }} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateInventory;
