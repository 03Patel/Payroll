const mongoose = require('mongoose');

const salarySlipSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true }, // Format: YYYY-MM
  basicSalary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SalarySlip', salarySlipSchema);
