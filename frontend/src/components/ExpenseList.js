import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(exp => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;

