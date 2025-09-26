const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true }, // Format: YYYY-MM
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
