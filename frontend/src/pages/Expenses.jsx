import React, { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Expenses() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ month: "", amount: 0, description: "" });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/expense");
      setList(res.data);
    } catch (err) {
      toast.error("Could not load expenses");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expense", form);
      toast.success("Expense submitted");
      setForm({ month: "", amount: 0, description: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submit failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/expense/${id}`, { status });
      toast.success("Updated");
      load();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Expenses</h2>

      {user?.role === "employee" && (
        <form
          onSubmit={submit}
          className="bg-white p-4 rounded shadow mb-6 max-w-2xl"
        >
          <div className="grid grid-cols-3 gap-3">
            <input
              placeholder="Month (YYYY-MM)"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className="border p-2"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="border p-2"
              required
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2"
            />
          </div>
          <button className="mt-3 bg-yellow-600 text-white px-3 py-2 rounded">
            Submit Expense
          </button>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Employee</th>
              <th className="text-left p-2">Month</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="p-2">{e.employeeId}</td>
                <td className="p-2">{e.month}</td>
                <td className="p-2">{e.amount}</td>
                <td className="p-2">{e.description}</td>
                <td className="p-2">{e.status}</td>
                <td className="p-2">
                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => updateStatus(e._id, "approved")}
                        className="mr-2 text-sm bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(e._id, "rejected")}
                        className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
