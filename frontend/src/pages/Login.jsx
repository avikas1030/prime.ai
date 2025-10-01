import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../config.js';
import axios from 'axios';
// import { set } from 'mongoose';


function Login() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
  
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login successful:", result);
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error during Login:", error);
      setLoading(false);
      setErr(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-[450px] h-[500px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[120px] bg-indigo-300 rounded-b-[8%] shadow-gray-300 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 text-3xl font-bold text-[25px]">
            Login to <span className="text-white text-[28px]">Prime</span>
          </h1>
        </div>
        <form className="w-full flex flex-col gap-[20px] px-[30px]" onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus:outline-none focus:border-indigo-400"
          onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <div className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus-within:border-indigo-400 flex items-center relative">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="Password"
              className="w-full h-full focus:outline-none"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <span className="absolute right-[10px] text-sm text-indigo-500 cursor-pointer hover:underline" onClick={()=> setShow(!show)}>
              {`${show ? "Hide" : "Show"}`}
            </span>
          </div>

          {/* <input
            type="password"
            placeholder="Confirm Password"
            className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus:outline-none focus:border-indigo-400"
          /> */}
          {err && <p className='text-red-500 text-sm -mt-2'>{err}</p>}
          <button className="w-full h-[40px] bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-300" disabled={loading}>
            {`${loading ? "Logging In..." : "Login"}`}
          </button>
          <p
            className="text-sm text-center text-gray-500"
            onClick={() => navigate("/login")}
          >
            Do not have Account ?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              SignUP
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login
