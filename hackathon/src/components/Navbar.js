import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Navbar = ({ loged, setLoged }) => {

  const handleOnClick = () => {
    localStorage.clear();
    setLoged(false);
  }

  return (
    <div>
      <nav>
        <section className='logo'>
          <img src='https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOoeEF.img?w=44&h=44' alt='logo' />
          <Menu loged={loged} setLoged={setLoged}/>
        </section>
        <section className='menu'>
          <ul>
            {!loged && <li>
              <Link to={"/"}>Home</Link>
            </li>}
            {!loged && <li>
              <Link to={"/aboutus"}>About Us</Link>
            </li>}
            {!loged && <li>
              <Link to={"/signup"}>Sign Up</Link>
            </li>}
            {!loged && <li>
              <Link to={"/login"}>Login</Link>
            </li>}
            {loged && <li>
              <Link to={"/inventories"} >Inventories</Link>
            </li>}
            {loged && <li>
              <Link to={"/transaction"} >Transaction</Link>
            </li>}
            {loged && <li>
              <Link to={"/spreadsheet"} >Taxes</Link>
            </li>}
            {loged && <li>
              <Link to={"/"} onClick={handleOnClick}>Logout</Link>
            </li>}
          </ul>
        </section>
      </nav>
    </div>
  )
}

export default Navbar;
