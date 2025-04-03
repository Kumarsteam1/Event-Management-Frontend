import React from "react";
import CNNCT from "../assets/CNNCT.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src={CNNCT} alt="Logo" className="navbar-logo" />
      <button className="signup-btn" onClick={()=>{navigate('/signup')}}>Sign Up Free</button>
    </div>
  );
}

export default Navbar;
