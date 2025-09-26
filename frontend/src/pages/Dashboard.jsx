import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    // simple example: fetch counts (you can add an endpoint)
    async function load(){
      try {
        const [salariesRes, expensesRes] = await Promise.all([
          API.get("/salary"),
          API.get("/expense"),
        ]);
        setSummary({
          salaries: salariesRes.data.length,
          expenses: expensesRes.data.length
        });
      } catch (err) { /* ignore */ }
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name || user?.email}</h1>
      <p className="mb-4">Role: <strong>{user?.role}</strong></p>

      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Salary Slips</div>
          <div className="text-2xl font-bold">{summary.salaries ?? "-"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Expenses</div>
          <div className="text-2xl font-bold">{summary.expenses ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
