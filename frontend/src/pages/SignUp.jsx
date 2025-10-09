import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { setToken } from "../utils/auth";

function SignUp() {
  
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  // signup handler function will be here
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await api.post("/api/auth/signup", {
        userName,
        email,
        password,
      });
      
      // Store token in localStorage for auto-login after signup
      if (result.data.token) {
        setToken(result.data.token);
        navigate("/dashboard"); // Direct to dashboard after signup
      } else {
        navigate("/login");
      }
      
      console.log("Sign up successful:", result);
      setUserName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log("Error during sign up:", error);
      setLoading(false);
      setErr(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-[450px] h-[500px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[120px] bg-indigo-300 rounded-b-[8%] shadow-gray-300 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 text-3xl font-bold text-[25px]">
            Welcome to <span className="text-white text-[28px]">Optima Learn</span>
          </h1>
        </div>
        <form
          className="w-full flex flex-col gap-[20px] px-[30px]"
          onSubmit={handleSignUp}
        >
          <input
            type="text"
            placeholder="Username"
            className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus:outline-none focus:border-indigo-400"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus:outline-none focus:border-indigo-400"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus-within:border-indigo-400 flex items-center relative">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="Password"
              className="w-full h-full focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="absolute right-[10px] text-sm text-indigo-500 cursor-pointer hover:underline"
              onClick={() => setShow(!show)}
            >
              {`${show ? "Hide" : "Show"}`}
            </span>
          </div>

          {/* <input
            type="password"
            placeholder="Confirm Password"
            className="w-full h-[40px] border border-gray-300 rounded-md px-[10px] focus:outline-none focus:border-indigo-400"
          /> */}
          {err && <p className="text-red-500 text-sm -mt-2">{err}</p>}
          <button className="w-full h-[40px] bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-300" disabled={loading}>
            {`${loading ? "Signing Up..." : "Sign Up"}`}
          </button>
          <p
            className="text-sm text-center text-gray-500"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
