import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({loged,setLoged}) => {
    const [open, setOpen] = useState(false);

    const handleOnClick = () => {
        setOpen(!open);
    }
    const handleLogOut=()=>{
        localStorage.clear();
        setLoged(false);
    }
    const handle=()=>{
        handleOnClick();
        handleLogOut();
    }
    return (
        <>
            <div style={{ margin: "20px", cursor: "pointer" }} onClick={handleOnClick} className={open ? "change" : ""}>
                <div className='bar1'></div>
                <div className='bar2'></div>
                <div className='bar3'></div>
            </div>
            <div className={'clickedMenu'} style={{display:open?"block":"none"}}>
                <ul style={{listStyle:"none"}}>
                    {!loged && <li><Link onClick={handleOnClick} to={"/"}>Home</Link></li>}
                    {!loged && <li><Link onClick={handleOnClick} to={"/aboutus"}>About Us</Link></li>}
                    {!loged && <li><Link onClick={handleOnClick} to={"/signup"}>Sign Up</Link></li>}
                    {!loged && <li><Link onClick={handleOnClick} to={"/login"}>Login</Link></li>}
                    {loged && <li><Link onClick={handleOnClick} to={"/inventories"}>Inventories</Link></li>}
                    {loged && <li><Link onClick={handleOnClick} to={"/transaction"}>Transaction</Link></li>}
                    {loged && <li><Link onClick={handleOnClick} to={"/spreadsheet"}>Taxes</Link></li>}
                    {loged && <li><Link  onClick={handle} to={"/"}>Logout</Link></li>}
                </ul>
            </div>
        </>
    )
}

export default Menu
