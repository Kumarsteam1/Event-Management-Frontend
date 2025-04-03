import React from "react";
import { useState } from "react";
import Frame from "../../assets/frame.png";
import VectorLogo from "../../assets/vectorlogo.png";
import CNNCT from "../../assets/CNNCT.png";
import "./Preferences.css";
import { useNavigate } from "react-router-dom";

import Books from "../../assets/books.png"
import Exports from "../../assets/exports.png"
import Government from "../../assets/government.png"
import Group from "../../assets/group.png"
import Finance from "../../assets/finance.png"
import Marketing from "../../assets/marketing.png"

function Preferences() {
	const navigate = useNavigate();
	const handleContinue = () => {
		console.log("Triggering continue");

		console.log("Token set:", localStorage.getItem("token"));
	
		navigate("/events");
		console.log("Navigating to /events...");
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
						<span className="form-title">Your Preferences</span>
					</div>

					<form className="signup-form">
						<div className="input-group">
							<input type="email" placeholder="Tell us your username" />
						</div>
					</form>

					<section className="cards-section">
						<p>Select that one category that describes your CNNCT:</p>

						<div className="cards">
							<div className="card">
								<img src={Books} />
								<span>Education</span>
							</div>
							<div className="card">
								<img src={Exports} />
								<span>Exports</span>
							</div>
							<div className="card">
								<img src={Government} />
								<span>Government</span>
							</div>

							<div className="card">
								<img src={Group} />
								<span>Consulting</span>
							</div>

							<div className="card">
								<img src={Finance} />
								<span>Finance</span>
							</div>

							<div className="card">
								<img src={Marketing} />
								<span>Marketing</span>
							</div>

							<div className="card">
								<img src={Books} />
								<span>Tech</span>
							</div>

							<div className="card">
								<img src={Group} />
								<span>Recruiting</span>
							</div>

						</div>
					</section>

					<button className="signup-button-preference" onClick={handleContinue}>Continue</button>

				</div>
			</main>

			{/* Side Image Section */}
			<aside className="signup-aside">
				<img src={Frame} alt="Frame" className="signup-image" />
			</aside>
		</div>
	);
}

export default Preferences;
