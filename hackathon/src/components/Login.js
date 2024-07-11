import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({loged,setLoged}) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/seller/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token",json.authtoken);
      navigate('/inventories');
      setLoged(!loged)
    } else {
      navigate('/');
    }
  }

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <section className='login' style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center",backgroundImage:'url("https://wallpapercave.com/wp/wp2059232.jpg")' }}>

        <form onSubmit={handleOnSubmit} style={{ display: 'flex', flexDirection: 'column', color: 'white', justifyContent: 'center', alignItems: 'center', border: "2px solid rgb(56, 95, 177)", width: "275px", padding: "20px", borderRadius: "12px" ,backgroundColor:"rgba(0, 128, 0, 0.405)"}}>


          <label htmlFor="email" style={{ fontSize: "16px", margin: "10px" }}>Email</label>


          <input id='email' name='email' type='email' onChange={handleOnChange} value={credentials.email} style={{ fontSize: "16px", margin: "10px", height: "40px", width: "250px", borderRadius: "12px" }} placeholder='  Email'/>


          <label htmlFor='password' style={{ fontSize: "16px", margin: "10px" }}>Password</label>

          <input id='password' name='password' type='password' onChange={handleOnChange} value={credentials.password} style={{ fontSize: "16px", margin: "10px", height: "40px", width: "250px", borderRadius: "12px" }} placeholder='  Password'/>

          <input type='submit' value={"Login"}  style={{ fontSize: "16px", margin: "10px", height: "40px", width: "250px", borderRadius: "12px", cursor: "pointer" ,color:"white",backgroundColor:"rgb(56, 95, 177)"}} />
          
          <span>OR</span>

          <Link to="/signup" style={{ fontSize: "16px", margin: "10px", height: "40px", width: "250px", display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", border: "2px solid rgb(56, 95, 177)", borderRadius: "12px" }}>Signup</Link>

          
        </form>
      </section>
    </div>
  );
}

export default Login;


