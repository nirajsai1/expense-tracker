import React, { useState, useEffect } from 'react';
import {  ref, set, get, child } from 'firebase/database';
import './my.css'
import { database } from './firebaseConfig';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [lastTransaction, setLastTransaction] = useState('');

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, 'data')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const fetchedTransactions = [];
                let totalIncome = 0;
                let totalExpense = 0;

                for (let key in data) {
                    const transaction = {
                        id: key,
                        ...data[key],
                    };
                    fetchedTransactions.push(transaction);
                    if (parseFloat(transaction.amount) > 0) {
                        totalIncome += parseFloat(transaction.amount);
                    } else {
                        totalExpense += parseFloat(transaction.amount);
                    }
                }

                setTransactions(fetchedTransactions);
                setIncome(totalIncome);
                setExpense(totalExpense);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error("Error fetching data", error);
            setError('Error fetching data');
        });
    }, []);

    const handleTransaction = (type) => {
        const amountValue = parseFloat(amount);

        if (!description || isNaN(amountValue) || amountValue <= 0) {
            setError('Details Not Correct');
            return;
        }

        const upperCaseDescription = description.toUpperCase();
        const transaction = {
            name: upperCaseDescription,
            amount: type === 'income' ? amountValue : -amountValue,
        };

        if (type === 'income') {
            setIncome(prevIncome => prevIncome + amountValue);
        } else {
            setExpense(prevExpense => prevExpense + amountValue);
        }

        setTransactions([...transactions, transaction]);
        setLastTransaction(`Last Transaction: Description: ${description}   Amount: ${type === 'income' ? '+' : '-'}${amount}`);

        const newTransactionRef = ref(database, 'data/' + Date.now());
        set(newTransactionRef, transaction)
            .then(() => console.log("Transaction added"))
            .catch((error) => alert("Error adding transaction"));

        resetForm();
    };

    const resetForm = () => {
        setAmount('');
        setDescription('');
        setError('');
    };

    return (
        <div className="container">
            <h1>Expense Tracker</h1>
            <p><strong>TOTAL INCOME:</strong> ${income}</p>
            <p><strong>TOTAL EXPENSE:</strong> ${expense}</p>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Description'
            />
            <input
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                placeholder='Amount'
            />
            <button onClick={() => handleTransaction('income')}>INCOME</button>
            <button onClick={() => handleTransaction('expense')} className="expense">EXPENSE</button>
            <div>
                {error && <p className="error">{error}</p>}
                <p id="amo">{lastTransaction}</p>
                <p><strong>Recent Transactions:</strong></p>
                <ol className='mytab'>
                    {transactions.map((item, index) => (
                        <li key={index} className={parseFloat(item.amount) > 0 ? 'income' : 'expense'}>
                            {item.name}<br />${Math.abs(item.amount)}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default App;

