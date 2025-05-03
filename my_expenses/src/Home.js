import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import './home.css';
function Home()
{
    const [name,setName]=useState('');
    const [profit,setProfit]=useState(0);
    const [loss,setLoss]=useState(0);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const [tableofdata,setTableofdata]=useState([]);
    useEffect(() =>
    {
        let un=localStorage.getItem("username");
        let en =localStorage.getItem("email");
        let pp=localStorage.getItem("profit");
        let ll=localStorage.getItem("loss");
        setEmail(en);
        setName(un);
        setProfit(Number(pp));
        setLoss(Number(ll));
        let arr=[];
        arr=localStorage.getItem("data");
        setTableofdata((prev) =>[...prev,arr]);
    },[]);
    const logout = () =>
    {
        navigate('/login');
    }
    const update= () =>
    {
        setProfit(p =>p+1);
        console.log(profit);
        axios.post('http://localhost:3001/editd',{name,email,profit : profit+1,loss})
        .then(result =>
            {console.log(result)
                console.log(result.data[0]);
                setProfit(result.data[0])
            })
        .catch(err => console.log(err));
    }
    return(
        <div className="tracker-container">
  <div className="header">
    <p className="title">Recurrence Expense Tracker</p>
    <button className="logout-button" onClick={logout}>Logout</button>
  </div>

  <div className="stats">
    <p className="income">Your Income: <span>{profit}</span></p>
    <p className="loss">Your Loss: <span>{loss}</span></p>
  </div>

  <div className="actions">
    <button className="add-button" onClick={() => navigate('/transaction')}>Add Transaction</button>
    <p>{tableofdata}</p>
  </div>
</div>
    
          ); 
        }    
export default Home;