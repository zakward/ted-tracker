import React, { useContext } from "react";
import Login from "./Login";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Ted from "./Ted";
import { UserContext } from "./context/userContext";
import BudForm from "./BudForm";

export default function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <>
      <header>
        <h3>T3D TRACK3R</h3>
        <Link to="/budForm">
          <button>Add New Bud</button>
        </Link>
        <button onClick={logout}>LogOut</button>
      </header>
      <Routes>
        <Route path="/ted" element={token ? <Ted /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Navigate to="/ted" /> : <Login />} />
        <Route path="/budform" element={token ? <BudForm /> : <Login />} />
      </Routes>
    </>
  );
}
