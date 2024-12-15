import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Updated login function to set user state
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store user data and token in the state
      setUser(response.data.user); // Update user with the response data
      localStorage.setItem("authToken", response.data.token); // Store token for authentication in localStorage
    } catch (error) {
      console.error("Login failed", error.response ? error.response.data : error.message);
      throw error; // Handle error if needed
    }
  };

  const signup = async (name, email, password) => {
    try {
      console.log("Sending signup request with data:", { name, email, password });
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup successful", response.data); // Log the response for success
    } catch (err) {
      console.error("Signup error", err.response ? err.response.data : err.message); // Log error response
      throw err; // Rethrow for handling in the component
    }
  };

  const forgotPassword = async (email) => {
    await axios.post("http://localhost:5000/api/auth/forgot-password", {
      email,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
