import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/auth/eventSlice";
import { useNavigate } from "react-router-dom";
import Plus from "../../assets/dashboard/plus.png";
import "./Events.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { deleteEvent } from "../../features/auth/eventSlice";
import { toast } from "react-toastify";


function Events() {
	console.log("Events component rendered");
	const dispatch = useDispatch();
	const navigate = useNavigate();


	// const reduxState = useSelector((state) => state);
	// console.log("Full Redux State:", reduxState);

	const { events, loading, error } = useSelector((state) => state.events);

	// Extract actual events array
	const eventsList = events?.events || [];



	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);

	const [eventStatus, setEventStatus] = useState(
		eventsList.reduce((acc, event) => ({ ...acc, [event._id]: true }), {})
	);

	const handleDelete = async (eventId) => {
		try {
			await dispatch(deleteEvent({ eventId })).unwrap();
			dispatch(fetchEvents());
			toast.success("Event deleted sucessfuly!")
		} catch (error) {
			console.error("Error deleting event:", error);
			toast.error(err.data.error)
		}
	};


	return (
		<>
			<div className="events-main">
				<div className="event-header">
					<span className="first-span">Event Types</span>
					<div className="event-content">
						<span>Create events to share for people to book on your calendar.</span>
						<button onClick={() => navigate('/createevent')}>
							<img src={Plus} alt="Plus" /> Add new event
						</button>
					</div>
				</div>

				<div className="event-list">
					{loading ? (
						<p>Loading events...</p>
					) : error ? (
						<p style={{ color: "red" }}>{error}</p>
					) : eventsList.length > 0 ? (
						eventsList.map((event) => (
							<div
								key={event._id}
								className={`event-card ${eventStatus[event._id] ? "active" : "inactive"}`}
							>
								<div className="event-header">
									{event.eventTopic}
									<FaEdit className="icon" onClick={() => navigate(`/edit/${event._id}`)} />
								</div>
								<div className="event-details">
									<p className="event-time">Friday, 28 Feb <br /> {event.dateTime}</p>
									<p className="event-description">{event.time}({event.duration})</p>
									<p className="event-timing">1hr, Group Meeting</p>
								</div>
								<div className="event-footer">
									<div className="toggle-switch">
										<input
											type="checkbox"
											id={event._id}
											checked={eventStatus[event._id]}
											onChange={() => toggleEventStatus(event._id)}
										/>
										<label htmlFor={event._id}></label>
									</div>
									<FaTrash className="icon" onClick={() => handleDelete(event._id, event.eventTopic)} />
								</div>
							</div>
						))
					) : (
						<p>No events found.</p>
					)}
				</div>
			</div>
		</>
	);
}

export default Events;
