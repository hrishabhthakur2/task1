import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // UseEffect to check localStorage for an existing user when the app loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
  
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setUser(parsedUser); // Set the user state only if the parsed value is valid
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        // Optionally clear localStorage if the value is corrupt
        localStorage.removeItem("user");
      }
    }
  }, []);
  

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
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in localStorage
    } catch (error) {
      console.error("Login failed", error.response ? error.response.data : error.message);
      throw error; // Handle error if needed
    }
  };

  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("authToken"); // Optionally clear the auth token as well
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
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      console.log('Password reset email sent:', response.data);
    } catch (error) {
      console.error('Error resetting password:', error.response?.data || error.message);
      alert(
        error.response?.data?.message || 
        'An unexpected error occurred. Please try again later.'
      );
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, signup, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
