import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Signup(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("employee");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      await API.post("/auth/signup", { name, email, password, role });
      toast.success("Signup successful — please login");
      navigate("/login");
    } catch(err){
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="w-full border p-2 mb-2" />
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 mb-2" />
        <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border p-2 mb-2" />
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full border p-2 mb-4">
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
