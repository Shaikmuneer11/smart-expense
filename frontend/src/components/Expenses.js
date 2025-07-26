import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // Fetch expenses on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add expense
  const addExpense = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/expenses', {
      title,
      amount,
      category
    })
    .then(res => setExpenses(prev => [...prev, res.data]))
    .catch(err => console.error(err));

    setTitle('');
    setAmount('');
    setCategory('');
  };

  // Delete expense
  const deleteExpense = (id) => {
    axios.delete(`http://localhost:5000/api/expenses/${id}`)
      .then(() => setExpenses(prev => prev.filter(exp => exp._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Expenses</h2>

      <form className="mb-4" onSubmit={addExpense}>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Add Expense</button>
      </form>

      <ul className="list-group">
        {expenses.map(exp => (
          <li key={exp._id} className="list-group-item d-flex justify-content-between align-items-center">
            {exp.title} - ₹{exp.amount} ({exp.category})
            <button className="btn btn-sm btn-danger" onClick={() => deleteExpense(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;

