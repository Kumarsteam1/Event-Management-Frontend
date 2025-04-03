import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarView.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  
  const [events, setEvents] = useState([
    {
      id: uuidv4(),
      title: "Meeting-1",
      start: new Date(2025, 3, 25, 10, 0),
      end: new Date(2025, 3, 25, 11, 0),
      color: "#d3d3d3",
    },
    {
      id: uuidv4(),
      title: "Meeting-2",
      start: new Date(2025, 3, 28, 9, 0),
      end: new Date(2025, 3, 28, 10, 0),
      color: "#b3e0ff",
    },
  ]);

  const [availability, setAvailability] = useState([
    { start: "09:00", end: "17:00" },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const startTime = moment(start).format("HH:mm");
    const endTime = moment(end).format("HH:mm");

    const isAvailable = availability.some(
      (slot) => startTime >= slot.start && endTime <= slot.end
    );

    if (!isAvailable) {
      toast.error("🚫 Selected time is outside of your availability!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const hasConflict = events.some((event) => {
      return (
        moment(start).isBetween(event.start, event.end, "minutes", "[)") ||
        moment(end).isBetween(event.start, event.end, "minutes", "[)") ||
        (moment(start).isSameOrBefore(event.start) && moment(end).isSameOrAfter(event.end))
      );
    });

    if (hasConflict) {
      toast.error("⚠️ Conflict detected! Another event is scheduled at this time.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { id: uuidv4(), title, start, end, color: "#ffcc99" }]);
      toast.success(`Event "${title}" added successfully!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="calender">
      <div className="event-header">
        <span className="first-span">Availability</span>
        <div className="event-content">
          <span>Configure times when you are available for bookings.</span>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh", margin: "20px" }}
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color, color: "black" },
          })}
          onSelectSlot={handleSelectSlot}
        />
      </div>
    </div>
  );
};

export default CalendarView;
