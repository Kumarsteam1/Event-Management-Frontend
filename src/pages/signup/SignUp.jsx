import React, { useState } from "react";
import Frame from "../../assets/frame.png";
import VectorLogo from "../../assets/vectorlogo.png";
import CNNCT from "../../assets/CNNCT.png";
import "./SignUp.css"; // Import the new styles
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/auth/authSlice"; // Import Redux action
import { toast } from "react-toastify";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await dispatch(signupUser(formData)); // Wait for signup action to complete
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/signin"), 1000); // Navigate after 1s
    } catch (err) {
      console.error("Error:", err);
      toast.error(err?.response?.data?.error || "Signup failed!");
    }
  };



  return (
    <div className="signup-container">
      <main className="signup-main">
        {/* Logo Section */}
        <div className="logo-container">
          <img src={VectorLogo} alt="Vector Logo" className="logo" />
          <img src={CNNCT} alt="CNNCT Logo" className="cnnct-logo" />
        </div>

        {/* Sign Up Form Section */}
        <div className="signup-form-container">
          <div className="form-header">
            <span className="form-title">Create an Account</span>
            <a href="/signin" className="signin-link">Sign in instead</a>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <p>First Name</p>
              <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <p>Last Name</p>
              <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <p>Email</p>
              <input type="email" name="mail" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <p>Password</p>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <p>Confirm Password</p>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            </div>

            <b className="terms-text">
              By creating an account, I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </b>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="signup-button" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Create an Account"}
            </button>
          </form>
        </div>
      </main>

      {/* Side Image Section */}
      <aside className="signup-aside">
        <img src={Frame} alt="Frame" className="signup-image" />
      </aside>
    </div>
  );
}

export default SignUp;
