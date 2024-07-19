import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';
import AddTransaction from './AddTransaction';
import UpdateTransaction from './UpdateTransaction';

const TransactionState = () => {
  const [money, setMoney] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [data, setData] = useState({ type: "", amount: "", product: [], id: "" });
  const [id, setId] = useState("");
  const host = "http://localhost:5000";

  const getTransaction = async () => {
    try {
      const response = await fetch(`${host}/transaction/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });
      const json = await response.json();
      console.log(json);
      setMoney(json);
    } catch (error) {
      console.error("Error: can't load transactions:", error);
    }
  };

  const handleOnClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      <div>
        {money.map((mon, index) => (
          <Transaction
            key={mon._id} // Ensure unique key
            date={mon.timestamp}
            name={mon.products}
            amount={mon.amount}
            type={mon.type}
            updateClicked={updateClicked}
            setUpdateClicked={setUpdateClicked}
            data={data}
            setData={setData}
            transaction={mon} // Pass the entire transaction
            setId={setId} // Pass the setId function
            money={money} // Pass the money array
            setMoney={setMoney} // Pass the setMoney function
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
        top: "50%",
        cursor: 'pointer'
      }}>
        +
      </div>
      {clicked && <AddTransaction money={money} setMoney={setMoney} clicked={clicked} setClicked={setClicked} />}
      {updateClicked && <UpdateTransaction money={money} setMoney={setMoney} updateClicked={updateClicked} setUpdateClicked={setUpdateClicked} data={data} setData={setData} id={id} />}
    </>
  );
};

export default TransactionState;
