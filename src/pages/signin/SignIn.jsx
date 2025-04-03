import React, { useState, useEffect } from "react";
import Frame from "../../assets/frame.png";
import VectorLogo from "../../assets/vectorlogo.png";
import CNNCT from "../../assets/CNNCT.png";
import "../signup/SignUp.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../features/auth/authSlice";

import { toast } from "react-toastify";

function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, user } = useSelector((state) => state.auth);


	const token = useSelector((state) => state.auth.token);

	// Form State
	const [formData, setFormData] = useState({
		mail: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(signinUser(formData));

		try {
			await dispatch(signinUser(formData));
			toast.success("Log In successfully!");
		} catch (err) {
			console.error("Error:", err);
			toast.error(err?.response?.data?.error || "Signup failed!");
		}

	};


	useEffect(() => {
		if (user && token) { 
			navigate("/preferences");
		}
	}, [user, token, navigate]);

	return (
		<div className="signup-container">
			<main className="signup-main">
				{/* Logo Section */}
				<div className="logo-container">
					<img src={VectorLogo} alt="Vector Logo" className="logo" />
					<img src={CNNCT} alt="CNNCT Logo" className="cnnct-logo" />
				</div>

				{/* Sign In Form Section */}
				<div className="signup-form-container">
					<div className="form-header">
						<span className="form-title">SIGN IN</span>
					</div>

					<form className="signup-form" onSubmit={handleSubmit}>
						<div className="input-group">
							<p>Email</p>
							<input type="email" name="mail" placeholder="Username" onChange={handleChange} required />
						</div>
						<div className="input-group">
							<p>Password</p>
							<input type="password" name="password" placeholder="Password" onChange={handleChange} required />
						</div>

						{error && <p style={{ color: "red" }}>{error}</p>}
						<button className="signup-button" type="submit" disabled={loading}>
							{loading ? "Logging in..." : "Log In"}
						</button>
					</form>

					<b className="terms-text">
						Don't have an account? <a href="#" onClick={() => navigate("/signup")}>Sign up</a>.
					</b>
				</div>
			</main>

			{/* Side Image Section */}
			<aside className="signup-aside">
				<img src={Frame} alt="Frame" className="signup-image" />
			</aside>
		</div>
	);
}

export default SignIn;
