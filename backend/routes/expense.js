const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth');

// --- Submit Expense (Employee only) ---
router.post('/', authMiddleware(['employee']), async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, employeeId: req.user.id });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Get Expenses (Admin or own expenses) ---
router.get('/', authMiddleware(['admin', 'employee']), async (req, res) => {
  try {
    const query = req.user.role === 'employee' ? { employeeId: req.user.id } : {};
    const expenses = await Expense.find(query);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Update Expense Status (Admin only) ---
router.put('/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
