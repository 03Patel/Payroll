const express = require('express');
const router = express.Router();
const SalarySlip = require('../models/salarySlip');
const authMiddleware = require('../middleware/auth');

// --- Create Salary Slip (Admin only) ---
router.post('/', authMiddleware(['admin']), async (req, res) => {
  try {
    const salary = await SalarySlip.create(req.body);
    res.status(201).json(salary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Get all Salary Slips (Admin) or own slips (Employee) ---
router.get('/', authMiddleware(['admin', 'employee']), async (req, res) => {
  try {
    const query = req.user.role === 'employee' ? { employeeId: req.user.id } : {};
    const salaries = await SalarySlip.find(query);
    res.status(200).json(salaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Update Salary Slip (Admin only) ---
router.put('/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const updatedSalary = await SalarySlip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSalary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
