import React from 'react';
import { Link } from 'react-router-dom';

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
        </section>
        <section className='menu'>
          <ul>
            {!loged && <li>
              <Link style={{ color: 'white' }} to={"/"}>Home</Link>
            </li>}
            {!loged && <li>
              <Link style={{ color: 'white' }} to={"/"}>About Us</Link>
            </li>}
            {!loged && <li>
              <Link style={{ color: 'white' }} to={"/signup"}>Sign Up</Link>
            </li>}
            {!loged && <li>
              <Link style={{ color: 'white' }} to={"/login"}>Login</Link>
            </li>}
            {loged && <li>
              <Link style={{ color: 'white' }} to={"/inventories"} >Inventories</Link>
            </li>}
            {loged && <li>
              <Link style={{ color: 'white' }} to={"/transaction"} >Transaction</Link>
            </li>}
            {loged && <li>
              <Link style={{ color: 'white' }} to={"/"} onClick={handleOnClick}>Logout</Link>
            </li>}
          </ul>
        </section>
      </nav>
    </div>
  )
}

export default Navbar;
