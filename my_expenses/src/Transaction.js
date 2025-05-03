import React, { useEffect } from "react";
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import './transaction.css';
import axios from "axios";
function Transaction()
{
    const [email,setEmail]=useState('');
    const [type,setType]=useState(false);
    const [cfd,setCfd]=useState(true);
    const [cfr,setCfr]=useState(true);
    const [income,setIncome]=useState(false);
    const [expense,setExpense]=useState(false);
    const [transaction,setTransaction]=useState('');
    const [amount,setAmount]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [recurrence,setRecurrence]=useState('');
    const [ramount,setRamount]=useState('');
    const [paymentday,setPaymentday]=useState('');
    const rec=["monthly","quarterly","half yearly","yearly"];
    const categories = [
        "Food & Groceries", "Shopping", "Transport", "Housing", "Bills & Utilities",
        "Entertainment", "Travel", "Healthcare", "Education", "Personal & Family",
        "Salary", "Business", "Investments", "Side Income", "Loans", "Parental Benefits",
        "Insurance Claims", "Gifts", "Government Support", "Other"
      ];
      const days=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      const types=["Subscription","EMI/Loan","Bill","others"];
      const [dataofrec,setDataofrec]=useState('');
      useEffect(() =>
    {
        let en =localStorage.getItem("email");
        setEmail(en);
    },[]);
    const validate = () =>
    {
        axios.post("http://localhost3001/add_data",{transaction,amount,category,email})
        .then(result =>console.log(result))
        .catch(err =>console.log(err));
    }
      const recsubmit = () =>
      {
        if(ramount!==''&& recurrence!=='' && name!=='' && paymentday!=='' && dataofrec!=='')
        {
            navigate('/home');
        }
      }
    return(
        <div>
            <div className="buttons-align">
        <button onClick={() =>{setType(false); setCfd(false); setCfr(true)}} style={{backgroundColor : cfd ? "white" : "lightblue" , fontWeight:"bolder"}} className="button">Daily</button>
        <button onClick={() =>{setType(true); setCfr(false); setCfd(true)}} style={{backgroundColor : cfr ? "white" : "lightblue" , fontWeight:"bolder"}} className="button">Recurring</button>
        </div>
        {
            type ? 
            (
                
                <div>
                    <select onChange={(e) =>setRecurrence(e.target.value)}>
                    {
                        types.map((item,ind) =>
                        (
                            <option>{item}</option>
                        ))
                    }
                    </select>
                    <input type="text" onChange={(e) =>setName(e.target.value)} placeholder="Name"></input>
                    <input type="text" onChange={(e) =>setRamount(e.target.value)} placeholder="Amount"></input>
                    <select onChange={(e) => setPaymentday(e.target.value)}>
                        {
                            days.map((item,ind) =>
                            (
                                <option>{item}</option>
                            ))
                        }
                    </select>
                    <select onChange={(e) =>setDataofrec(e.target.value)}>
                        {
                            rec.map((item,ind) =>
                            (
                                <option>{item}</option>
                            ))
                        }
                    </select>
                    <button onClick={recsubmit}>Add</button>
                </div>
            ) : 
            (
                <div className="daily">
                    <div className="ttype">
                <button onClick={() =>{setTransaction('income'); setIncome(true); setExpense(false)}} style={{backgroundColor : income ? "lightgreen" : "white"}} className="button">Income</button>
                <button onClick={() =>{setTransaction('expense'); setIncome(false); setExpense(true)}} style={{backgroundColor : expense ? "red" : "white"}} className="button">Expense</button>
                </div>
                <div className="ttype">
                <label>Select category:</label>
                <select onChange={(e) =>setCategory(e.target.value)}>
                    {
                        categories.map((item,ind) =>
                        (
                            <option>{item}</option>
                        ))
                    }
                </select>
                </div>
                <input type="text" onChange={(e) => setAmount(e.target.value)} placeholder="enter amount" className="button"></input>
                <input type="text" onChange={(e) =>setDescription(e.target.value)} placeholder="enter description" className="button"></input>
                <button onClick={validate}>Submit</button>
                </div>
            )
        }
        </div>
    );
}
export default Transaction;