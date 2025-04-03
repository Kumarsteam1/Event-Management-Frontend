import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById, updateEvent } from "../../features/auth/eventSlice";
import { toast } from "react-toastify";

const EditEvent = () => {
	const { eventId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const { event, loading, error } = useSelector((state) => state.events);

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


	useEffect(() => {
		if (eventId && token) {
			dispatch(fetchEventById({ eventId }));
		}
	}, [eventId, dispatch, token]);

	useEffect(() => {
		if (event) {
			setFormData({
				eventTopic: event.eventTopic || "",
				password: event.password || "",
				hostName: event.hostName || "Sarthak Pal",
				description: event.description || "",
				date: event.date || "",
				time: event.time || "02:30",
				period: event.period || "PM",
				timezone: event.timezone || "UTC +5:00 Delhi",
				duration: event.duration || "1 hour",
			});
		}
	}, [event]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!eventId) {
			console.error("Missing event ID");
			return;
		}

		try {
			await dispatch(updateEvent({ eventId, formData })).unwrap();
			navigate("/events");
			toast.success("Event created successfully!");
		} catch (err) {
			console.error("Update failed:", err);
			toast.error(err.data.error)
		}
	};


	return (
		<div className="main-create">
			<div className="event-header">
				<span className="first-span">Event Types</span>
				<div className="event-content">
					<span>Edit your event details</span>
				</div>
			</div>

			<div className="event-container">
				<h2 className="event-title">Edit Event</h2>
				<span className="line"></span>

				<form className="event-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Event Topic <span>*</span></label>
						<input type="text" name="eventTopic" value={formData.eventTopic} onChange={handleChange} required />
					</div>

					<div className="form-group">
						<label>Password</label>
						<input type="password" name="password" value={formData.password} onChange={handleChange} />
					</div>

					<div className="form-group">
						<label>Host Name <span>*</span></label>
						<select name="hostName" value={formData.hostName} onChange={handleChange}>
							<option value="Sarthak Pal">Sarthak Pal</option>
							<option value="Other">Other</option>
						</select>
					</div>

					<div className="form-group">
						<label>Description</label>
						<textarea name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
					</div>

					<span className="line"></span>

					<div className="form-group">
						<label>Date and Time <span>*</span></label>
						<div className="date-time-inputs">
							<input type="date" name="date" value={formData.date} onChange={handleChange} required />
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

					<div className="form-group">
						<label>Set Duration</label>
						<select name="duration" value={formData.duration} onChange={handleChange}>
							<option>1 hour</option>
							<option>2 hours</option>
							<option>30 minutes</option>
						</select>
					</div>

					{error && <p style={{ color: "red" }}>{error}</p>}

					<div className="event-buttons">
						<button type="button" className="cancel" onClick={() => navigate("/events")}>Cancel</button>
						<button type="submit" className="save" disabled={loading}>
							{loading ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditEvent;
