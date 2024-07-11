import React, { useState } from 'react'

const Menu = () => {
    const [open, setOpen] = useState(false);

    const handleOnClick = () => {
        setOpen(!open);
    }
    return (
        <>
            <div style={{ margin: "20px", cursor: "pointer" }} onClick={handleOnClick} className={open ? "change" : ""}>
                <div className='bar1'></div>
                <div className='bar2'></div>
                <div className='bar3'></div>
            </div>
            <div className='clickedMenu' style={{display:open?"block":"none"}}>
                <ul style={{listStyle:"none"}}>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Sign Up</li>
                    <li>Login</li>
                </ul>
            </div>
        </>
    )
}

export default Menu
