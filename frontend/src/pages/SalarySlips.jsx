import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SalarySlips(){
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ employeeId:"", month:"", basicSalary:0, bonus:0, deductions:0 });

  useEffect(()=>{ load(); }, []);

  const load = async ()=> {
    try {
      const res = await API.get("/salary");
      setList(res.data);
    } catch (err){ toast.error("Could not load salary slips"); }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const total = Number(form.basicSalary) + Number(form.bonus) - Number(form.deductions);
      await API.post("/salary", { ...form, total });
      toast.success("Salary slip created");
      setForm({ employeeId:"", month:"", basicSalary:0, bonus:0, deductions:0 });
      load();
    } catch (err) { toast.error(err.response?.data?.message || "Create failed"); }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Salary Slips</h2>

      {user?.role === "admin" && (
        <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="EmployeeId" value={form.employeeId} onChange={(e)=>setForm({...form, employeeId:e.target.value})} className="border p-2" required />
            <input placeholder="Month (YYYY-MM)" value={form.month} onChange={(e)=>setForm({...form, month:e.target.value})} className="border p-2" required />
            <input type="number" placeholder="Basic Salary" value={form.basicSalary} onChange={(e)=>setForm({...form, basicSalary:e.target.value})} className="border p-2" />
            <input type="number" placeholder="Bonus" value={form.bonus} onChange={(e)=>setForm({...form, bonus:e.target.value})} className="border p-2" />
            <input type="number" placeholder="Deductions" value={form.deductions} onChange={(e)=>setForm({...form, deductions:e.target.value})} className="border p-2" />
          </div>
          <button className="mt-3 bg-blue-600 text-white px-3 py-2 rounded">Create Salary Slip</button>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Employee</th>
              <th className="text-left p-2">Month</th>
              <th className="text-left p-2">Basic</th>
              <th className="text-left p-2">Bonus</th>
              <th className="text-left p-2">Deductions</th>
              <th className="text-left p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {list.map(s => (
              <tr key={s._id} className="border-t">
                <td className="p-2">{s.employeeId}</td>
                <td className="p-2">{s.month}</td>
                <td className="p-2">{s.basicSalary}</td>
                <td className="p-2">{s.bonus}</td>
                <td className="p-2">{s.deductions}</td>
                <td className="p-2">{s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
