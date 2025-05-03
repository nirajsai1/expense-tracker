import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import "./register.css"
function Register()
{
    const [nameinput,setNameinput]=useState('');
    const [emailadress,setEmailadress]=useState('');
    const [enterpass,setEnterpass]=useState('');
    const [error,setError]=useState('');
    const navigate = useNavigate();
    const submit = () =>
    {
        setError('');
        let n=0,sp=0,lc=0,uc=0;
        let last10=emailadress.slice(-10);
            for(let i=0;i<enterpass.length;i++)
            {
                if(enterpass[i]>='0'&&enterpass[i]<='9')
                {
                    n=n+1;
                }
                else if(enterpass[i]>='a'&&enterpass[i]<='z')
                {
                    lc=lc+1;
                }
                else if(enterpass[i]>='A'&&enterpass[i]<='Z')
                {
                    uc=uc+1;
                }
                else 
                {
                    sp=sp+1;
                }
            }
        if(nameinput.length<4)
        {
            setError("User Name Should contain atleast four Characters")
        }
        else if(emailadress.length<=12||last10!=='@gmail.com')
        {
            setError("enter a valid email");
        }
        else if(enterpass.length<8||n===0||sp===0||lc===0||uc===0)
        {
            setError("your password should be atleast of length 8 and contain atleast 1 number , 1 uppercase , 1 lowercase and 1 special character");
        }
        else{
        axios.post('http://localhost:3001/register', { name : nameinput, email :emailadress, password :enterpass, profit : 0 , loss : 0,transaction_data : []})
        .then(
            (result) => 
                {console.log(result.data)
            move();}
        )
        .catch(err => console.log(err));
    }
    }
    const move = () =>
    {
        navigate('/login');
    }
    return(
        <>
        <div className="intro">
            <p>Sign Up...</p>
            <p>Create Your Account</p>
            <div className="align">
        <input className="input" type='text' onChange={(e) =>setNameinput(e.target.value)} placeholder="enter name"></input>
        <input className="input" type="email" onChange={(e) =>setEmailadress(e.target.value)} placeholder="enter email"></input>
        <input className="input" type="password" onChange={(e) =>setEnterpass(e.target.value)} placeholder="enter password"></input>
        </div>
        <div className="onlybuttons"> 
        <button onClick={submit}>Register</button>
        <div className="lastdiv">
            <p>Already have a account...</p>
        <button onClick={move} className="login-button">Login</button>
        </div>
       </div>
        <p>{error}</p>
        </div>
        </>
    );
}
export default Register;