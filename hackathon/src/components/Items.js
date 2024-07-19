import React from 'react';

const Items = ({ name, price, image, itemcode, tag, quantity,product_id ,index,notes,setNotes,update,setUpdate,id,setId,data,setData}) => {

    const host = "http://localhost:5000";

    const toupper = (str) => {
        return str.split(" ").map((st) => {
            return st.charAt(0).toUpperCase() + st.slice(1);
        }).join(" ");
    };

    const handleOnDelete=async()=>{
        try {
            await fetch(`${host}/inventory/delete/${product_id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
              },
            });
      
            setNotes(notes.filter((note,i) => i !== index));
            
          } catch (error) {
            console.error('Error deleting item:', error);
          }
    };

    const handleOnUpdate=async()=>{
        
        setUpdate(!update);
        setId(product_id);
        setData({name:name,price:price,image:image,tag:tag,quantity:quantity,itemcode:itemcode});

    };

    const handleIncrease=async()=>{
        try {
            const response=await fetch(`${host}/inventory/updatequantity/${product_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
              },
              body: JSON.stringify({ increment: 1 })
            });
      
            const json= await response.json()
            const updatedNotes = notes.map(note => note._id === json._id ? json : note);
            setNotes(updatedNotes);
            
          } catch (error) {
            console.error('Error increasing the quantity of the item:', error);
          }
    }

    const handleDecrease=async()=>{
        try {
            const response=await fetch(`${host}/inventory/updatequantity/${product_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
              },
              body: JSON.stringify({ increment: -1 })
            });
      
            const json= await response.json()
            const updatedNotes = notes.map(note => note._id === json._id ? json : note);
            setNotes(updatedNotes);
            
          } catch (error) {
            console.error('Error increasing the quantity of the item:', error);
          }
    }

    return (
        <div className='items-container' style={{ maxWidth: "341px", border: "2px solid green", color: "green", fontFamily: "Arial, sans-serif", margin: "auto", marginTop: "50px", borderRadius: "12px"}}>
            <img src={image} style={{ height: "290px", width: "337px", borderRadius: "12px" }} alt='product' />

            <div style={{ display: 'flex', width: "100%" ,justifyContent:"space-around"}}>
                <p style={{ height: "auto", maxWidth: "100px", margin: "10px", borderRadius: "12px", padding: "10px", backgroundColor: 'green', color: "white" }}>{toupper(tag)}</p>

                <div>

                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 -0.5 21 21"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                        aria-labelledby="delete-icon-title"
                        role="img"
                        style={{ marginTop: "20px" , cursor:"pointer"}}

                        onClick={handleOnDelete}

                    >
                        <title id="delete-icon-title">Delete Icon</title>
                        <desc>Created with Sketch.</desc>
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="green">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path
                                            d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                                            id="delete-[#10ed0c]"
                                        >
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>


                    <svg aria-label='edit' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: "20px",marginLeft:"5px", cursor:"pointer" }}
                    onClick={handleOnUpdate}><g id="SVGRepo_bgCarrier" strokeWidth="0" ></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17V17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                    </svg>
                </div>
            </div>

            <div className='card font' style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <p style={{ fontSize: "25px", fontWeight: "600" }}>{toupper(name)}</p>
                <p>RS {price}</p>
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                    <span style={{ height: "30px", width: "30px", backgroundColor: "green", color: 'white', fontSize: "20px", lineHeight: "30px", borderRadius: "10px", fontWeight: "600", textAlign: "center", cursor: "pointer" ,userSelect:'none'}} onClick={handleIncrease}>+</span>


                    <p>Quantity: {quantity}</p>

                    
                    <span style={{ height: "30px", width: "30px", backgroundColor: "green", color: 'white', fontSize: "20px", lineHeight: "30px", borderRadius: "10px", fontWeight: "600", textAlign: "center", cursor: "pointer", userSelect:"none"}} onClick={handleDecrease}>-</span>
                </div>
                <p>{itemcode}</p>
            </div>
        </div>
    );
};

export default Items;
