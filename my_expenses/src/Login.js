import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./login.css"
function Login()
{
    const [email_address,setEmail_address]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate('');
    const submit = () =>
    {
        axios.post("http://localhost:3001/login",{email_address,password})
        .then((result) =>
            {if(result.data!=="password incorrect" && result.data!=="no record exists")
            {
                localStorage.setItem("username",result.data[0]);
                localStorage.setItem("email",email_address);
                localStorage.setItem("profit",Number(result.data[1]));
                localStorage.setItem("loss",Number(result.data[2]));
                move();
            }
            else
            {
                console.log(result.data);
            }
    })
        .catch((err) =>console.log(err));
    }
    const move = () =>
    {
        navigate('/home');
    }
    return(
        <div className="form-container">
    <input type="text" onChange={(e) => setEmail_address(e.target.value)} placeholder="enter email" />
    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="enter password" />
    <button onClick={submit}>Submit</button>
    <button onClick={() => navigate('/')}>New Account?</button>
</div>
    );
}
export default Login;