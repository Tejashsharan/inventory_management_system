import React, { useState, useEffect } from 'react';
import Items from './Items';
import AddInventory from './AddInventory';
import UpdateInventory from './UpdateInventory';

const InventoryState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);
  const [clicked,setClicked] = useState(false);
  const [update,setUpdate] = useState(false);
  const [id,setId] = useState(null);
  const [data,setData] = useState({name:"",price:"",image:"",tag:"",quantity:"",itemcode:""})
  const [change,setChange] = useState("");
  const [searched ,setSearched] = useState(false);

  const handleOnClick=()=>{
    setClicked(!clicked);
  }

  const getInventory = async () => {
    try {
      const response = await fetch(`${host}/inventory/getinventory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
      });

      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedNotes = [...notes];
    updatedNotes[index].quantity = newQuantity;
    setNotes(updatedNotes);
  };

  const handleOnChange = (e)=>{
    setChange(e.target.value);
  }

  const handleOnSearch = async(e)=>{

    try {
      e.preventDefault();
      const queryParams = new URLSearchParams({ name: change }).toString();
      const response = await fetch(`${host}/inventory/search?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });

      const json = await response.json();
      console.log(json);
      setNotes(json);
      setSearched(true)
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }

  }

  const onBack=async()=>{
    setChange("");
    setSearched(false);
    await getInventory();
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
    <form  onSubmit={handleOnSearch} style={{
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      margin:"20px 5px 5px 5px",
      position:"fixed",
      zIndex:"1000",
      width:"100%"
      }}>
      <input type='text' value={change} onChange={handleOnChange} placeholder='search' style={{
        paddingLeft:"10px"
        ,height:"35px"
      }}/>
      {!searched && <img src='https://th.bing.com/th/id/OIP.aewliRTPoYpyQhGwOlCaPAHaHa?rs=1&pid=ImgDetMain' alt='search' style={{
        height:"35px",
        width:"35px",
      }} onClick={handleOnSearch}/>}
      
      {searched && <img alt='back' src='https://icons.veryicon.com/png/System/Longhorn%20R2/Back%20Button.png'style={{
        width:"35px",
        height:"35px"
      }} onClick={onBack}/>}
      </form>

      <div style={styles.gridContainer}>
        {notes.map((note,i) => (
          <Items
            key={note.itemcode}
            name={note.name}
            price={note.price}
            image={note.image}
            itemcode={note.itemcode}
            tag={note.tag}
            quantity={note.quantity}
            product_id={note._id}
            index={i}
            notes={notes}
            setNotes={setNotes}
            update={update}
            setUpdate={setUpdate}
            id={id}
            setId={setId}
            data={data}
            setData={setData}
            updateQuantity={updateQuantity}
          />
        ))}

      </div>

      <div onClick={handleOnClick} style={{
         height: "50px",
          width: "50px", 
          backgroundColor: "green", 
          color: "white", 
          borderRadius: "50%", 
          padding: "5px 0 0 18px", 
          fontSize: "25px", 
          fontWeight: "600", 
          position: "fixed", 
          right: "20px",
          top:"50%", 
          cursor:'pointer',
          zIndex:"1001"}}>
        +
      </div>
      {clicked && <AddInventory notes={notes} setnotes={setNotes} clicked={clicked} setclicked={setClicked}/>}
      {update && <UpdateInventory notes={notes} setnotes={setNotes} update={update} setUpdate={setUpdate} product_id={id} data={data}/>}
    </>

  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(375px, 1fr))",
    gap: "20px",
    padding: "20px"
  }
};

export default InventoryState;
