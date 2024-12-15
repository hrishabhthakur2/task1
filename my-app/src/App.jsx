import React from "react";
import { Routes, Route } from "react-router-dom";
//import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./screens/Auth/Dashboard";
import Login from "./screens/Auth/Login";
import { AuthProvider } from "./context/AuthContext"; // Wrap with AuthProvider
const Home = () =>  <div></div>
function App() {
  return (
    // <AuthProvider>
       
    //   Hello
    // </AuthProvider>
    <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route
          path="/dashboard"
          //element={<ProtectedRoute element={<Dashboard />} />}
          element={Home}
        /> */}
      </Routes>
  );
}

export default App;
