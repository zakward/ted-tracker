import React, { useContext } from "react";
import Login from "./Login";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Ted from "./Ted";
import { UserContext } from "./context/userContext";
import BudForm from "./BudForm";
import Profile from "./Profile";

export default function App() {
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();
  function handleProfileClick() {
    navigate("/profile");
  }
  function handlePublicClick() {
    navigate("/ted");
  }

  return (
    <>
      <header>
        <h3>T3D TRACK3R</h3>
        <Link to="/budForm">
          <button>Add New Bud</button>
        </Link>
        <button onClick={handleProfileClick}>Profile Page</button>
        <button onClick={handlePublicClick}>Public Page</button>
        <button onClick={logout}>LogOut</button>
      </header>
      <Routes>
        <Route path="/ted" element={token ? <Ted /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Navigate to="/ted" /> : <Login />} />
        <Route path="/budform" element={token ? <BudForm /> : <Login />} />
        <Route path="/profile" element={token ? <Profile /> : <Login />} />
      </Routes>
    </>
  );
}
