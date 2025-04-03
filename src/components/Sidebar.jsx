import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CNNCT from "../assets/CNNCT.png";
import VectorLogo from "../assets/vectorlogo.png";
import Availability from "../assets/dashboard/availability.png";
import Booking from "../assets/dashboard/booking.png";
import Events from "../assets/dashboard/event.png";
import Settings from "../assets/dashboard/settings.png";
import Emoji from "../assets/dashboard/emoji.png";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
	const [menuOpen, setMenuOpen] = useState(false);

	const state = useSelector((state) => state);
	console.log("Redux State:", state);

	// Handle screen resize
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 480);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleNavigation = (path) => {
		navigate(path);
		setMenuOpen(false);
	};

	if (isMobile) {
		return (
			<div className="mobile-navbar">
				<div className="logo-container">
					<img src={VectorLogo} alt="Vector Logo" className="logo" />
					<img src={CNNCT} alt="CNNCT Logo" className="cnnct-logo" />
				</div>
				<div className="profile-section" onClick={() => setMenuOpen(!menuOpen)}>
					<img src={Emoji} alt="Profile" className="profile-icon" />
					<p>{state.auth.user.first_name}</p>
				</div>

				{/* Dropdown Menu */}
				{menuOpen && (
					<div className="mobile-menu">
						<div className={`nav-item ${location.pathname === "/events" ? "active" : ""}`} onClick={() => handleNavigation("/events")}>
							<img src={Events} alt="Events" className="nav-icon" />
							<p>Events</p>
						</div>
						<div className={`nav-item ${location.pathname === "/events/list" ? "active" : ""}`} onClick={() => handleNavigation("/events/list")}>
							<img src={Booking} alt="Booking" className="nav-icon" />
							<p>Booking</p>
						</div>
						<div className={`nav-item ${location.pathname === "/events/calendar" ? "active" : ""}`} onClick={() => handleNavigation("/events/calendar")}>
							<img src={Availability} alt="Availability" className="nav-icon" />
							<p>Availability</p>
						</div>
						<div className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`} onClick={() => handleNavigation("/settings")}>
							<img src={Settings} alt="Settings" className="nav-icon" />
							<p>Settings</p>
						</div>

						{/* Logout Option */}
						<div className="nav-item logout" onClick={() => {
							localStorage.removeItem("token");
							navigate("/");
						}}>
							<p>Logout</p>
						</div>
					</div>
				)}
			</div>
		);
	}

	// Sidebar for Desktop View (above 480px)
	return (
		<div className="sidebar">
			<div className="logo-container">
				<img src={VectorLogo} alt="Vector Logo" className="logo" />
				<img src={CNNCT} alt="CNNCT Logo" className="cnnct-logo" />
			</div>
			<nav className="sidebar-nav">
				<div className={`nav-item ${location.pathname === "/events" ? "active" : ""}`} onClick={() => navigate("/events")}>
					<img src={Events} alt="Events" className="nav-icons" />
					<p>Events</p>
				</div>
				<div className={`nav-item ${location.pathname === "/events/list" ? "active" : ""}`} onClick={() => navigate("/events/list")}>
					<img src={Booking} alt="Booking" className="nav-icon" />
					<p>Booking</p>
				</div>
				<div className={`nav-item ${location.pathname === "/events/calendar" ? "active" : ""}`} onClick={() => navigate("/events/calendar")}>
					<img src={Availability} alt="Availability" className="nav-icon" />
					<p>Availability</p>
				</div>
				<div className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`} onClick={() => navigate("/settings")}>
					<img src={Settings} alt="Settings" className="nav-icon" />
					<p>Settings</p>
				</div>
			</nav>

			{/* Logout Section */}
			<div className="sidebar-bottom" onClick={() => {
				localStorage.removeItem("token");
				navigate("/");
			}}>
				<img src={Emoji} alt="Emoji" className="profile-icon" />
				<p>{state.auth.user.first_name}</p>
			</div>
		</div>
	);
}

export default Sidebar;
