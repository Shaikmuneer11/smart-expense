const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Create expense
router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

