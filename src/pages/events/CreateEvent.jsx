import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../features/auth/eventSlice";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const CreateEvent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const state = useSelector((state) => state);
	console.log("Redux State:", state);
	const { loading, error } = useSelector((state) => state.events || {});


	const [formData, setFormData] = useState({
		eventTopic: "",
		password: "",
		hostName: "Sarthak Pal",
		description: "",
		date: "",
		time: "02:30",
		period: "PM",
		timezone: "UTC +5:00 Delhi",
		duration: "1 hour",
	});

	const [success, setSuccess] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccess(null);

		const eventData = {
			...formData,
			dateTime: `${formData.date} ${formData.time} ${formData.period}`,
		};

		try {
			await dispatch(createEvent({ eventData, token })).unwrap();
			setSuccess("Event created successfully!");
			toast.success("Event created successfully!");
			setFormData(formData);
			setTimeout(() => navigate("/events"), 1000);
		} catch (err) {
			console.error("Error:", err);
			toast.error(err.data.error)
		}
	};

	return (
		<div className="main-create">
			<div className="event-header">
				<span className="first-span">Event Types</span>
				<div className="event-content">
					<span>Create events to share for people to book on your calendar. New</span>
				</div>
			</div>

			<div className="event-container">
				<h2 className="event-title">Add Event</h2>
				<span className="line"></span>

				<form className="event-form" onSubmit={handleSubmit}>
					{/* Event Topic */}
					<div className="form-group">
						<label>Event Topic <span>*</span></label>
						<input type="text" name="eventTopic" placeholder="Set a conference topic before it starts" onChange={handleChange} required />
					</div>

					{/* Password */}
					<div className="form-group">
						<label>Password</label>
						<input type="password" name="password" placeholder="Password" onChange={handleChange} />
					</div>

					{/* Host Name */}
					<div className="form-group">
						<label>Host Name <span>*</span></label>
						<select name="hostName" value={formData.hostName} onChange={handleChange}>
							<option value="Sarthak Pal">Sarthak Pal</option>
							<option value="Other">Other</option>
						</select>
					</div>

					{/* Description */}
					<div className="form-group">
						<label>Description</label>
						<textarea name="description" rows="3" onChange={handleChange}></textarea>
					</div>

					<span className="line"></span>

					{/* Date & Time */}
					<div className="form-group">
						<label>Date and Time <span>*</span></label>
						<div className="date-time-inputs">
							<input type="date" name="date" onChange={handleChange} required />
							<input type="time" name="time" value={formData.time} onChange={handleChange} required />
							<select name="period" value={formData.period} onChange={handleChange}>
								<option>AM</option>
								<option>PM</option>
							</select>
							<select name="timezone" value={formData.timezone} onChange={handleChange}>
								<option>UTC +5:00 Delhi</option>
								<option>UTC +1:00 London</option>
							</select>
						</div>
					</div>

					{/* Set Duration */}
					<div className="form-group">
						<label>Set Duration</label>
						<select name="duration" value={formData.duration} onChange={handleChange}>
							<option>1 hour</option>
							<option>2 hours</option>
							<option>30 minutes</option>
						</select>
					</div>

					{/* Success / Error Messages */}
					{error && <p style={{ color: "red" }}>{error}</p>}
					{success && <p style={{ color: "green" }}>{success}</p>}

					{/* Buttons */}
					<div className="event-buttons">
						<button type="button" className="cancel" onClick={() => navigate('/events')}>Cancel</button>
						<button type="submit" className="save" disabled={loading}>
							{loading ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateEvent;
