import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      toast.success("Logged in");
      navigate("/dashboard");
    } catch (err){
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 mb-3" />
        <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border p-2 mb-4" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
