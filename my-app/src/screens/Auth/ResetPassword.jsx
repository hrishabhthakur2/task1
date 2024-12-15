import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useContext(AuthContext);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("Password reset token sent to your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset token. Please try again.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Token</button>
      </form>
    </div>
  );
};

export default ResetPassword;
