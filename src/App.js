import React, { useState } from "react";
import "./my.css";
function App() {
  const [tincome, setTincome] = useState(0);
  const [texpense, setTexpense] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]); 
  const addItem = (amount, type, category, description) => {
    const parsedAmount = parseFloat(amount) || 0;
    const newItem = { id: Date.now(), amount: parsedAmount, type, category, description };
    setTransactions([...transactions, newItem]);
    if (type === "Income") {
      setTincome((prev) => prev + parsedAmount);
    } else if (type === "Expense") {
      setTexpense((prev) => prev + parsedAmount);
    }
  };
  return (
    <div className="home">
      <div className={`content ${showForm ? "blurred" : ""}`}>
        <h1>Track Your Expenses</h1>
        <p>Balance: ${tincome - texpense}</p>
        <button className="add-btn" onClick={() => setShowForm(true)}>Add</button>
        <div className="table-container">
          <h2>Transactions</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td className={item.type === "Income" ? "income-text" : "expense-text"}>{item.type}</td>
                  <td>{item.category || "-"}</td>
                  <td>{item.description || "-"}</td>
                  <td>${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && <AddData onClose={() => setShowForm(false)} addItem={addItem} />}
    </div>
  );
}

const AddData = ({ onClose, addItem }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const categories = [
    "Food & Groceries", "Shopping", "Transport", "Housing", "Bills & Utilities",
    "Entertainment", "Travel", "Healthcare", "Education", "Personal & Family",
    "Salary", "Business", "Investments", "Side Income", "Loans", "Parental Benefits",
    "Insurance Claims", "Gifts", "Government Support", "Other"
  ];
  const handleSubmit = () => {
    if (amount && type && category) {
      addItem(amount, type, category, description);
      setAmount("");
      setCategory("");
      setDescription("");
      setType("");
      onClose();
    }
  };
  return (
    <>
      <div className="overlay"></div>
      <div className="popup">
        <div className="adddata">
          <div className="button">
            <button className="income-btn" onClick={() => setType("Income")}>Income</button>
            <button className="expense-btn" onClick={() => setType("Expense")}>Expense</button>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Select Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select Category</option>
              {categories.map((cat, ind) => (
                <option key={ind} value={cat}>{cat}</option>
              ))}
            </select>
            <label>Amount:</label>
            <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label>Description:</label>
            <input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="button" onClick={handleSubmit}>Enter</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default App;
