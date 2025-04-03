import React, { useState } from "react";
import "./EventList.css";
import { FiUsers } from "react-icons/fi";

const events = [
	{
		id: 1,
		date: "Friday, 28 Feb",
		time: "1:30 pm - 2:30 pm",
		title: "Meeting-2",
		attendees: 13,
		status: "Accepted",
		description: "You and team 2",
	},
];

const cancelled = [
	{
		id: 1,
		date: "Friday, 28 Feb",
		time: "1:30 pm - 2:30 pm",
		appointment: "Appointments",
		between: "You and Dr.Kumar",
		status: "Rejected",
		description: "You and team 2",
	},
];

const past = [
	{
		"date": "Friday, 28 Feb",
		"time": "2:35 pm - 3:00 pm",
		"title": "Appointment",
		"description": "You and Dr. Kumar",
		"status": "Rejected",
		"attendees": null
	},
	{
		"date": "Friday, 28 Feb",
		"time": "1:30 pm - 2:30 pm",
		"title": "Meeting-2",
		"description": "You and team 2",
		"status": "Accepted",
		"attendees": 13
	},
	{
		"date": "Friday, 28 Feb",
		"time": "10:30 am - 12:30 pm",
		"title": "Meeting",
		"description": "You and team 1",
		"status": ["Reject", "Accept"],
		"attendees": 4
	}
]


const EventList = () => {
	const [activeTab, setActiveTab] = useState("Upcoming");

	const tabs = ["Upcoming", "Pending", "Canceled", "Past"];

	return (
		<div className="eventlist-main">
			<div className="event-header">
				<span className="first-span">Bookings</span>
				<div className="event-content">
					<span>See upcoming and past events booked through your event type links.</span>
				</div>
			</div>

			<div className="event-container">
				{/* Tabs */}
				<div className="tabs">
					{tabs.map((tab) => (
						<button
							key={tab}
							className={`tab-button ${activeTab === tab ? "active" : ""}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Event Details */}
				{activeTab === "Upcoming" && (
					<div className="event-details">
						{events.map((event) => (
							<div key={event.id} className="event-cards">
								<div className="event-date">
									<p>{event.date}</p>
									<p className="event-time">{event.time}</p>
								</div>
								<div className="event-info">
									<p className="event-title">{event.title}</p>
									<p className="event-description">{event.description}</p>
								</div>
								<span className="status-badge">{event.status}</span>
								<div className="attendees">
									<FiUsers className="icon" />
									{event.attendees} people
								</div>
							</div>
						))}
					</div>
				)}

				{activeTab === "Pending" && (
					<div className="event-details">
						{events.map((event) => (
							<div key={event.id} className="event-cards">
								<div className="event-date">
									<p>{event.date}</p>
									<p className="event-time">{event.time}</p>
								</div>
								<div className="event-info">
									<p className="event-title">{event.title}</p>
									<p className="event-description">{event.description}</p>
								</div>
								{/* <span className="status-badge">{event.status}</span> */}
								<div className="attendees">
									<FiUsers className="icon" />
									{event.attendees} people
								</div>
							</div>
						))}
					</div>
				)}


				{activeTab === "Canceled" && (
					<div className="event-details">
						{cancelled.map((event) => (
							<div key={event.id} className="event-cards">
								<div className="event-date">
									<p>{event.date}</p>
									<p className="event-time">{event.time}</p>
								</div>
								<div className="event-info">
									<p className="event-title">{event.appointment}</p>
									<p className="event-description">{event.between}</p>
								</div>
								<span className="status-badge">{event.status}</span>
							</div>
						))}
					</div>
				)}

				{activeTab === "Past" && (
					<div className="event-details">
						{past.map((event, index) => (
							<div key={index} className="event-cards">
								<div className="event-date">
									<p>{event.date}</p>
									<p className="event-time">{event.time}</p>
								</div>
								<div className="event-info">
									<p className="event-title">{event.title}</p>
									<p className="event-description">{event.description}</p>
								</div>

								<div className="status-buttons">
									{Array.isArray(event.status) ? (
										<>
											{event.status.includes("Accept") && (
												<button className="status-badge accept">Accept</button>
											)}
											{event.status.includes("Reject") && (
												<button className="status-badge reject">Reject</button>
											)}
										</>
									) : (
										<button
											className={`status-badge ${event.status === "Accepted" ? "accept" : "reject"
												}`}
										>
											{event.status}
										</button>
									)}
								</div>

								<div className="attendees">
									<FiUsers className="icon" />
									{event.attendees ? `${event.attendees} people` : "No attendees"}
								</div>
							</div>
						))}
					</div>
				)}


			</div>
		</div>
	);
};

export default EventList;
