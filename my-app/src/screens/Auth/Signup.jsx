import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending signup request with:", { name, email, password });
      await signup(name, email, password);
      alert("Signup successful! You can now login.");
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message || err.message); // Log the error message
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
