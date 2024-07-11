import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission

        try {
            const response = await fetch(`http://localhost:5000/seller/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem("token", json.authtoken);
                navigate('/inventories');  // Navigate to home page on success
            } else {
                console.error("Signup failed: ", json.error);
                navigate('/');
                // Optionally, you can navigate to an error page or show an error message
            }
        } catch (error) {
            console.error("An error occurred:", error);
            // Optionally, handle the error, show a message, etc.
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <section className='signup'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input id='name' type='text' name='name' onChange={handleOnChange} value={credentials.name} placeholder='  Name'/>
                    <label htmlFor="email">Email</label>
                    <input id='email' type='email' name='email' onChange={handleOnChange} value={credentials.email} placeholder='  Email'/>
                    <label htmlFor="password">Password</label>
                    <input id='password' type='password' name='password' onChange={handleOnChange} value={credentials.password} style={{ marginBottom: "10px" }} placeholder='  Password'/>
                    <input type='submit' value="Sign Up" style={{ margin: "10px" ,cursor:"pointer",backgroundColor:"rgb(56, 95, 177)" ,color:"white"}}/>
                    <span>OR</span>
                    <Link to={"/login"} style={{ margin: "10px", color: "white", textDecoration: "none", borderRadius: "12px", border: "2px solid rgb(56, 95, 177)", height: "40px", width: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>Login</Link>
                </form>
            </section>
        </div>
    )
}

export default Signup
