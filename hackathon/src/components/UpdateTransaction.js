import React, { useEffect, useState } from 'react';
import pic from './money.jpg';

const UpdateTransaction = ({money,setMoney,updateClicked,setUpdateClicked,data,setData,id}) => {

  const [transaction, setTransaction] = useState({
    type: "", 
    amount: ""
  });
  const [product, setProduct] = useState([{ name: "", quantity: "", price: "" }]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/transaction/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ ...transaction, product }),
    });

    const json = await response.json();
    console.log(json);

    const UpdateTransaction = money.map((m)=>m._id===id?json:m);

    setMoney(UpdateTransaction);
    setUpdateClicked(!updateClicked);
  };

  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, e) => {
    const newproduct = product.slice();
    newproduct[index][e.target.name] = e.target.value;
    setProduct(newproduct);
  };

  const addProduct = () => {
    setProduct([...product, { name: "", quantity: "", price: "" }]);
  };

  const removeProduct = (index) => {
    const newproduct = product.slice();
    newproduct.splice(index, 1);
    setProduct(newproduct);
  };

  useEffect(() => {
    if (data) {
      setTransaction({
        type: data.type || "",
        amount: data.amount || ""
      });

      // Ensure products is an array before mapping
      if (Array.isArray(data.product)) {
        setProduct(data.product.map(product => ({
          name: product.name || "",
          price: product.price || "",
          quantity: product.quantity || ""
        })));
      }
    }
    console.log(data);
  }, [data]);

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
      <form onSubmit={handleOnSubmit} style={{
        color: "white",
        height: "auto",
        backgroundColor: "rgb(56, 95, 177 , 0.9)",
        fontWeight: "600",
        borderRadius: "10px",
        maxWidth:"855px"
      }}>
        <div style={{ display: "flex" }}>
          <img alt="out of stock" src={pic} style={{ width: "50%" }} />
          <div style={{ display: "flex", flexDirection: "column", padding: "10px", justifyContent: "center", alignItems: "flexStart", width: "100%" }}>
            <h1 style={{ color: 'white' }}>Add Transaction</h1>

            <label htmlFor='type'>Type</label>
            <input id='type' name='type' type='text' onChange={handleTransactionChange} value={transaction.type} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the type" />

            {product.map((product, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label htmlFor={`name-${index}`}>Product Name</label>
                <input id={`name-${index}`} name='name' type='text' onChange={(e) => handleProductChange(index, e)} value={product.name} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the product name" />

                <label htmlFor={`quantity-${index}`}>Quantity</label>
                <input id={`quantity-${index}`} name='quantity' type='number' onChange={(e) => handleProductChange(index, e)} value={product.quantity} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the quantity" />

                <label htmlFor={`price-${index}`}>Price</label>
                <input id={`price-${index}`} name='price' type='number' onChange={(e) => handleProductChange(index, e)} value={product.price} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the price" />

                {index > 0 && (
                  <button type="button" onClick={() => removeProduct(index)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px", cursor: "pointer" }}>Remove</button>
                )}
              </div>
            ))}

            <button type="button" onClick={addProduct} style={{ backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", marginBottom: "10px" }}>Add Product</button>

            <label htmlFor='amount'>Amount</label>
            <input id='amount' name='amount' type='number' onChange={handleTransactionChange} value={transaction.amount} style={{ marginBottom: "10px", width: "100%", paddingLeft: "15px" }} placeholder="Enter the amount" />

            <input type='submit' style={{ backgroundColor: "green", color: "white", height: "60px", width: "200px", fontSize: "22", fontWeight: "600" }} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateTransaction
