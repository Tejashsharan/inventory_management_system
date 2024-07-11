import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup';
import InventoryState from './components/InventoryState';
import { useState, useEffect } from 'react';
import TransactionState from './components/TransactionState';

function App() {
  const [loged, setLoged] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setLoged(localStorage.getItem("token"));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar loged={loged} setLoged={setLoged} />
        <div style={{ paddingTop: "75px" }}>
          <Routes>
            <Route path='/' element={loged ? <InventoryState /> : <Home />} />
            <Route path='/login' element={<Login loged={loged} setLoged={setLoged} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/inventories' element={loged ? <InventoryState /> : <Login loged={loged} setLoged={setLoged} />} />
            <Route path='/transaction' element={<TransactionState />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
